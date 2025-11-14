import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const app = express();

app.disable('x-powered-by');

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

app.use(express.static('public'));

app.post('/upload', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ message: 'File uploaded', filename: req.file.filename });
});

app.get('/download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const filePath = path.join(uploadsDir, filename);
  
  const normalizedPath = path.normalize(filePath);
  if (!normalizedPath.startsWith(uploadsDir)) {
    return res.status(400).send('Invalid file path');
  }
  
  const fileStream = fs.createReadStream(filePath);
  fileStream.on('error', () => {
    res.status(404).send('File not found');
  });
  fileStream.pipe(res);
});
