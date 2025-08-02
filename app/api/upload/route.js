import { NextResponse } from 'next/server';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: './public/uploads/' });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});


apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  res.status(200).json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
