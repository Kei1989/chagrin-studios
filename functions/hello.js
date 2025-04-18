export async function onRequest(context) {
  const db = context.env.DB; // Your D1 binding
  const result = await db.prepare("SELECT * FROM users LIMIT 1").first();
  return new Response(JSON.stringify(result));
}
