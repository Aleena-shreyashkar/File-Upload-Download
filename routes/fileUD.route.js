const express = require('express');
const router = express.Router();
const { fileUpload, fileDownload, getAllUploads } = require('../controller/fileUD.controller.js');

// for uploading files
router.post('/upload',fileUpload);

// for downloading files
router.get('/download',fileDownload);

// for fetching all uploads
router.get('/uploads',getAllUploads);

module.exports = router;