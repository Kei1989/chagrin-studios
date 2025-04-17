// functions/api/users.js

/**
 * Handles GET requests to /api/users
 * @param {EventContext} context - The context object for the request.
 * Includes { request, env, params, waitUntil, next, data }
 */
export async function onRequestGet(context) {
  // Get the D1 binding from the environment (set in the Cloudflare dashboard)
  const db = context.env.dbtest; // Use the binding name you chose (e.g., 'DB')

  try {
    // Prepare and execute the SQL query
    // Use prepare() for security (prevents SQL injection) even without parameters here
    const ps = db.prepare('SELECT id, user, title, time, content FROM entries');
    const { results } = await ps.all();

    // Return the results as JSON
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    // Log the error internally and return a generic error response
    console.error("Error fetching users:", e);
    // Be careful not to expose sensitive error details to the client
    return new Response('Failed to fetch users', { status: 500 });
  }
}

// You can add other handlers like onRequestPost, onRequestPut, onRequestDelete
// for different HTTP methods on the same /api/users path.
// Example for POST:
/*
export async function onRequestPost(context) {
    const db = context.env.DB;
    try {
        const newUser = await context.request.json(); // Get data from request body

        // IMPORTANT: Always use parameterized queries for inserts/updates/deletes
        const ps = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
                     .bind(newUser.name, newUser.email);
        await ps.run();

        return new Response('User added successfully', { status: 201 });
    } catch (e) {
        console.error("Error adding user:", e);
        return new Response('Failed to add user', { status: 500 });
    }
}
*/
