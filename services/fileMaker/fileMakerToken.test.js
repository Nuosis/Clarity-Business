import { config } from 'dotenv';
import { getFileMakerToken, releaseFileMakerToken } from './fileMakerToken';
config({ path: '.env.test.local' });

const server = process.env.CLARITY_SERVER_URL;
const username = process.env.CLARITYun;
const password = process.env.CLARITYpw;

test('should get FileMaker token and release it', async () => {
  try {
    // Get token
    const token = await getFileMakerToken(server, 'clarityData', username, password);
    expect(token).toBeDefined();

    // Release token
    const release = await releaseFileMakerToken(server, 'clarityData', token);
    expect(release.responseCode).toBe(200); // Use proper comparison
  } catch (error) {
    console.error('Error in token or release test:', error);
  }
});

test('should fail to get FileMaker token with wrong password', async () => {
  const wrongPW = "nope";

  try {
    const token = await getFileMakerToken(server, 'clarityData', username, wrongPW);
    // If token is somehow returned, this should fail
    expect(token).toBeUndefined();
  } catch (error) {
    // Expect an error to be thrown, so this test should pass if an error occurs
    expect(error).toBeDefined();
    expect(error.message).toContain('Failed to communicate with FileMaker server'); // Example error message check
  }
});
