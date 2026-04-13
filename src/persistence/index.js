const express = require('express');
const app = express();
const db = require('./persistence'); // твій файл з перемикачем баз

app.use(express.json());

// ДОДАЙ ЦЕЙ БЛОК:
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Lab 6 Success</title></head>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1 style="color: #0070f3;">✅ Site is working!</h1>
                <p>Lab 5 (CI/CD) & Lab 6 (Terraform) are successfully deployed.</p>
                <p><strong>Student:</strong> Pukhalskyi Vladyslav</p>
                <hr style="width: 200px;">
                <p style="font-size: 0.8em; color: gray;">Deployed via Vercel & GitHub Actions</p>
            </body>
        </html>
    `);
});

// Інші твої маршрути (якщо вони є)
// app.get('/items', ...);

const port = process.env.PORT || 3000;

// Це важливо для Vercel (він сам керує запуском, але локально працюватиме так)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;