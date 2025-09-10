# Drizzle ORM Setup for Next.js with TypeScript

This directory contains a complete Drizzle ORM setup for PostgreSQL with Next.js and TypeScript, featuring proper schema design, type safety, and database management tools.

## 📁 File Structure

```
src/drizzle/
├── README.md           # This documentation
├── db.ts              # Database connection and configuration
├── schema.ts          # Database schema definitions
├── types.ts           # TypeScript type definitions
├── queries.ts         # Pre-built database queries
├── test-db.ts         # Database testing script
└── migrations/        # Database migration files
    ├── 0000_*.sql     # Initial migration
    ├── 0001_*.sql     # Schema updates migration
    └── meta/          # Migration metadata
```

## 🚀 Features

### ✅ Complete Schema Design
- **8 Tables**: cards, categories, issuers, collaborators, employment, features, networks, news_updates
- **Foreign Key Constraints**: Proper relationships between tables
- **Indexes**: Optimized for common query patterns
- **Data Validation**: NOT NULL constraints and unique constraints where appropriate

### ✅ Type Safety
- **Full TypeScript Integration**: Complete type definitions for all operations
- **Inferred Types**: Automatic type inference from schema
- **CRUD Types**: Separate types for Select, Insert, and Update operations
- **Relation Types**: Types for joined queries and nested data

### ✅ Connection Management
- **Connection Pooling**: Configured PostgreSQL connection pool
- **Error Handling**: Comprehensive error handling and logging
- **Environment Validation**: Validates required environment variables
- **Graceful Shutdown**: Proper connection cleanup

### ✅ Developer Experience
- **Database Testing**: Comprehensive test suite
- **Migration Management**: Easy migration generation and execution
- **Database Studio**: Visual database browser
- **NPM Scripts**: Convenient database management commands

## 🛠️ Setup Instructions

### 1. Environment Configuration

Copy the example environment file and configure your database:

```bash
cp .env.example .env
```

Update the `.env` file with your PostgreSQL connection details:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
API_BASE_URL="http://localhost:3000/api"
API_VERSION="v1"
API_KEY="your-secret-api-key"
```

### 2. Database Migration

Run the migrations to create your database schema:

```bash
# Generate new migrations (if schema changes)
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Or push schema directly (development only)
pnpm db:push
```

### 3. Test the Setup

Run the comprehensive test suite to verify everything is working:

```bash
pnpm db:test
```

## 🔧 Available Scripts

```bash
# Database Management
pnpm db:generate    # Generate new migrations
pnpm db:migrate     # Apply migrations
pnpm db:push        # Push schema directly (dev only)
pnpm db:studio      # Open Drizzle Studio
pnpm db:test        # Run database tests
```

## 💻 Usage Examples

### Basic Queries

```typescript
import { db } from '@/drizzle/db';
import { cards, issuers } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

// Get all cards
const allCards = await db.select().from(cards);

// Get cards with issuer information
const cardsWithIssuers = await db
  .select({
    id: cards.id,
    name: cards.name,
    issuer: {
      id: issuers.id,
      name: issuers.name
    }
  })
  .from(cards)
  .leftJoin(issuers, eq(cards.issuerId, issuers.id));
```

### Type-Safe Operations

```typescript
import type { NewCard, UpdateCard } from '@/drizzle/types';

// Create new card (type-safe)
const newCard: NewCard = {
  name: 'Premium Rewards Card',
  issuerId: 'issuer-uuid',
  isDiscontinued: false
};

const [created] = await db.insert(cards).values(newCard).returning();
```

**✨ Your Drizzle ORM setup is now complete and ready for production use!**

## Setup Complete

✅ **Drizzle Kit installed** (`drizzle-kit` in devDependencies)  
✅ **Drizzle ORM installed** (`drizzle-orm` dependency)  
✅ **Configuration file created** (`drizzle.config.ts`)  
✅ **Schema defined** (cards, categories, issuers tables)  
✅ **Database connection setup** (using existing DATABASE_URL)  
✅ **Migrations generated** (SQL files in migrations folder)  
✅ **Example queries created** (CRUD operations)

## Usage

### Generate Migrations
```bash
npx drizzle-kit generate
```

### Push Schema to Database
```bash
npx drizzle-kit push
```

### View Database in Drizzle Studio
```bash
npx drizzle-kit studio
```

### Using Drizzle Queries
```typescript
import { getAllCardsWithDrizzle, getCardsWithIssuer } from '@/drizzle/queries';

