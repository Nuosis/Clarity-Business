import { test, expect } from 'vitest';

const server = 'https://server.claritybusinesssolutions.ca'
const database = 'clarityData'
const recordId = 1

test('should update a record in FileMaker', async () => {
  const response = await fetch('http://localhost:3000/api/fileMaker/updateFileMakerData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      server,
      database,  // Set your database name
      layout: 'dapiTest',       // Use the test layout you created earlier
      recordId,
      fieldData: {
        label: 'Test3',     // Example field data
      }
    }),
  });

  const data = await response.json();

  // Log the response for debugging
  console.log('Update Record Response:', data);

  // Expect that the request was successful
  expect(response.status).toBe(200);
  expect(data.success).toBe(true);
});
