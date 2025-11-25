export async function onRequestGet({ env }) {
  try {
    const data = await env.HISTORY_DB.get("history", "json");
    return new Response(JSON.stringify(data || []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message || "GET history error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function onRequestPost({ env, request }) {
  try {
    const body = await request.json();
    await env.HISTORY_DB.put("history", JSON.stringify(body));
    return new Response("OK", { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message || "POST history error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
