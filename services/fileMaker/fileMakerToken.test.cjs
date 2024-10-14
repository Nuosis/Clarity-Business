// tests/fileMakerToken.test.js
const { getFileMakerToken } = require('./fileMakerToken');

describe('FileMaker Token API', () => {
  const server = process.env.NEXT_PUBLIC_CLARITY_URL;
  const database = 'clarityData';
  const userName = process.env.CLARITYun;
  const password = process.env.CLARITYpw;

  it('should successfully retrieve a token from FileMaker', async () => {
    const token = await getFileMakerToken(server, database, userName, password);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should throw an error if credentials are incorrect', async () => {
    const incorrectPassword = 'wrongPassword';
    await expect(
      getFileMakerToken(server, database, userName, incorrectPassword)
    ).rejects.toThrow('Failed to retrieve token');
  });
});
