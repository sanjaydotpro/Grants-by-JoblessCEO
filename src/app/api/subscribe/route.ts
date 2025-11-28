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
      return new Response(JSON.stringify({ ok: false, error: 'upstream_failed' }), {
        status: 502,
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
