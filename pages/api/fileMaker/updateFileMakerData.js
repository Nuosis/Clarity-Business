import { config } from 'dotenv';
config({ path: '.env' });

export default async function handler(req, res) {
  const { server = process.env.NEXT_PUBLIC_CLARITY_URL, database, layout, recordId, fieldData } = req.body;
  const appURL = process.env.NEXT_PUBLIC_APP_URL
  
  // Ensure all required parameters are present
  if (!database || !layout || !recordId || !fieldData) {
    return res.status(400).json({
      error: 'Missing required parameters: database, layout, recordId, fieldData',
    });
  }

  let token;

  try {
    // Get the token from the internal API route (pages/api/getFileMakerToken.js)
    const tokenResponse = await fetch(`${appURL}/api/fileMaker/getFileMakerToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server,
        database,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error || 'Failed to retrieve token');
    }

    token = tokenData.token; // Store the token from the response

    // Construct the URL for updating the record
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/records/${recordId}`;

    // Make the PATCH request to FileMaker API to update the record
    const response = await fetch(url, {
      method: 'PATCH', // Method for updating records in FileMaker
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        fieldData: fieldData, // Include the data to update
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Return successful response from FileMaker API
      return res.status(200).json({ success: true, data: data.response });
    } else {
      // Handle error response from FileMaker API
      return res.status(response.status).json({ success: false, error: data.messages[0].message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to communicate with FileMaker server: ' + error.message });
  } finally {
    // Ensure the token is released even if an error occurs
    if (token) {
      try {
        // Call the API route to release the token (pages/api/releaseFileMakerToken.js)
        await fetch(`${appURL}/api/fileMaker/releaseFileMakerToken`, {
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
