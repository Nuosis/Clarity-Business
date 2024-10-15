export default async function handler(req, res) {
    const { server, database, layout, query, token } = req.body;
  
    if (!layout || !query || !token|| !server|| !database) {
      return res.status(400).json({ error: 'Missing required parameters: server, database, layout, query, token' });
    }
  
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/_find`;
  
    try {
      // Make the POST request to FileMaker API
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: query,  // Pass the query array
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Return successful response from FileMaker API
        return res.status(200).json({ success: true, data: data.response.data });
      } else {
        // Handle error response from FileMaker API
        return res.status(response.status).json({ success: false, error: data.messages[0].message });
      }
    } catch (error) {
      // Catch any error during the request process
      return res.status(500).json({ success: false, error: 'Failed to communicate with FileMaker server' });
    }
  }
  