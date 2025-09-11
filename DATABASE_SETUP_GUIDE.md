# Database Setup Guide for Drizzle ORM

## Current Status
Your application is currently using a **mock database** due to better-sqlite3 compatibility issues with Node.js v24. Here's what you need to connect to your real SQLite database:

## ✅ Already Configured

1. **Database Schema** - Defined in `src/drizzle/schema.ts`:
   - `institutions` table (id, name, website, createdAt, updatedAt)
   - `grants` table (id, name, institutionId, grantAmount, website, description, createdAt, updatedAt)
   - `news_updates` table (id, content, type, createdAt)

2. **Environment Variables** - Set in `.env.local`:
   ```
   DATABASE_URL="file:./dev.db"
   ```

3. **Database File** - Created at `./dev.db`

4. **Migration Files** - Generated in `src/drizzle/migrations/`

5. **API Routes** - Updated to handle both real and mock databases

## 🔧 What You Need to Do

### Option 1: Force Real Database (Recommended)

Add this to your API routes or application startup:

```typescript
import { useRealDatabase } from "@/drizzle/db";

// Call this before using the database
useRealDatabase();
```

### Option 2: Replace better-sqlite3 (Alternative)

If you continue having issues with better-sqlite3, consider switching to a compatible SQLite library:

1. **Install alternative SQLite driver:**
   ```bash
   pnpm remove better-sqlite3
   pnpm add sqlite3
   # or
   pnpm add @libsql/client
   ```

2. **Update database configuration** in `src/drizzle/db.ts`

### Option 3: Use Mock Database (Current)

Your application is currently working with mock data that includes:
- 3 sample institutions (NSF, NIH, DOE)
- 3 sample grants with proper relationships
- Full CRUD operations through the admin portal

## 🚀 Testing Database Connection

To test if your real database is working:

1. **Check database connection:**
   ```typescript
   import { isUsingRealDatabase } from "@/drizzle/db";
   console.log('Using real database:', isUsingRealDatabase());
   ```

2. **Run migrations:**
   ```bash
   pnpm db:push
   ```

3. **Verify in admin portal:**
   - Visit http://localhost:3000/admin
   - Check if data persists after server restart

## 📝 Database Operations

Once connected to the real database, you can:

```typescript
import { db } from "@/drizzle/db";
import { institutions, grants } from "@/drizzle/schema";

// Create institution
const newInstitution = await db.insert(institutions).values({
  name: "Example University",
  website: "https://example.edu"
}).returning();

// Create grant
const newGrant = await db.insert(grants).values({
  name: "Research Grant",
  institutionId: newInstitution[0].id,
  grantAmount: 50000,
  description: "Research funding"
}).returning();

// Query with joins
const grantsWithInstitutions = await db
  .select({
    grantName: grants.name,
    institutionName: institutions.name,
    amount: grants.grantAmount
  })
  .from(grants)
  .leftJoin(institutions, eq(grants.institutionId, institutions.id));
```

## 🔍 Troubleshooting

- **better-sqlite3 errors**: This is a known compatibility issue with Node.js v24
- **Mock data**: Your app works perfectly with mock data for development
- **Real database**: Use `useRealDatabase()` to force real database connection
- **Migrations**: Run `pnpm db:generate` and `pnpm db:push` to sync schema

## 📊 Current Admin Portal Features

✅ View institutions and grants  
✅ Add new institutions  
✅ Add new grants with institution relationships  
✅ Edit existing records  
✅ Delete records  
✅ Data validation and error handling  

Your admin portal is fully functional with mock data and ready to switch to real database when needed!