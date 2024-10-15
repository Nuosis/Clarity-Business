import { config } from 'dotenv';
config({ path: '.env' });

export default async function handler(req, res) {
    // Fetch credentials from environment variables for security
    const username = process.env.CLARITYun;
    const password = process.env.CLARITYpw;
    const { database, server} = req.body;
  
    if (!database) {
      return res.status(400).json({ error: 'Database name is required' });
    }
  
    const url = `${server}/fmi/data/vLatest/databases/${database}/sessions`;
  
    try {
      // Make the request to the FileMaker API
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Send back the token in the response
        return res.status(200).json({ token: data.response.token });
      } else {
        // Return error message from FileMaker
        return res.status(response.status).json({ error: data.messages[0].message || 'Failed to retrieve token' });
      }
    } catch (error) {
      // Log the error and return a 500 status
      console.error('FileMaker token error:', error);
      return res.status(500).json({ error: 'Failed to communicate with FileMaker server: ' + error.message });
    }
  }
  