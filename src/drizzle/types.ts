import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  grants,
  institutions
} from "./schema";

// Select types (for reading from database)
export type Grant = InferSelectModel<typeof grants>;
export type Institution = InferSelectModel<typeof institutions>;

// Insert types (for creating new records)
export type NewGrant = InferInsertModel<typeof grants>;
export type NewInstitution = InferInsertModel<typeof institutions>;

// Update types (for partial updates)
export type UpdateGrant = Partial<Omit<Grant, 'id' | 'createdAt'>>;
export type UpdateInstitution = Partial<Omit<Institution, 'id' | 'createdAt'>>;

// Extended types with relations
export type GrantWithInstitution = Grant & {
  institution: Institution;
};

export type InstitutionWithGrants = Institution & {
  grants: Grant[];
};

// Search and filter types
export type GrantSearchParams = {
  name?: string;
  institutionId?: string;
  minAmount?: number;
  maxAmount?: number;
  website?: string;
  description?: string;
  limit?: number;
  offset?: number;
};

export type InstitutionSearchParams = {
  name?: string;
  website?: string;
  limit?: number;
  offset?: number;
};

export type GrantSortOptions = {
  field: 'name' | 'amount' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
};

export type InstitutionSortOptions = {
  field: 'name' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
};

// API response types
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Database operation result types
export type DatabaseResult<T> = {
  success: boolean;
  data?: T;
  error?: Error;
};

// Query options
export type QueryOptions = {
  limit?: number;
  offset?: number;
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
};

// Validation types
export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

// Database connection types
export type DatabaseConfig = {
  url: string;
  ssl?: boolean;
  poolMin?: number;
  poolMax?: number;
};

export type ConnectionStatus = {
  connected: boolean;
  error?: string;
  timestamp: Date;
};

// Export all schema tables for type inference
export {
  grants,
  institutions
} from "./schema";