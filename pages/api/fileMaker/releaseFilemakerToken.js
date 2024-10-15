export default async function handler(req, res) {
  
    // Extract token from the request body (or URL params if needed)
    const { token, database, server } = req.body;
    //console.log('release Props:', { server, database, token });
  
    if (!token) {
      return res.status(400).json({ error: 'Missing required parameter: token' });
    }
  
    const url = `${server}/fmi/data/vLatest/databases/${database}/sessions/${token}`;
    //console.log('FileMaker API URL:', url);
  
    try {
      // Make the DELETE request to FileMaker API
      const response = await fetch(url, {
        method: 'DELETE',      
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Send back a success message
        return res.status(200).json({ success: true, message: 'Token released successfully' });
      } else {
        const data = await response.json();
        return res.status(response.status).json({ error: data.messages[0].message || 'Failed to release token' });
      }
    } catch (error) {
      // Catch any errors during the process
      return res.status(500).json({ error: 'Failed to release the token: ' + error.message });
    }
  }
  