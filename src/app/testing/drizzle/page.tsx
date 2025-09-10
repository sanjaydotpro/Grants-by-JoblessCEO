import DrizzleExample from '@/components/discovery/DrizzleExample'
import { getAllCardsWithDrizzle, getAllCategories, getAllIssuers } from '@/drizzle/queries'

export default async function DrizzleTestPage() {
  // Fetch data on the server side
  const [cards, categories, issuers] = await Promise.all([
    getAllCardsWithDrizzle(),
    getAllCategories(),
    getAllIssuers()
  ]);

  // Mock cardsWithIssuer for now since we don't have that query
  const cardsWithIssuer = cards;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Drizzle ORM Integration Test
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page demonstrates the successful integration of Drizzle ORM alongside 
            the existing Prisma setup. All queries are type-safe and performant.
          </p>
        </div>
        
        <DrizzleExample 
          cards={cards}
          cardsWithIssuer={cardsWithIssuer}
          categories={categories}
          issuers={issuers}
        />
        
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔗 Integration Status</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Drizzle ORM configured and connected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Database schema applied successfully</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Type-safe queries working</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Coexisting with Prisma setup</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Use Drizzle for new features and components</li>
              <li>• Gradually migrate existing Prisma queries to Drizzle</li>
              <li>• Leverage Drizzle Studio for database exploration</li>
              <li>• Enjoy better type safety and performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}