import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { app } from '../index';
import http from 'http';

const binaryParser = (res: any, callback: (err: Error | null, body: Buffer) => void) => {
  res.setEncoding('binary');
  let data = '';
  res.on('data', (chunk: any) => {
    data += chunk;
  });
  res.on('end', () => {
    callback(null, Buffer.from(data, 'binary'));
  });
};

describe('PDF Upload/Download', () => {
  const uploadDir = path.join(__dirname, '../uploads');
  const tempDir = path.join(__dirname, '../temp');
  let server: http.Server;

  beforeAll((done) => {
    server = app.listen(done);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll((done) => {
    fs.rmSync(uploadDir, { recursive: true, force: true });
    fs.rmSync(tempDir, { recursive: true, force: true });
    server.close(done);
  });

  it('should upload a valid PDF, then be able to download it', async () => {
    const testPdfPath = path.join(__dirname, 'test.pdf');
    const uploadRes = await request(server)
      .post('/upload')
      .attach('pdf', testPdfPath);

    expect(uploadRes.statusCode).toBe(200);
    expect(uploadRes.body.message).toContain('File uploaded');

    const files = fs.readdirSync(uploadDir);
    const filename = files[0];
    const downloadedFilePath = path.join(tempDir, filename);

    const downloadRes = await request(server)
      .get(`/download/${filename}`)
      .parse(binaryParser);

    expect(downloadRes.statusCode).toBe(200);

    fs.writeFileSync(downloadedFilePath, downloadRes.body);

    const originalFile = fs.readFileSync(testPdfPath);
    const downloadedFile = fs.readFileSync(downloadedFilePath);
    expect(originalFile).toEqual(downloadedFile);
  });

  it('should not upload an invalid file type', async () => {
    const testJpgPath = path.join(__dirname, 'test.jpg');
    const res = await request(server)
      .post('/upload')
      .attach('pdf', testJpgPath);
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('No file uploaded.');
  });

  it('should return 404 for a non-existing PDF file', async () => {
    const res = await request(server).get('/download/nonexistent.pdf');
    expect(res.statusCode).toBe(404);
  });
});
