const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());

// 1. ІНІЦІАЛІЗАЦІЯ БД (Middleware має бути першим)
let dbInitialized = false;
app.use(async (req, res, next) => {
    if (!dbInitialized) {
        try {
            await db.init();
            dbInitialized = true;
        } catch (err) {
            console.error('DB Init Error:', err);
        }
    }
    next();
});

// 2. МАРШРУТИ
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Lab 6 Success</title></head>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px; background-color: #f4f7f6;">
                <h1 style="color: #0070f3;">✅ Site is working!</h1>
                <p style="font-size: 1.2em;">Lab 5 & Lab 6 successfully deployed.</p>
                <p><strong>Student:</strong> Pukhalskyi Vladyslav</p>
                <a href="/items" style="color: #0070f3; font-weight: bold;">➡️ View API Items</a>
            </body>
        </html>
    `);
});

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// 3. ЕКСПОРТ ДЛЯ VERCEL
module.exports = app;

if (require.main === module) {
    db.init().then(() => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    });
}