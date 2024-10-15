import { describe, test, expect } from 'vitest';

const server = 'https://server.claritybusinesssolutions.ca'
const database= 'clarityData'

describe('FileMaker Token API Tests', () => {
  let token;

  // Test case for getting a token
  test('should get a FileMaker token', async () => {
    const response = await fetch('http://localhost:3000/api/fileMaker/getFileMakerToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server,
        database,
      }),
    });

    const data = await response.json();
    token = data.token; // Store the token for use in the release test

    // Test that the token is returned and defined
    expect(response.ok).toBe(true);
    expect(token).toBeDefined();
  });

  // Test case for releasing a token
  test('should release the FileMaker token', async () => {
    if (!token) {
      throw new Error('No token to release');
    }

    const response = await fetch('http://localhost:3000/api/fileMaker/releaseFileMakerToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server,
        database,
        token: token,
      }),
    });

    const data = await response.json();

    // Test that the token was successfully released
    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
  });
});
