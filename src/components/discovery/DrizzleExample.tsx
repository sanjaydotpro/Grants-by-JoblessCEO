'use client';

import React, { useState } from 'react';
import type { Grant, Institution, GrantWithInstitution } from '@/drizzle/types';

interface DrizzleExampleProps {
  grants: Grant[];
  institutions: Institution[];
  grantsWithInstitutions: GrantWithInstitution[];
}

// Example component showing how to use Drizzle queries
export default function DrizzleExample({ grants, institutions, grantsWithInstitutions }: DrizzleExampleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Grant[]>([]);

  // Handle search (client-side filtering for demo)
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = grants.filter(grant => 
      grant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔍 Search Grants (Drizzle)</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for grants..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-700">Search Results ({searchResults.length}):</h3>
            <div className="grid gap-2">
              {searchResults.map((grant) => (
                <div key={grant.id} className="p-3 bg-gray-50 rounded border">
                  <div className="font-medium">{grant.name || 'Unnamed Grant'}</div>
                  <div className="text-sm text-gray-600">Amount: ${grant.grantAmount || 'Not specified'}</div>
                  <div className="text-sm text-gray-500 mt-1">{grant.description || 'No description'}</div>
                  {grant.website && (
                    <a href={grant.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline block mt-1">
                      Grant Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{grants.length}</div>
          <div className="text-sm text-gray-600">Total Grants</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{grantsWithInstitutions.length}</div>
          <div className="text-sm text-gray-600">Grants with Institutions</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{institutions.length}</div>
          <div className="text-sm text-gray-600">Institutions</div>
        </div>
      </div>

      {/* Grants with Institution Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🏛️ Grants with Institution Information</h2>
        {grantsWithInstitutions.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {grantsWithInstitutions.slice(0, 6).map((grant) => (
              <div key={grant.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">
                  {grant.name || 'Unnamed Grant'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Institution: {grant.institution?.name || 'No institution'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Amount: ${grant.grantAmount || 'Not specified'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  ID: {grant.id}
                </p>
                {grant.website && (
                  <a 
                    href={grant.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                  >
                    Grant Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No grants with institution information found.</p>
        )}
      </div>

      {/* Institutions Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🏛️ Institutions</h2>
        {institutions.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {institutions.map((institution) => (
              <div key={institution.id} className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-medium text-gray-900">
                  {institution.name || 'Unnamed Institution'}
                </h3>
                {institution.website && (
                  <a 
                    href={institution.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No institutions found.</p>
        )}
      </div>

      {/* Code Example */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📝 Code Example</h2>
        <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Import Drizzle queries
import { 
  getAllGrants, 
  getGrantsWithInstitution, 
  getAllInstitutions,
  searchGrants 
} from '@/drizzle/queries';

// Use in your components
const grants = await getAllGrants();
const grantsWithInstitutions = await getGrantsWithInstitution();
const institutions = await getAllInstitutions();
const searchResults = await searchGrants({ name: 'research' });`}
        </pre>
      </div>
    </div>
  );
}