import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { institutions, grants, newsUpdates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface ParsedData {
  [key: string]: any;
}

interface UploadResponse {
  success: boolean;
  message: string;
  insertedCount?: number;
  errors?: string[];
}

// Helper function to parse Excel files
function parseExcelFile(buffer: ArrayBuffer): ParsedData[] {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet) as ParsedData[];
  
  // Filter out empty columns that Excel exports as __EMPTY_1, __EMPTY_2, etc.
  const cleanedData = rawData.map(row => {
    const cleanRow: ParsedData = {};
    Object.keys(row).forEach(key => {
      // Skip empty columns and columns with only whitespace
      if (!key.startsWith('__EMPTY_') && key.trim() !== '' && row[key] !== undefined && row[key] !== null) {
        cleanRow[key] = row[key];
      }
    });
    return cleanRow;
  }).filter(row => Object.keys(row).length > 0); // Remove completely empty rows
  
  return cleanedData;
}

// Helper function to parse CSV files
function parseCSVFile(text: string): Promise<ParsedData[]> {
  return new Promise((resolve, reject) => {
    console.log('Raw CSV text preview:', text.substring(0, 200));
    
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => {
        // Clean up header names
        const cleaned = header.trim();
        console.log('Header transformation:', header, '->', cleaned);
        return cleaned;
      },
      complete: (results) => {
        console.log('Papa parse results:', {
          data: results.data.slice(0, 2),
          errors: results.errors,
          meta: results.meta
        });
        
        // Only reject if there are critical parsing errors, not field count mismatches
        const criticalErrors = results.errors.filter(error => 
          !error.message.includes('Too many fields') && 
          !error.message.includes('Too few fields')
        );
        
        if (criticalErrors.length > 0) {
          reject(new Error(`CSV parsing error: ${criticalErrors[0].message}`));
        } else {
          // Filter out empty columns that Google Sheets exports as __EMPTY_1, __EMPTY_2, etc.
          const cleanedData = (results.data as ParsedData[]).map(row => {
            const cleanRow: ParsedData = {};
            Object.keys(row).forEach(key => {
              // Skip empty columns and columns with only whitespace
              const value = row[key];
              const trimmedValue = typeof value === 'string' ? value.trim() : value;
              if (!key.startsWith('__EMPTY_') && key.trim() !== '' && trimmedValue !== undefined && trimmedValue !== null && trimmedValue !== '') {
                cleanRow[key] = trimmedValue;
              }
            });
            return cleanRow;
          }).filter(row => Object.keys(row).length > 0); // Remove completely empty rows
          
          console.log('Cleaned data sample:', cleanedData.slice(0, 2));
          resolve(cleanedData);
        }
      },
      error: (error: Error) => reject(error)
    });
  });
}

