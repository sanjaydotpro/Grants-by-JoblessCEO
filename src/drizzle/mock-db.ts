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

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  details: string;
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

let waitlistEntries: WaitlistEntry[] = [];

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
  },

  waitlist: {
    findMany: () => Promise.resolve(waitlistEntries),
    findFirst: (where: { email: string }) => Promise.resolve(waitlistEntries.find(w => w.email === where.email)),
    create: (data: { values: Omit<WaitlistEntry, 'id' | 'created_at' | 'updated_at'> }) => {
      const newEntry: WaitlistEntry = {
        id: crypto.randomUUID(),
        ...data.values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      waitlistEntries.push(newEntry);
      return Promise.resolve([newEntry]);
    },
    update: (where: { id: string }, data: { set: Partial<WaitlistEntry> }) => {
      const index = waitlistEntries.findIndex(w => w.id === where.id);
      if (index !== -1) {
        waitlistEntries[index] = { ...waitlistEntries[index], ...data.set, updated_at: new Date().toISOString() };
        return Promise.resolve([waitlistEntries[index]]);
      }
      return Promise.resolve([]);
    },
    delete: (where: { id: string }) => {
      const index = waitlistEntries.findIndex(w => w.id === where.id);
      if (index !== -1) {
        waitlistEntries.splice(index, 1);
      }
      return Promise.resolve(waitlistEntries.filter(w => w.id !== where.id));
    }
  }
};

export function getMockDb() {
  return {
    select: (fields: any) => ({
      from: (table: any) => ({
        where: (condition: any) => ({
          orderBy: (order: any) => Promise.resolve(waitlistEntries.map(entry => ({
            id: entry.id,
            name: entry.name,
            email: entry.email,
            mobile: entry.mobile,
            details: entry.details,
            createdAt: entry.created_at
          }))),
          limit: (count: number) => Promise.resolve(waitlistEntries.slice(0, count))
        }),
        orderBy: (order: any) => Promise.resolve(waitlistEntries.map(entry => ({
          id: entry.id,
          name: entry.name,
          email: entry.email,
          mobile: entry.mobile,
          details: entry.details,
          createdAt: entry.created_at
        }))),
        limit: (count: number) => Promise.resolve(waitlistEntries.slice(0, count)),
        then: (callback: any) => Promise.resolve(waitlistEntries.map(entry => ({
          id: entry.id,
          name: entry.name,
          email: entry.email,
          mobile: entry.mobile,
          details: entry.details,
          createdAt: entry.created_at
        }))).then(callback)
      }),
      then: (callback: any) => Promise.resolve(waitlistEntries.map(entry => ({
        id: entry.id,
        name: entry.name,
        email: entry.email,
        mobile: entry.mobile,
        details: entry.details,
        createdAt: entry.created_at
      }))).then(callback)
    }),
    insert: (table: any) => ({
      values: (data: any) => ({
        returning: (fields: any) => {
          // For now, assume all inserts are for waitlist since it's the only table we're implementing
          // In a real implementation, you'd check the table structure properly
          if (data && data.name && data.email && data.mobile && data.details) {
            // Check for duplicate email
            const existingEntry = waitlistEntries.find(w => w.email === data.email);
            if (existingEntry) {
              const error = new Error('duplicate key value violates unique constraint');
              error.name = 'PostgresError';
              throw error;
            }
            
            const newEntry: WaitlistEntry = {
              id: crypto.randomUUID(),
              name: data.name,
              email: data.email,
              mobile: data.mobile,
              details: data.details,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            waitlistEntries.push(newEntry);
            return Promise.resolve([{
              id: newEntry.id,
              name: newEntry.name,
              email: newEntry.email,
              createdAt: newEntry.created_at
            }]);
          }
          return Promise.resolve([]);
        }
      })
    })
  };
}