import DrizzleExample from '@/components/discovery/DrizzleExample'
import { getAllGrants, getAllInstitutions, getGrantsWithInstitution } from '@/drizzle/queries'

// Force dynamic rendering to prevent database calls during build
export const dynamic = 'force-dynamic'

export default async function DrizzleTestPage() {
  try {
    // Fetch data from the database
    const grants = await getAllGrants();
    const institutions = await getAllInstitutions();
    const grantsWithInstitutions = await getGrantsWithInstitution();

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Drizzle ORM Integration Test - Grants System
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This page demonstrates the successful integration of Drizzle ORM alongside 
              the existing Prisma setup. All queries are type-safe and performant.
            </p>
          </div>
          
          <DrizzleExample 
            grants={grants}
            institutions={institutions}
            grantsWithInstitutions={grantsWithInstitutions}
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
  } catch (error) {
    console.error('Database connection error:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Database Connection Error
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unable to connect to the database. Please ensure your database is running and the DATABASE_URL is correctly configured.
            </p>
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Error: {error instanceof Error ? error.message : 'Unknown database error'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}