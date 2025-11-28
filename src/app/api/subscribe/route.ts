import { getPool } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let email = '';
    let page = '';

    if (contentType.includes('application/json')) {
      const data = await req.json();
      email = String(data?.email || '');
      page = String(data?.page || '');
    } else if (contentType.includes('multipart/form-data')) {
      const fd = await req.formData();
      email = String(fd.get('email') || '');
      page = String(fd.get('page') || '');
    }

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'invalid_email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pool = getPool();
    if (!pool) {
      return new Response(JSON.stringify({ ok: false, error: 'db_not_configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tableName = process.env.POSTGRES_EMAIL_TABLE || 'grants';
    const tn = '"' + tableName.replace(/"/g, '""') + '"';
    await pool.query(`INSERT INTO ${tn} ("email") VALUES ($1) ON CONFLICT ("email") DO NOTHING`, [email]);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyM72191u6GcOMq2WZZWdtODKXkbypQVFg5TbMd8_gAmCl05CtZo9SoWX6TksOVjIG8/exec';

    const body = new URLSearchParams();
    body.append('email', email);
    if (page) body.append('page', page);

    const res = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ ok: true, upstream: 'failed' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: 'server_error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
