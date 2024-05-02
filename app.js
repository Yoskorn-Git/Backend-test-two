const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();
var path = require('path');

// Middleware Check if file is NULL
const checkFileUpload = (req, res, next) => {
    if (!req.file) {
        return res.status(422).json({ error: 'Please select a file' });
    }
    next();
};

app.use(upload.single('file'))
app.use(checkFileUpload)

app.post('/', (req, res) => {
    // console.log(req.file);
    const fileName = req.file.originalname;
    const size = `${req.file.size / Math.pow(1024,2)} MB`;
    const extension = path.extname(fileName).substr(1)

    res.json({ fileName, size, extension });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});