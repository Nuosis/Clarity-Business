import { test, expect } from 'vitest';

const server = 'https://server.claritybusinesssolutions.ca'
const database = 'clarityData'

test('should find a record in FileMaker', async () => {
  const response = await fetch('http://localhost:3000/api/fileMaker/getFileMakerData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      server,
      database,  // Set your database name
      layout: 'dapiTest',       // Use the test layout you created earlier
      query: [{
        label: 'Test3',     // Example field data
      }]
    }),
  });

  const data = await response.json();

  // Log the response for debugging
  console.log('Find Record Response:', data);

  // Expect that the request was successful
  expect(response.status).toBe(200);
  expect(data.success).toBe(true);
});
