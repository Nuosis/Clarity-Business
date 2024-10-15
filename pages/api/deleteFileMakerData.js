export default async function handler(req, res) {
    const { server, database, layout, token, recordId } = req.body;
  
    // Ensure all required parameters are present
    if (!server || !database || !layout || !token || !recordId) {
      return res.status(400).json({
        error: 'Missing required parameters: server, database, layout, token, recordId',
      });
    }
  
    // Construct the URL for deleting the record
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/records/${recordId}`;
  
    try {
      // Make the DELETE request to FileMaker API to delete the record
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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
  