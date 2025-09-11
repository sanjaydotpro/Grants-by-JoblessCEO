import { db } from "./db";
import { grants, institutions } from "./schema";
import { eq, like, ilike, and, or, desc, asc, gte, lte } from "drizzle-orm";
import type { 
  Grant, 
  Institution, 
  GrantWithInstitution,
  GrantSearchParams,
  GrantSortOptions,
  InstitutionSearchParams,
  InstitutionSortOptions 
} from "./types";

// ============================================================================
// GRANT QUERIES
// ============================================================================

/**
 * Get all grants
 */
export async function getAllGrants(): Promise<Grant[]> {
  return await db.select().from(grants).orderBy(desc(grants.createdAt));
}

/**
 * Get grant by ID
 */
export async function getGrantById(id: string): Promise<Grant | null> {
  const result = await db.select().from(grants).where(eq(grants.id, id)).limit(1);
  return result[0] || null;
}

/**
 * Get grants with institution information
 */
export async function getGrantsWithInstitution(): Promise<GrantWithInstitution[]> {
  return await db
    .select({
      id: grants.id,
      name: grants.name,
      institutionId: grants.institutionId,
      grantAmount: grants.grantAmount,
      website: grants.website,
      description: grants.description,
      createdAt: grants.createdAt,
      updatedAt: grants.updatedAt,
      institution: {
        id: institutions.id,
        name: institutions.name,
        website: institutions.website,
        createdAt: institutions.createdAt,
        updatedAt: institutions.updatedAt
      }
    })
    .from(grants)
    .innerJoin(institutions, eq(grants.institutionId, institutions.id))
    .orderBy(desc(grants.createdAt));
}

/**
 * Search grants with filters
 */
export async function searchGrants(params: GrantSearchParams): Promise<Grant[]> {
  const { name, institutionId, minAmount, maxAmount, website, description, limit = 50, offset = 0 } = params;
  
  const conditions = [];
  
  if (name) {
    conditions.push(ilike(grants.name, `%${name}%`));
  }
  
  if (institutionId) {
    conditions.push(eq(grants.institutionId, institutionId));
  }
  
  if (minAmount !== undefined) {
    conditions.push(gte(grants.grantAmount, minAmount));
  }
  
  if (maxAmount !== undefined) {
    conditions.push(lte(grants.grantAmount, maxAmount));
  }
  
  if (website) {
    conditions.push(ilike(grants.website, `%${website}%`));
  }
  
  if (description) {
    conditions.push(ilike(grants.description, `%${description}%`));
  }
  
  if (conditions.length > 0) {
    return await db
      .select()
      .from(grants)
      .where(and(...conditions))
      .orderBy(desc(grants.createdAt))
      .limit(limit)
      .offset(offset);
  }
  
  return await db
    .select()
    .from(grants)
    .orderBy(desc(grants.createdAt))
    .limit(limit)
    .offset(offset);
}

/**
 * Create a new grant
 */
export async function createGrant(grantData: Omit<Grant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Grant> {
  const result = await db.insert(grants).values(grantData).returning();
  return result[0];
}

/**
 * Update a grant
 */
export async function updateGrant(id: string, updates: Partial<Omit<Grant, 'id' | 'createdAt'>>): Promise<Grant | null> {
  const result = await db
    .update(grants)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(grants.id, id))
    .returning();
  return result[0] || null;
}

/**
 * Delete a grant
 */
export async function deleteGrant(id: string): Promise<boolean> {
  const result = await db.delete(grants).where(eq(grants.id, id)).returning();
  return result.length > 0;
}

// ============================================================================
// INSTITUTION QUERIES
// ============================================================================

/**
 * Get all institutions
 */
export async function getAllInstitutions(): Promise<Institution[]> {
  return await db.select().from(institutions).orderBy(asc(institutions.name));
}

/**
 * Get institution by ID
 */
export async function getInstitutionById(id: string): Promise<Institution | null> {
  const result = await db.select().from(institutions).where(eq(institutions.id, id)).limit(1);
  return result[0] || null;
}

/**
 * Get institution by name
 */
export async function getInstitutionByName(name: string): Promise<Institution | null> {
  const result = await db.select().from(institutions).where(eq(institutions.name, name)).limit(1);
  return result[0] || null;
}

/**
 * Search institutions with filters
 */
export async function searchInstitutions(params: InstitutionSearchParams): Promise<Institution[]> {
  const { name, website, limit = 50, offset = 0 } = params;
  
  const conditions = [];
  
  if (name) {
    conditions.push(ilike(institutions.name, `%${name}%`));
  }
  
  if (website) {
    conditions.push(ilike(institutions.website, `%${website}%`));
  }
  
  if (conditions.length > 0) {
    return await db
      .select()
      .from(institutions)
      .where(and(...conditions))
      .orderBy(asc(institutions.name))
      .limit(limit)
      .offset(offset);
  }
  
  return await db
    .select()
    .from(institutions)
    .orderBy(asc(institutions.name))
    .limit(limit)
    .offset(offset);
}

/**
 * Create a new institution
 */
export async function createInstitution(institutionData: Omit<Institution, 'id' | 'createdAt' | 'updatedAt'>): Promise<Institution> {
  const result = await db.insert(institutions).values(institutionData).returning();
  return result[0];
}

/**
 * Update an institution
 */
export async function updateInstitution(id: string, updates: Partial<Omit<Institution, 'id' | 'createdAt'>>): Promise<Institution | null> {
  const result = await db
    .update(institutions)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(institutions.id, id))
    .returning();
  return result[0] || null;
}

/**
 * Delete an institution
 */
export async function deleteInstitution(id: string): Promise<boolean> {
  const result = await db.delete(institutions).where(eq(institutions.id, id)).returning();
  return result.length > 0;
}

// ============================================================================
// UTILITY QUERIES
// ============================================================================

/**
 * Get grants by institution ID
 */
export async function getGrantsByInstitutionId(institutionId: string): Promise<Grant[]> {
  return await db
    .select()
    .from(grants)
    .where(eq(grants.institutionId, institutionId))
    .orderBy(desc(grants.createdAt));
}

/**
 * Get total grant amount by institution
 */
export async function getTotalGrantAmountByInstitution(institutionId: string): Promise<number> {
  const result = await db
    .select({
      total: grants.grantAmount
    })
    .from(grants)
    .where(eq(grants.institutionId, institutionId));
  
  return result.reduce((sum, grant) => {
    const amount = grant.total || 0;
    return sum + amount;
  }, 0);
}

/**
 * Get grant statistics
 */
export async function getGrantStatistics() {
  const totalGrants = await db.select().from(grants);
  const totalInstitutions = await db.select().from(institutions);
  
  const totalAmount = totalGrants.reduce((sum, grant) => {
    const amount = grant.grantAmount || 0;
    return sum + amount;
  }, 0);
  
  return {
    totalGrants: totalGrants.length,
    totalInstitutions: totalInstitutions.length,
    totalAmount,
    averageAmount: totalGrants.length > 0 ? totalAmount / totalGrants.length : 0
  };
}