import axios from "axios";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    // Make a request to the API
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Return the response from the API
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during login request:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
