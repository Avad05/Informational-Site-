const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

// Logger middleware
app.use((req, res, next) => {
    const now = new Date();
    const log = `${now}, "${req.url}" requested the page\n`;

    fs.appendFile('log.txt', log, (err) => {
        if (err) console.log(err);
    });

    next();
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact-me.html'));
});

// 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.log('Server Started');
});
