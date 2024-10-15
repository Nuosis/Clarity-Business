export default async function handler(req, res) {
  const { database, layout, recordID } = req.body;

  // Ensure all required parameters are present
  if (!database || !layout || !recordID) {
    return res.status(400).json({
      error: 'Missing required parameters: database, layout, recordID',
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

    // Construct the URL for deleting a record
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/records/${recordID}`;

    // Make the DELETE request to FileMaker API to delete the record
    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const deleteData = await deleteResponse.json();

    if (deleteResponse.ok) {
      // Return successful response from FileMaker API
      return res.status(200).json({ success: true, data: deleteData.response });
    } else {
      // Handle error response from FileMaker API
      return res.status(deleteResponse.status).json({ success: false, error: deleteData.messages[0].message });
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
