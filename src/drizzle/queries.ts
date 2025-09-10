import { db } from './db';
import { cards, categories, issuers } from './schema';
import { eq, like, and, desc } from 'drizzle-orm';

// Example queries using Drizzle ORM

// Get all cards
export async function getAllCardsWithDrizzle() {
  try {
    const result = await db.select().from(cards);
    return result;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
}

// Get cards with issuer information
export async function getCardsWithIssuer() {
  try {
    const result = await db
      .select({
        id: cards.id,
        name: cards.name,
        imageLink: cards.imageLink,
        officialLink: cards.officialLink,
        isDiscontinued: cards.isDiscontinued,
        issuer: {
          id: issuers.id,
          name: issuers.name,
          description: issuers.description,
        },
      })
      .from(cards)
      .leftJoin(issuers, eq(cards.issuerId, issuers.id))
      .where(eq(cards.isDiscontinued, false))
      .orderBy(desc(cards.createdAt));
    
    return result;
  } catch (error) {
    console.error('Error fetching cards with issuer:', error);
    throw error;
  }
}

// Search cards by name
export async function searchCardsByName(searchTerm: string) {
  try {
    const result = await db
      .select()
      .from(cards)
      .where(
        and(
          like(cards.name, `%${searchTerm}%`),
          eq(cards.isDiscontinued, false)
        )
      );
    
    return result;
  } catch (error) {
    console.error('Error searching cards:', error);
    throw error;
  }
}

// Get all categories
export async function getAllCategories() {
  try {
    const result = await db.select().from(categories);
    return result;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

// Get all issuers
export async function getAllIssuers() {
  try {
    const result = await db.select().from(issuers);
    return result;
  } catch (error) {
    console.error('Error fetching issuers:', error);
    throw error;
  }
}

// Create a new card
export async function createCard(cardData: {
  name: string;
  nativeCurrencyId?: string;
  imageLink?: string;
  issuerId?: string;
  collaboratorId?: string;
  officialLink?: string;
}) {
  try {
    const result = await db
      .insert(cards)
      .values(cardData)
      .returning();
    
    return result[0];
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
}

// Update a card
export async function updateCard(cardId: string, updates: Partial<{
  name: string;
  nativeCurrencyId: string;
  imageLink: string;
  issuerId: string;
  collaboratorId: string;
  officialLink: string;
  isDiscontinued: boolean;
}>) {
  try {
    const result = await db
      .update(cards)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(cards.id, cardId))
      .returning();
    
    return result[0];
  } catch (error) {
    console.error('Error updating card:', error);
    throw error;
  }
}

// Delete a card (soft delete)
export async function deleteCard(cardId: string) {
  try {
    const result = await db
      .update(cards)
      .set({ isDiscontinued: true, updatedAt: new Date() })
      .where(eq(cards.id, cardId))
      .returning();
    
    return result[0];
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
}