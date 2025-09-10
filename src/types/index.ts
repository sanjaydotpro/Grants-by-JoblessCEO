export interface SingleTag {
  filter: string;
  id: string | number;
  label: string | null;
  value: string;
  prefix?: string;
  suffix?: string;
  href?: string;
  description?: string;
  IconName?: React.ElementType;
}
export interface OrganisedTags {
  [filters: string]: SingleTag[];
}

export interface searchCards {
  id: string;
  name: string;
  image: string;
}
export interface searchCardsResponse {
  cards: searchCards[];
  totalResults: number;
}
export interface Notifications {
  value: string;
  type: string;
}
export interface SingleCardCategory {
  id: number;
  title: string;
  href: string;
  description: string;
  IconName: React.ElementType;
}

export interface FilterQueryParams {
  search?: string;
  sort?: string;
  order?: string;
  page?: number;
  size?: number;
  categoryIds?: string[];
  issuerIds?: string[];
  featureIds?: string[];
  collaborationIds?: string[];
  employmentIds?: string[];
  income?: number[];
  fees?: number[];
  interest?: number[];
  cibil?: number[];
  age?: number[];
  valueback?: number[];
}

export interface Card {
  id: string;
  name: string;
  image: string;
  currency: Currency;
  issuer: Issuer;
  categories: Category[];
  features: Feature[];
  fees?: Fees;
  eligibility?: Eligibility;
  collaborator: Collaborator | null;
  official_website: string;
  speciality: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Collaborator {
  id: string;
  name: string;
}

export interface Currency {
  id: string;
  name: string;
  short_name: string;
  symbol: string;
}
export interface Eligibility {
  id: string;
  min_age: number;
  max_age: number;
  annual_income_or_itr: number;
  special_employment: null;
  nationality: string;
  document_proofs: DocumentProofs;
  additional_info: null;
  created_at: string;
  min_cibil_score: string;
  card_id: string;
}

export interface DocumentProofs {
  "Income Proof": string;
  "Identity Proof": string;
  "Resident Proof": string;
}

export interface Feature {
  feature_id: string;
  feature_name: string;
  feature_category: string;
  feature_description: string;
  offer_type: string;
  detailed_info: string[] | null;
}

export interface Fees {
  created_at: string;
  cash_withdrawl_fee: Fee;
  rent_transaction_fee: Fee;
  cash_deposit_fee: Fee;
  card_replacement_fee: Fee;
  railway_booking_fee: Fee;
  overlimit_fee: Fee;
  late_payment_fee: Fee;
  balance_transfer_fee: Fee;
  emi_processing_fee: Fee;
  duplicate_statement_fee: Fee;
  fuel_fee: Fee;
  id: string;
  card_id: string;
  addon_card_fee: Fee;
  chargeback_fee: Fee;
  outstation_cheque_fee: Fee;
  cheque_bounce_fee: Fee;
  mobile_alert_fee: Fee;
  hotlisting_fee: Fee;
  reward_redemption_fee: Fee;
  renewal_fee: number;
  joining_fee: number;
  finance_fee: number;
  forex_fee: number;
}

export interface Fee {
  fee: FeeClass;
  prefix: string;
  suffix: string;
  description: Description[];
}

export interface Description {
  fee: number;
  condition: string;
}

export interface FeeClass {
  max: number;
  min: number;
}

export interface Issuer {
  id: string;
  name: string;
  short_form: string;
  display_name: string;
  official_site: null;
  cc_mitc: null;
  cc_soc: null;
}

export interface GetCardsResponse {
  data: Card[];
  totalResults: number;
}

export interface URLFiltersType {
  search?: string | string[];
  category?: string | string[];
  feature?: string | string[];
  issuer?: string | string[];
  collaborator?: string | string[];
  income?: string | string[];
  fees?: string | string[];
  [key: string]: string | string[] | undefined;
}

export interface CardsProps {
  allFilters: OrganisedTags | null;
  filtersError: string | null;
  cards: GetCardsResponse;
  cardsError: string | null;
  urlFilters: URLFiltersType;
  page: number;
  size: number;
  sort: string;
  order: string;
  totalResults: number;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
}

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}
