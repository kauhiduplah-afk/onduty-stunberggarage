export async function onRequestGet({ env }) {
  try {
    const data = await env.HISTORY_DB.get("history", "json");
    return new Response(JSON.stringify(data || []), {
      headers: {
        "Content-Type": "application/json",
        // ==== MATIKAN CACHE DI BROWSER & EDGE ====
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  }
}

export async function onRequestPost({ env, request }) {
  try {
    const body = await request.json();
    await env.HISTORY_DB.put("history", JSON.stringify(body));
    return new Response("OK", {
      status: 200,
      headers: {
        // Supaya response POST juga tidak di-cache aneh-aneh
        "Cache-Control": "no-store"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  }
}
