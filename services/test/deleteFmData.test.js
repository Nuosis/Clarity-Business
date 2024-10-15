import { test, expect } from 'vitest';

const server = 'https://server.claritybusinesssolutions.ca'
const database = 'clarityData'
const recordId = 2

test('should update a record in FileMaker', async () => {
  const response = await fetch('http://localhost:3000/api/fileMaker/deleteFileMakerData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      server,
      database,  
      layout: 'dapiTest', 
      recordId
    }),
  });

  const data = await response.json();

  // Log the response for debugging
  console.log('Update Record Response:', data);

  // Expect that the request was successful
  expect(response.status).toBe(200);
  expect(data.success).toBe(true);
});