// Get all cards
const cards = await getAllCardsWithDrizzle();

// Get cards with issuer information
const cardsWithIssuer = await getCardsWithIssuer();
```

## Usage Examples

### Server Components (Recommended)

```typescript
// Import queries in your server components
import { getAllCardsWithDrizzle, getAllCategories, getAllIssuers } from '@/drizzle/queries'

// Use in server components
export default async function MyPage() {
  const [cards, categories, issuers] = await Promise.all([
    getAllCardsWithDrizzle(),
    getAllCategories(),
    getAllIssuers()
  ])

  return (
    <div>
      <h1>Data from Drizzle</h1>
      <p>Cards: {cards.length}</p>
      <p>Categories: {categories.length}</p>
      <p>Issuers: {issuers.length}</p>
    </div>
  )
}
```

### API Routes

```typescript
// app/api/cards/route.ts
import { getAllCardsWithDrizzle } from '@/drizzle/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cards = await getAllCardsWithDrizzle()
    return NextResponse.json(cards)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 })
  }
}
```

### Client Components (Pass data as props)

```typescript
// Server component fetches data
export default async function ServerPage() {
  const cards = await getAllCardsWithDrizzle()
  return <ClientComponent cards={cards} />
}

// Client component receives data as props
'use client'
export default function ClientComponent({ cards }: { cards: Card[] }) {
  // Use the data in your client component
  return <div>{cards.map(card => <div key={card.id}>{card.name}</div>)}</div>
}
```

## Integration Status ✅

Drizzle ORM has been successfully integrated into your project! Here's what's been completed:

### ✅ Completed Setup
- **Configuration**: `drizzle.config.ts` configured for PostgreSQL
- **Schema**: Database schema defined in `src/drizzle/schema.ts`
- **Database Connection**: Connection established in `src/drizzle/db.ts`
- **Queries**: Type-safe queries implemented in `src/drizzle/queries.ts`
- **Migration**: Schema applied to database with `pnpm drizzle-kit push`
- **Studio**: Drizzle Studio running on port 4000
- **Testing**: Integration tested with example component at `/testing/drizzle`
- **Coexistence**: Confirmed working alongside existing Prisma setup

### 🚀 Ready to Use
- Import queries from `@/drizzle/queries`
- Use in server components, API routes, or pass as props to client components
- Access Drizzle Studio at `http://localhost:4000` for database management
- All type-safe with full TypeScript support

## Coexistence with Prisma

Drizzle has been set up to work alongside your existing Prisma setup. Both ORMs can coexist in the same project:

- ✅ Prisma continues to work with your existing code
- ✅ Drizzle provides additional type-safe query capabilities
- ✅ You can gradually migrate from Prisma to Drizzle
- ✅ Both use the same PostgreSQL database
- ✅ No conflicts or interference between the two systems

## Schema Structure

The Drizzle schema includes:

### Cards Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `native_currency_id` (UUID, Foreign Key)
- `image_link` (Text)
- `issuer_id` (UUID, Foreign Key)
- `collaborator_id` (UUID)
- `official_link` (Text)
- `is_discontinued` (Boolean, default: false)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Categories Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text)
- `created_at` (Timestamp)

### Issuers Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text)
- `created_at` (Timestamp)

## Next Steps

1. **Start Using Drizzle**: Begin using Drizzle queries in new features
2. **Explore Drizzle Studio**: Use the GUI at `http://localhost:4000` for database management
3. **Gradual Migration**: Slowly replace Prisma queries with Drizzle in existing code
4. **Performance Benefits**: Enjoy better performance and smaller bundle sizes
5. **Type Safety**: Leverage improved type safety and developer experience