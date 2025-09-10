'use client';

import React, { useState } from 'react';

interface Card {
  id: string
  name: string | null
  nativeCurrencyId: string | null
  imageLink: string | null
  issuerId: string | null
  collaboratorId: string | null
  officialLink: string | null
  isDiscontinued: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
  issuer?: {
    name: string
  }
}

interface Category {
  id: string
  name: string | null
  description: string | null
  createdAt: Date | null
}

interface Issuer {
  id: string
  name: string | null
  description: string | null
  createdAt: Date | null
}

interface DrizzleExampleProps {
  cards: Card[];
  cardsWithIssuer: Card[];
  categories: Category[];
  issuers: Issuer[];
}

// Example component showing how to use Drizzle queries
export default function DrizzleExample({ cards, cardsWithIssuer, categories, issuers }: DrizzleExampleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Card[]>([]);

  // Handle search (client-side filtering for demo)
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = cards.filter(card => 
      card.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };



  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          🚀 Drizzle ORM Integration Example
        </h1>
        <p className="text-blue-700">
          This component demonstrates how to use Drizzle queries alongside your existing Prisma setup.
        </p>
      </div>



      {/* Search Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔍 Search Cards (Drizzle)</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for cards..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Search Results ({searchResults.length}):</h3>
            <div className="grid gap-2">
              {searchResults.map((card) => (
                <div key={card.id} className="p-3 bg-gray-50 rounded border">
                  <div className="font-medium">{card.name || 'Unnamed Card'}</div>
                  <div className="text-sm text-gray-600">ID: {card.id}</div>
                  {card.officialLink && (
                    <a href={card.officialLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline block mt-1">
                      Official Link
                    </a>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Status: {card.isDiscontinued ? 'Discontinued' : 'Active'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{cards.length}</div>
          <div className="text-sm text-gray-600">Total Cards</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{cardsWithIssuer.length}</div>
          <div className="text-sm text-gray-600">Cards with Issuers</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{issuers.length}</div>
          <div className="text-sm text-gray-600">Issuers</div>
        </div>
      </div>

      {/* Cards with Issuer Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">💳 Cards with Issuer Information</h2>
        {cardsWithIssuer.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cardsWithIssuer.slice(0, 6).map((card) => (
              <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">
                  {card.name || 'Unnamed Card'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Issuer: {card.issuer?.name || 'No issuer'}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  ID: {card.id}
                </p>
                {card.officialLink && (
                  <a 
                    href={card.officialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                  >
                    Official Link →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No cards with issuer information found.</p>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📂 Categories</h2>
        {categories.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-medium text-gray-900">
                  {category.name || 'Unnamed Category'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {category.description || 'No description'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No categories found.</p>
        )}
      </div>

      {/* Issuers Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🏦 Issuers</h2>
        {issuers.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {issuers.map((issuer) => (
              <div key={issuer.id} className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-medium text-gray-900">
                  {issuer.name || 'Unnamed Issuer'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {issuer.description || 'No description'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No issuers found.</p>
        )}
      </div>

      {/* Code Example */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">💻 Usage Example</h2>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`// Import Drizzle queries
import { 
  getAllCardsWithDrizzle, 
  getCardsWithIssuer, 
  searchCardsByName 
} from '@/drizzle/queries';

// Use in your components
const cards = await getAllCardsWithDrizzle();
const cardsWithIssuer = await getCardsWithIssuer();
const searchResults = await searchCardsByName('visa');`}
        </pre>
      </div>
    </div>
  );
}