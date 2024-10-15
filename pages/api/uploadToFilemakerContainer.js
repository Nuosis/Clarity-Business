import fs from 'fs';
import formidable from 'formidable';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disabling body parsing for multipart form data
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST' });
  }

  // Parsing the multipart/form-data to extract the file and other fields
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'File parsing error' });
    }

    const { server, database, layout, recordID, fieldName, token } = fields;
    const file = files.file; // Assuming the uploaded file is named 'file'

    // Validate required fields
    if (!server || !database || !layout || !recordID || !fieldName || !token || !file) {
      return res.status(400).json({
        error: 'Missing required parameters: server, database, layout, recordID, fieldName, token, file',
      });
    }

    // Construct the URL for uploading to the container field
    const url = `${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/records/${recordID}/containers/${fieldName}/1`;

    try {
      const fileStream = fs.createReadStream(file.filepath);

      // Send the file upload request to the FileMaker API
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
    }
  });
}
