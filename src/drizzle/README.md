# Drizzle ORM Setup

This directory contains the Drizzle ORM configuration and schema files for the credit cards application.

## Files Overview

- `drizzle.config.ts` - Drizzle Kit configuration file
- `schema.ts` - Database schema definitions using Drizzle ORM
- `db.ts` - Database connection and Drizzle instance
- `queries.ts` - Example queries and database operations
- `migrations/` - Generated SQL migration files

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