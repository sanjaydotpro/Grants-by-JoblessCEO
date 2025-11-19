import LabspacesClient from "./LabspacesClient";

export const revalidate = 3600;

export default async function LabspacesPage() {
  const url = "https://docs.google.com/spreadsheets/d/1mK5h3-TOgt6wL2Wx-Tf3nkL7F_EpJSfhcUjTlT647jQ/export?format=csv";
  const res = await fetch(url, { next: { revalidate } });
  const text = await res.text();
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else { field += c; }
    } else {
      if (c === '"') { inQuotes = true; }
      else if (c === ',') { row.push(field); field = ""; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === '\r') { }
      else { field += c; }
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  if (!rows.length) return <LabspacesClient initialLabs={[]} />;
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (k: string) => header.indexOf(k);
  const iName = idx("lab name");
  const iCityState = idx("city/state");
  const iCountry = idx("country");
  const iWebsite = idx("website");
  const iSpecialty = idx("lab speciality");
  const iType = idx("lab type");
  const data = rows.slice(1).map((r, i) => {
    const name = r[iName] || "";
    const location = r[iCityState] || "";
    const country = r[iCountry] || "";
    const website = r[iWebsite] || "";
    const specialtyRaw = r[iSpecialty] || "";
    const typeRaw = r[iType] || "";
    const tags = [
      ...specialtyRaw.split(/[,;|]/).map((t) => t.trim()).filter(Boolean),
    ];
    const access = typeRaw.trim();
    return {
      id: `ls-${i + 1}`,
      name,
      operator: country,
      access,
      location,
      tags,
      link: website,
    };
  }).filter((l) => l.name);
  return <LabspacesClient initialLabs={data} />;
}