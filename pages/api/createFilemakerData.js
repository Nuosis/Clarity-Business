export default async function handler(req, res) {
    const { server, database, layout, token, fieldData } = req.body;
  
    // Ensure all required parameters are present
    if (!server || !database || !layout || !token || !fieldData) {
      return res.status(400).json({
        error: 'Missing required parameters: server, database, layout, token, fieldData',
      });
    }
  
    // Construct the URL for creating a new record
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/records`;
  
    try {
      // Make the POST request to FileMaker API to create the new record
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          fieldData: fieldData,  // Pass the field data that you want to create
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
      // Catch any error during the request process
      return res.status(500).json({ success: false, error: 'Failed to communicate with FileMaker server' });
    }
  }
  