export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle browser CORS check
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Test GET request
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "online",
          assistant: "YLIXA",
          message: "YLIXA backend is working!"
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // Handle chat messages
    if (request.method === "POST") {
      try {
        const data = await request.json();
        const message = data.message;

        if (!message) {
          return new Response(
            JSON.stringify({ error: "Message is missing" }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                ...corsHeaders
              }
            }
          );
        }

        return new Response(
          JSON.stringify({
            reply: `YLIXA received: ${message}`
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );

      } catch (error) {
        return new Response(
          JSON.stringify({
            error: "Invalid request"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );
      }
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders
    });
  }
};
