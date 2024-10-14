import fetch from 'node-fetch';

export async function getFileMakerToken(server, database, userName, password) {
  const url = `https://${server}/fmi/data/vLatest/databases/${database}/sessions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(userName + ':' + password).toString('base64'),
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Return the token to the calling function
      return data.response.token;
    } else {
      // Return an error message to the calling function
      throw new Error(data.messages[0].message || 'Failed to retrieve token');
    }
  } catch (error) {
    // Throw error to be handled by the API route
    throw new Error('Failed to communicate with FileMaker server: ' + error.message);
  }
}

export async function releaseFileMakerToken(server, database, token) {
  const url = `https://${server}/fmi/data/vLatest/databases/${database}/sessions/${token}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (response.ok) {
      return { success: true, message: 'Token released successfully' };
    } else {
      const data = await response.json();
      throw new Error(data.messages[0].message || 'Failed to release token');
    }
  } catch (error) {
    throw new Error('Failed to release the token: ' + error.message);
  }
}
