import { config } from 'dotenv';
config({ path: '.env' });

export default async function handler(req, res) {
  const { server = process.env.NEXT_PUBLIC_CLARITY_URL, database, layout, fieldData } = req.body;
  const appURL = process.env.NEXT_PUBLIC_APP_URL

  // Ensure all required parameters are present
  if (!database || !layout || !fieldData) {
    return res.status(400).json({
      error: 'Missing required parameters: database, layout, fieldData',
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

    // Construct the URL for creating a new record
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/records`;
    console.log('FileMaker create URL:', url);

    // Make the POST request to FileMaker API to create the new record
    const recordResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        fieldData: fieldData,  // Pass the field data that you want to create
      }),
    });

    const recordData = await recordResponse.json();

    if (recordResponse.ok) {
      // Return successful response from FileMaker API
      return res.status(200).json({ success: true, data: recordData.response });
    } else {
      // Handle error response from FileMaker API
      return res.status(recordResponse.status).json({ success: false, error: recordData.messages[0].message });
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
