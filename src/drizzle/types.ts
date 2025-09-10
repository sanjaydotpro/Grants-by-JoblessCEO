import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  cards,
  categories,
  issuers,
  newsUpdates,
  collaborators,
  employment,
  features,
  networks
} from "./schema";

// Select types (for reading from database)
export type Card = InferSelectModel<typeof cards>;
export type Category = InferSelectModel<typeof categories>;
export type Issuer = InferSelectModel<typeof issuers>;
export type NewsUpdate = InferSelectModel<typeof newsUpdates>;
export type Collaborator = InferSelectModel<typeof collaborators>;
export type Employment = InferSelectModel<typeof employment>;
export type Feature = InferSelectModel<typeof features>;
export type Network = InferSelectModel<typeof networks>;

// Insert types (for creating new records)
export type NewCard = InferInsertModel<typeof cards>;
export type NewCategory = InferInsertModel<typeof categories>;
export type NewIssuer = InferInsertModel<typeof issuers>;
export type NewNewsUpdate = InferInsertModel<typeof newsUpdates>;
export type NewCollaborator = InferInsertModel<typeof collaborators>;
export type NewEmployment = InferInsertModel<typeof employment>;
export type NewFeature = InferInsertModel<typeof features>;
export type NewNetwork = InferInsertModel<typeof networks>;

// Update types (for partial updates)
export type UpdateCard = Partial<Omit<Card, 'id' | 'createdAt'>>;
export type UpdateCategory = Partial<Omit<Category, 'id' | 'createdAt'>>;
export type UpdateIssuer = Partial<Omit<Issuer, 'id' | 'createdAt'>>;
export type UpdateNewsUpdate = Partial<Omit<NewsUpdate, 'id' | 'createdAt'>>;
export type UpdateCollaborator = Partial<Omit<Collaborator, 'id' | 'createdAt'>>;
export type UpdateEmployment = Partial<Omit<Employment, 'id' | 'createdAt'>>;
export type UpdateFeature = Partial<Omit<Feature, 'id' | 'createdAt'>>;
export type UpdateNetwork = Partial<Omit<Network, 'id' | 'createdAt'>>;

// Extended types with relations
export type CardWithIssuer = Card & {
  issuer: Issuer | null;
};

export type CardWithCollaborator = Card & {
  collaborator: Collaborator | null;
};

export type CardWithRelations = Card & {
  issuer: Issuer | null;
  collaborator: Collaborator | null;
};

export type IssuerWithCards = Issuer & {
  cards: Card[];
};

export type CollaboratorWithCards = Collaborator & {
  cards: Card[];
};

// Search and filter types
export type CardSearchParams = {
  name?: string;
  issuerId?: string;
  collaboratorId?: string;
  isDiscontinued?: boolean;
  limit?: number;
  offset?: number;
};

export type CardSortOptions = {
  field: 'name' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
};

// API response types
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Database operation result types
export type DatabaseResult<T> = {
  success: boolean;
  data?: T;
  error?: Error;
};

// Query options
export type QueryOptions = {
  limit?: number;
  offset?: number;
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
};

// Validation types
export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

// Database connection types
export type DatabaseConfig = {
  url: string;
  ssl?: boolean;
  poolMin?: number;
  poolMax?: number;
};

export type ConnectionStatus = {
  connected: boolean;
  error?: string;
  timestamp: Date;
};

// Export all schema tables for type inference
export {
  cards,
  categories,
  issuers,
  newsUpdates,
  collaborators,
  employment,
  features,
  networks
} from "./schema";