import { NextRequest, NextResponse } from "next/server";
import { db, useRealDatabase } from "@/drizzle/db";
import { institutions, grants, newsUpdates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// Force real database usage
useRealDatabase();

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
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
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
    
    // Required field validation
    if (!row.name || typeof row.name !== 'string' || row.name.trim() === '') {
      errors.push(`Row ${rowNumber}: Institution name is required`);
      return;
    }

    // Transform and validate data
    const institutionData = {
      name: row.name.trim(),
      type: row.type ? row.type.trim() : null,
      location: row.location ? row.location.trim() : null,
      website: row.website ? row.website.trim() : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Validate website URL format if provided
    if (institutionData.website && !isValidUrl(institutionData.website)) {
      errors.push(`Row ${rowNumber}: Invalid website URL format`);
      return;
    }

    validData.push(institutionData);
  });

  if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.join('\n')}`);
  }

  return validData;
}

// Helper function to validate and transform grant data
function validateGrantData(data: ParsedData[]): any[] {
  const errors: string[] = [];
  const validData: any[] = [];

  data.forEach((row, index) => {
    const rowNumber = index + 2;
    
    // Create a case-insensitive key mapping
    const normalizedRow: { [key: string]: any } = {};
    Object.keys(row).forEach(key => {
      normalizedRow[key.toLowerCase().trim()] = row[key];
    });
    
    // Required field validation
    const name = normalizedRow['name'] || row.Name || row.NAME;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.push(`Row ${rowNumber}: Grant name is required`);
      return;
    }

    // Get institution name from various possible column names
    const institutionName = normalizedRow['institution'] || row.Institution || row.INSTITUTION;
    
    // Use a default institution name if none provided
    const finalInstitutionName = (institutionName && typeof institutionName === 'string' && institutionName.trim() !== '') 
      ? institutionName.trim() 
      : 'Unknown Institution';
    
    // Transform and validate data with correct column mapping
     const grantData = {
       name: name.trim(),
       institutionName: finalInstitutionName,
       grantAmount: normalizedRow['grant amount'] || normalizedRow['grantamount'] || row['Grant Amount'] || null,
       website: normalizedRow['website'] || row.Website || row.WEBSITE || null,
       description: normalizedRow['target / notes'] || normalizedRow['target/notes'] || normalizedRow['notes'] || row['Target / Notes'] || row.Notes || null,
       createdAt: new Date(),
       updatedAt: new Date()
     };

    // Clean up grant amount if it's a string
    if (grantData.grantAmount && typeof grantData.grantAmount === 'string') {
      grantData.grantAmount = grantData.grantAmount.trim();
    }

    // Clean up website if provided
    if (grantData.website && typeof grantData.website === 'string') {
      grantData.website = grantData.website.trim();
      // Only validate URL format if it clearly looks like a URL (starts with http/https)
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
  
  // Check for Google Sheets grant format (has name, grant amount, and institution)
  if (columns.includes('name') && 
      (columns.includes('grant amount') || columns.includes('grantamount')) &&
      columns.includes('institution')) {
    return 'grants';
  }
  
  // Check for standard grant columns (has name and institution reference)
  if (columns.includes('name') && (columns.includes('institutionname') || columns.includes('institution_name'))) {
    return 'grants';
  }
  
  // Check for institution columns (has name but no institution reference)
  if (columns.includes('name') && !columns.includes('institutionname') && !columns.includes('institution_name') && !columns.includes('institution')) {
    return 'institutions';
  }
  
  // Check for news columns
  if (columns.includes('title') && columns.includes('content')) {
    return 'news';
  }
  
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
      
      for (const grantData of validatedData) {
        // Find or create institution (validation already ensures institutionName exists)
        // Don't pass the grant's website to institution - institutions should only have names
        const institutionId = await findOrCreateInstitution(grantData.institutionName);
        
        const finalGrantData = {
          name: grantData.name,
          institutionId: institutionId,
          grantAmount: grantData.grantAmount ? parseFloat(String(grantData.grantAmount).replace(/[^0-9.-]/g, '')) || null : null,
          website: grantData.website,
          description: grantData.description,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        processedGrants.push(finalGrantData);
      }
      
      if (processedGrants.length > 0) {
        const insertResult = await db.insert(grants).values(processedGrants).returning();
        insertedCount = insertResult.length;
        summary = `Successfully imported ${insertedCount} grants`;
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