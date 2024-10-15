import formidable from 'formidable';
import fs from 'fs';
import { config } from 'dotenv';
config({ path: '.env' });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'File parsing error' });
    }

    const { server = process.env.NEXT_PUBLIC_CLARITY_URL, database, layout, recordId, fieldName } = fields;
    const appURL = process.env.NEXT_PUBLIC_APP_URL
    const file = files.file;

    if (!database || !layout || !recordId || !fieldName || !file) {
      return res.status(400).json({
        error: 'Missing required parameters: database, layout, recordId, fieldName, file',
      });
    }

    let token;

    try {
      // Get the token from the internal API route (pages/api/getFileMakerToken.js)
      const tokenResponse = await fetch(`${appURL}/api/fileMaker/getFileMakerToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          server,
          database,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(tokenData.error || 'Failed to retrieve token');
      }

      token = tokenData.token; // Store the token

      const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/records/${recordId}/containers/${fieldName}/1`;

      const fileStream = fs.createReadStream(file.filepath);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: fileStream,
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json({ success: true, data });
      } else {
        return res.status(response.status).json({ success: false, error: data.messages[0].message });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to upload to FileMaker server' });
    } finally {
      // Release the token
      if (token) {
        try {
          await fetch(`${appURL}/api/fileMaker/releaseFileMakerToken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              server,
              database,
              token,
            }),
          });
        } catch (releaseError) {
          console.error('Failed to release FileMaker token:', releaseError);
        }
      }
    }
  });
}
