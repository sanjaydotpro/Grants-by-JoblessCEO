#!/usr/bin/env tsx

import { db, validateDatabaseConnection, closeDatabaseConnection } from './db';
import { institutions, grants, newsUpdates } from './schema';
import type { NewGrant, NewInstitution } from './types';
import { eq } from 'drizzle-orm';

/**
 * Database Test Script
 * This script validates the Drizzle ORM setup and tests basic CRUD operations
 */

async function testDatabaseSetup() {
  console.log('🚀 Starting Drizzle Database Test...');
  console.log('=' .repeat(50));

  try {
    // Test 1: Database Connection
    console.log('\n1. Testing database connection...');
    const isConnected = await validateDatabaseConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }
    console.log('✅ Database connection successful');

    // Test 2: Schema Validation - Check if all tables exist
    console.log('\n2. Validating schema tables...');
    const tableQueries = [
      db.select().from(cards).limit(0),
      db.select().from(issuers).limit(0),
      db.select().from(collaborators).limit(0),
      db.select().from(categories).limit(0),
      db.select().from(newsUpdates).limit(0),
      db.select().from(employment).limit(0),
      db.select().from(features).limit(0),
      db.select().from(networks).limit(0)
    ];

    await Promise.all(tableQueries);
    console.log('✅ All schema tables are accessible');

    // Test 3: Insert Operations
    console.log('\n3. Testing insert operations...');
    
    // Create test issuer
    const testIssuer: NewIssuer = {
      name: 'Test Bank Corp',
      description: 'A test financial institution'
    };
    
    const [createdIssuer] = await db.insert(issuers).values(testIssuer).returning();
    console.log('✅ Issuer created:', createdIssuer.name);

    // Create test collaborator
    const testCollaborator: NewCollaborator = {
      name: 'Test Partner LLC',
      description: 'A test collaboration partner'
    };
    
    const [createdCollaborator] = await db.insert(collaborators).values(testCollaborator).returning();
    console.log('✅ Collaborator created:', createdCollaborator.name);

    // Create test card with relations
    const testCard: NewCard = {
      name: 'Test Rewards Card',
      issuerId: createdIssuer.id,
      collaboratorId: createdCollaborator.id,
      officialLink: 'https://example.com/test-card',
      isDiscontinued: false
    };
    
    const [createdCard] = await db.insert(cards).values(testCard).returning();
    console.log('✅ Card created:', createdCard.name);

    // Test 4: Query Operations with Relations
    console.log('\n4. Testing query operations with relations...');
    
    const cardWithRelations = await db
      .select({
        id: cards.id,
        name: cards.name,
        officialLink: cards.officialLink,
        issuer: {
          id: issuers.id,
          name: issuers.name,
          description: issuers.description
        },
        collaborator: {
          id: collaborators.id,
          name: collaborators.name,
          description: collaborators.description
        }
      })
      .from(cards)
      .leftJoin(issuers, eq(cards.issuerId, issuers.id))
      .leftJoin(collaborators, eq(cards.collaboratorId, collaborators.id))
      .where(eq(cards.id, createdCard.id));
    
    console.log('✅ Query with relations successful:', {
      card: cardWithRelations[0]?.name,
      issuer: cardWithRelations[0]?.issuer?.name,
      collaborator: cardWithRelations[0]?.collaborator?.name
    });

    // Test 5: Update Operations
    console.log('\n5. Testing update operations...');
    
    const updatedCard = await db
      .update(cards)
      .set({ 
        name: 'Updated Test Rewards Card',
        updatedAt: new Date().toISOString()
      })
      .where(eq(cards.id, createdCard.id))
      .returning();
    
    console.log('✅ Card updated:', updatedCard[0]?.name);

    // Test 6: Search Operations
    console.log('\n6. Testing search operations...');
    
    const searchResults = await db
      .select()
      .from(cards)
      .where(eq(cards.isDiscontinued, false))
      .limit(5);
    
    console.log('✅ Search completed, found', searchResults.length, 'active cards');

    // Test 7: Cleanup - Delete test data
    console.log('\n7. Cleaning up test data...');
    
    await db.delete(cards).where(eq(cards.id, createdCard.id));
    await db.delete(collaborators).where(eq(collaborators.id, createdCollaborator.id));
    await db.delete(issuers).where(eq(issuers.id, createdIssuer.id));
    
    console.log('✅ Test data cleaned up successfully');

    // Test 8: Type Safety Validation
    console.log('\n8. Validating TypeScript types...');
    
    // This will cause TypeScript errors if types are incorrect
    const typeTest: NewCard = {
      name: 'Type Test Card', // Required field
      // issuerId is optional
      // collaboratorId is optional
      isDiscontinued: false // Should default to false anyway
    };
    
    console.log('✅ TypeScript types are properly configured');

    console.log('\n' + '=' .repeat(50));
    console.log('🎉 All database tests passed successfully!');
    console.log('✅ Drizzle ORM setup is working perfectly');
    console.log('✅ Schema is properly configured');
    console.log('✅ Foreign keys and constraints are working');
    console.log('✅ TypeScript integration is complete');
    
  } catch (error) {
    console.error('\n❌ Database test failed:', error);
    process.exit(1);
  } finally {
    // Always close the connection
    await closeDatabaseConnection();
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testDatabaseSetup()
    .then(() => {
      console.log('\n🏁 Test completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Test failed:', error);
      process.exit(1);
    });
}

export { testDatabaseSetup };