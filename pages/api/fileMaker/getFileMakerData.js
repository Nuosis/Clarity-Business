export default async function handler(req, res) {
  const { database, layout, query } = req.body;

  // Ensure all required parameters are present
  if (!database || !layout || !query) {
    return res.status(400).json({
      error: 'Missing required parameters: database, layout, query',
    });
  }

  const server = process.env.NEXT_PUBLIC_CLARITY_URL;
  let token;

  try {
    // Get the token from the internal API route (pages/api/getFileMakerToken.js)
    const tokenResponse = await fetch(`/api/getFileMakerToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ database }), // Pass the database name
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error || 'Failed to retrieve token');
    }

    token = tokenData.token; // Store the token from the response

    // Construct the URL for querying FileMaker data
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/_find`;

    // Make the POST request to FileMaker API
    const dataResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: query,  // Pass the query array
      }),
    });

    const data = await dataResponse.json();

    if (dataResponse.ok) {
      // Return successful response from FileMaker API
      return res.status(200).json({ success: true, data: data.response.data });
    } else {
      // Handle error response from FileMaker API
      return res.status(dataResponse.status).json({ success: false, error: data.messages[0].message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to communicate with FileMaker server: ' + error.message });
  } finally {
    // Ensure the token is released even if an error occurs
    if (token) {
      try {
        // Call the API route to release the token (pages/api/releaseFileMakerToken.js)
        await fetch(`/api/releaseFileMakerToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            server,
            database,
            token,
          }),
        });
      } catch (releaseError) {
        console.error('Failed to release FileMaker token:', releaseError);
      }
    }
  }
}