// Helper function to validate and transform institution data
function validateInstitutionData(data: ParsedData[]): any[] {
  const errors: string[] = [];
  const validData: any[] = [];

  data.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because index starts at 0 and we skip header
    
    // Enhanced column mapping for institution name
    const name = findColumnValue(row, [
      'name', 'institution', 'institution name', 'organization', 'org', 
      'company', 'foundation', 'university', 'college', 'school'
    ]);
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.push(`Row ${rowNumber}: Institution name is required`);
      return;
    }

    // Enhanced column mapping for other fields
    const type = findColumnValue(row, [
      'type', 'category', 'kind', 'classification', 'sector'
    ]);
    
    const location = findColumnValue(row, [
      'location', 'address', 'city', 'state', 'country', 'region', 'place'
    ]);
    
    const website = findColumnValue(row, [
      'website', 'url', 'link', 'web', 'site', 'homepage'
    ]);

    // Transform and validate data
    const institutionData = {
      name: name.trim(),
      type: type && typeof type === 'string' ? type.trim() : null,
      location: location && typeof location === 'string' ? location.trim() : null,
      website: website && typeof website === 'string' ? website.trim() : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Clean up website if provided
    if (institutionData.website) {
      // Add https:// if it looks like a domain but doesn't have protocol
      if (!institutionData.website.startsWith('http') && institutionData.website.includes('.')) {
        institutionData.website = 'https://' + institutionData.website;
      }
      // Validate website URL format if provided
      if (institutionData.website.startsWith('http') && !isValidUrl(institutionData.website)) {
        errors.push(`Row ${rowNumber}: Invalid website URL format`);
        return;
      }
    }

    validData.push(institutionData);
  });

  if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.join('\n')}`);
  }

  return validData;
}

// Enhanced column mapping function
function findColumnValue(row: ParsedData, possibleNames: string[]): any {
  // First try exact matches (case-insensitive)
  for (const name of possibleNames) {
    const exactMatch = Object.keys(row).find(key => 
      key.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (exactMatch && row[exactMatch]) {
      return row[exactMatch];
    }
  }
  
  // Then try partial matches (contains)
  for (const name of possibleNames) {
    const partialMatch = Object.keys(row).find(key => 
      key.toLowerCase().trim().includes(name.toLowerCase().trim()) ||
      name.toLowerCase().trim().includes(key.toLowerCase().trim())
    );
    if (partialMatch && row[partialMatch]) {
      return row[partialMatch];
    }
  }
  
  return null;
}

// Helper function to validate and transform grant data
function validateGrantData(data: ParsedData[]): any[] {
  const errors: string[] = [];
  const validData: any[] = [];

  data.forEach((row, index) => {
    const rowNumber = index + 2;
    
    // Enhanced column mapping for grant name
    const name = findColumnValue(row, [
      'name', 'grant name', 'grantname', 'title', 'grant title', 'program name', 'program'
    ]);
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.push(`Row ${rowNumber}: Grant name is required`);
      return;
    }

    // Enhanced column mapping for institution
    const institutionName = findColumnValue(row, [
      'institution', 'institutionname', 'institution name', 'organization', 
      'org', 'company', 'foundation', 'funder', 'sponsor'
    ]);
    
    // Use a default institution name if none provided
    const finalInstitutionName = (institutionName && typeof institutionName === 'string' && institutionName.trim() !== '') 
      ? institutionName.trim() 
      : 'Unknown Institution';
    
    // Enhanced column mapping for other fields
    const grantAmount = findColumnValue(row, [
      'grant amount', 'grantamount', 'amount', 'funding', 'value', 'prize', 'award amount'
    ]);
    
    const website = findColumnValue(row, [
      'website', 'url', 'link', 'web', 'site', 'homepage'
    ]);
    
    const description = findColumnValue(row, [
      'description', 'notes', 'target', 'target / notes', 'target/notes', 
      'details', 'summary', 'about', 'info', 'requirements', 'criteria'
    ]);
    
    // Transform and validate data
     const grantData = {
       name: name.trim(),
       institutionName: finalInstitutionName,
       grantAmount: grantAmount,
       website: website,
       description: description,
       createdAt: new Date(),
       updatedAt: new Date()
     };

    // Clean up grant amount if it's a string
    if (grantData.grantAmount && typeof grantData.grantAmount === 'string') {
      grantData.grantAmount = grantData.grantAmount.trim();
      // Remove common currency symbols and formatting
      grantData.grantAmount = grantData.grantAmount.replace(/[$,€£¥]/g, '');
    }

    // Clean up website if provided
    if (grantData.website && typeof grantData.website === 'string') {
      grantData.website = grantData.website.trim();
      // Add https:// if it looks like a domain but doesn't have protocol
      if (grantData.website && !grantData.website.startsWith('http') && grantData.website.includes('.')) {
        grantData.website = 'https://' + grantData.website;
      }
      // Only validate URL format if it clearly looks like a URL
      if (grantData.website && grantData.website.startsWith('http') && !isValidUrl(grantData.website)) {
        errors.push(`Row ${rowNumber}: Invalid website URL format`);
        return;
      }
    }

    validData.push(grantData);
  });

  if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.join('\n')}`);
  }

  return validData;
}

