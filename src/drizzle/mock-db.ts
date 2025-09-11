// Mock database implementation for development when better-sqlite3 is not available

interface Institution {
  id: number;
  name: string;
  type: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

interface Grant {
  id: number;
  name: string;
  institution_id: number | null;
  grant_amount: string | null;
  website: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// In-memory storage
let institutions: Institution[] = [
  {
    id: 1,
    name: 'Harvard University',
    type: 'Private Research University',
    location: 'Cambridge, MA',
    website: 'https://harvard.edu',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Stanford University',
    type: 'Private Research University',
    location: 'Stanford, CA',
    website: 'https://stanford.edu',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'MIT',
    type: 'Private Research University',
    location: 'Cambridge, MA',
    website: 'https://mit.edu',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

let grants: Grant[] = [
  {
    id: 1,
    name: 'Research Excellence Grant',
    institution_id: 1,
    grant_amount: '$50,000',
    website: 'https://harvard.edu/grants',
    description: 'Supporting innovative research projects',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Innovation Fund',
    institution_id: 2,
    grant_amount: '$25,000',
    website: 'https://stanford.edu/funding',
    description: 'Funding for startup initiatives',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Technology Grant',
    institution_id: 3,
    grant_amount: '$75,000',
    website: 'https://mit.edu/grants',
    description: 'Advanced technology development funding',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

let nextInstitutionId = 4;
let nextGrantId = 4;

// Mock database operations
export const mockDb = {
  // Institutions
  institutions: {
    findMany: () => Promise.resolve(institutions),
    findFirst: (where: { id: number }) => Promise.resolve(institutions.find(i => i.id === where.id)),
    create: (data: { values: Omit<Institution, 'id' | 'created_at' | 'updated_at'> }) => {
      const newInstitution: Institution = {
        id: nextInstitutionId++,
        ...data.values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      institutions.push(newInstitution);
      return Promise.resolve(newInstitution);
    },
    update: (where: { id: number }, data: { set: Partial<Institution> }) => {
      const index = institutions.findIndex(i => i.id === where.id);
      if (index !== -1) {
        institutions[index] = {
          ...institutions[index],
          ...data.set,
          updated_at: new Date().toISOString()
        };
        return Promise.resolve(institutions[index]);
      }
      return Promise.resolve(null);
    },
    delete: (where: { id: number }) => {
      const index = institutions.findIndex(i => i.id === where.id);
      if (index !== -1) {
        const deleted = institutions.splice(index, 1)[0];
        return Promise.resolve(deleted);
      }
      return Promise.resolve(null);
    }
  },
  
  // Grants
  grants: {
    findMany: () => Promise.resolve(grants),
    findFirst: (where: { id: number }) => Promise.resolve(grants.find(g => g.id === where.id)),
    create: (data: { values: Omit<Grant, 'id' | 'created_at' | 'updated_at'> }) => {
      const newGrant: Grant = {
        id: nextGrantId++,
        ...data.values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      grants.push(newGrant);
      return Promise.resolve(newGrant);
    },
    update: (where: { id: number }, data: { set: Partial<Grant> }) => {
      const index = grants.findIndex(g => g.id === where.id);
      if (index !== -1) {
        grants[index] = {
          ...grants[index],
          ...data.set,
          updated_at: new Date().toISOString()
        };
        return Promise.resolve(grants[index]);
      }
      return Promise.resolve(null);
    },
    delete: (where: { id: number }) => {
      const index = grants.findIndex(g => g.id === where.id);
      if (index !== -1) {
        const deleted = grants.splice(index, 1)[0];
        return Promise.resolve(deleted);
      }
      return Promise.resolve(null);
    }
  }
};

export function getMockDb() {
  return mockDb;
}