// Helper function to validate and transform news data
function validateNewsData(data: ParsedData[]): any[] {
  const errors: string[] = [];
  const validData: any[] = [];

  data.forEach((row, index) => {
    const rowNumber = index + 2;
    
    // Required field validation
    if (!row.title || typeof row.title !== 'string' || row.title.trim() === '') {
      errors.push(`Row ${rowNumber}: News title is required`);
      return;
    }

    if (!row.content || typeof row.content !== 'string' || row.content.trim() === '') {
      errors.push(`Row ${rowNumber}: News content is required`);
      return;
    }

    // Transform and validate data
    const newsData = {
      title: row.title.trim(),
      content: row.content.trim(),
      category: row.category ? row.category.trim() : 'general',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    validData.push(newsData);
  });

  if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.join('\n')}`);
  }

  return validData;
}

// Helper function to validate URL format
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Helper function to detect data type based on columns
function detectDataType(data: ParsedData[]): string {
  if (!data || data.length === 0) return 'unknown';
  
  const firstRow = data[0];
  const columns = Object.keys(firstRow).map(key => key.toLowerCase().trim());
  
  // Helper function to check if any column matches any of the patterns
  const hasAnyColumn = (patterns: string[]): boolean => {
    return patterns.some(pattern => 
      columns.some(col => {
        // Exact match
        if (col === pattern) return true;
        
        // Column contains pattern (e.g., "grantamount" contains "amount")
        if (col.includes(pattern)) return true;
        
        // Pattern contains column only if column is substantial (3+ chars) and not too generic
        if (pattern.includes(col) && col.length >= 3 && !['name', 'type', 'url', 'institution'].includes(col)) {
          return true;
        }
        
        return false;
      })
    );
  };
  
  // Check for news data first (most specific)
  if (hasAnyColumn(['title']) && hasAnyColumn(['content', 'article', 'body'])) {
    return 'news';
  }
  
  // Check for institutions data - look for institution-specific indicators
  const institutionOnlyIndicators = ['type', 'category', 'location', 'address', 'university', 'college'];
  const institutionNameIndicators = ['institution name', 'organization name', 'org name', 'foundation name'];
  
  // Strong indicators for institutions
  if (hasAnyColumn(institutionOnlyIndicators) || hasAnyColumn(institutionNameIndicators)) {
    return 'institutions';
  }
  
  // Check for grants data - look for grant-specific indicators
  const grantIndicators = ['grant amount', 'grantamount', 'amount', 'funding', 'prize', 'award'];
  const grantNameIndicators = ['grant name', 'grant title', 'program name', 'opportunity'];
  
  if (hasAnyColumn(grantIndicators) || hasAnyColumn(grantNameIndicators)) {
    return 'grants';
  }
  
  // Check if it has institution references (suggests it's grants data)
  const institutionReferenceIndicators = ['institution', 'organization', 'org', 'foundation', 'funder'];
  if (hasAnyColumn(institutionReferenceIndicators) && hasAnyColumn(['name'])) {
    return 'grants';
  }
  
  // Enhanced fallback logic based on column patterns
  if (hasAnyColumn(['name'])) {
    // If it has website and name but no grant-specific fields, likely institutions
    if (hasAnyColumn(['website', 'url', 'link']) && !hasAnyColumn(grantIndicators)) {
      return 'institutions';
    }
    // Otherwise assume grants
    return 'grants';
  }
  
  // Final fallback
  return 'unknown';
}

// Helper function to find or create institution by name
async function findOrCreateInstitution(institutionName: string, website?: string): Promise<string> {
  // First, try to find existing institution
  const existing = await db.select().from(institutions).where(eq(institutions.name, institutionName.trim())).limit(1);
  
  if (existing.length > 0) {
    return existing[0].id;
  }
  
  // Create new institution if not found
  const newInstitution = {
    name: institutionName.trim(),
    website: website?.trim() || null,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const result = await db.insert(institutions).values(newInstitution).returning();
  return result[0].id;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv', // .csv
      'application/octet-stream' // fallback for CSV files
    ];
    
    const allowedExtensions = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload Excel (.xlsx, .xls) or CSV files only" },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size too large. Maximum size is 10MB" },
        { status: 400 }
      );
    }

    // Parse file based on type and extension
    let parsedData: ParsedData[];
    
    if (file.type === 'text/csv' || fileExtension === '.csv') {
      const text = await file.text();
      parsedData = await parseCSVFile(text);
    } else {
      const buffer = await file.arrayBuffer();
      parsedData = parseExcelFile(buffer);
    }

    if (!parsedData || parsedData.length === 0) {
      return NextResponse.json(
        { success: false, error: "No data found in the uploaded file" },
        { status: 400 }
      );
    }

    // Auto-detect data type
    const dataType = detectDataType(parsedData);
    console.log('Detected data type:', dataType);
    console.log('Sample columns:', Object.keys(parsedData[0] || {}));
    console.log('First row sample:', parsedData[0]);
    
    if (dataType === 'unknown') {
      return NextResponse.json(
        { success: false, error: "Unable to detect data type. Please ensure your file has the correct column headers. Found columns: " + Object.keys(parsedData[0]).join(', ') },
        { status: 400 }
      );
    }

    let insertedCount = 0;
    let summary = '';

    if (dataType === 'institutions') {
      const validatedData = validateInstitutionData(parsedData);
      const insertResult = await db.insert(institutions).values(validatedData).returning();
      insertedCount = insertResult.length;
      summary = `Successfully imported ${insertedCount} institutions`;
    } 
    else if (dataType === 'grants') {
      // Validate grant data first
      const validatedData = validateGrantData(parsedData);
      
      // For grants, we need to handle institution linking
      const processedGrants = [];
      const skippedGrants = [];
      
      for (const grantData of validatedData) {
        // Only try to find existing institutions, don't create new ones
        // This ensures institutions only come from the institutions CSV upload
        const existing = await db.select().from(institutions).where(eq(institutions.name, grantData.institutionName.trim())).limit(1);
        
        if (existing.length > 0) {
          // Only process grants that have matching institutions
          const finalGrantData = {
            name: grantData.name,
            institutionId: existing[0].id,
            grantAmount: grantData.grantAmount ? parseFloat(String(grantData.grantAmount).replace(/[^0-9.-]/g, '')) || null : null,
            website: grantData.website,
            description: grantData.description,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          processedGrants.push(finalGrantData);
        } else {
          // Skip grants that don't have matching institutions
          skippedGrants.push(grantData.name);
        }
      }
      
      if (processedGrants.length > 0) {
        const insertResult = await db.insert(grants).values(processedGrants).returning();
        insertedCount = insertResult.length;
        
        if (skippedGrants.length > 0) {
          summary = `Successfully imported ${insertedCount} grants. Skipped ${skippedGrants.length} grants without matching institutions: ${skippedGrants.join(', ')}`;
        } else {
          summary = `Successfully imported ${insertedCount} grants`;
        }
      } else {
        summary = `No grants imported - no matching institutions found for any grants`;
      }
    }
    else if (dataType === 'news') {
      const validatedData = validateNewsData(parsedData);
      const insertResult = await db.insert(newsUpdates).values(validatedData).returning();
      insertedCount = insertResult.length;
      summary = `Successfully imported ${insertedCount} news articles`;
    }

    return NextResponse.json({
      success: true,
      summary: summary,
      insertedCount: insertedCount,
      dataType: dataType
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        success: false, 
        error: `Upload failed: ${errorMessage}`
      },
      { status: 500 }
    );
  }
}