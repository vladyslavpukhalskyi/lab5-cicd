const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

// ГОЛОВНА СТОРІНКА (для перевірки працездатності)
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Lab 6 Success</title></head>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px; background-color: #f4f7f6;">
                <h1 style="color: #0070f3;">✅ Site is working!</h1>
                <p style="font-size: 1.2em;">Lab 5 (CI/CD) & Lab 6 (Terraform) are successfully deployed.</p>
                <p><strong>Student:</strong> Pukhalskyi Vladyslav</p>
                <div style="margin-top: 20px;">
                    <a href="/items" style="color: #0070f3; text-decoration: none; font-weight: bold;">➡️ View API Items</a>
                </div>
                <hr style="width: 200px; margin: 40px auto;">
                <p style="font-size: 0.8em; color: gray;">Status: Online | DB: SQLite (In-Memory on Vercel)</p>
            </body>
        </html>
    `);
});

// МАРШРУТИ API
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// ІНІЦІАЛІЗАЦІЯ БАЗИ ДАНИХ ДЛЯ VERCEL (SERVERLESS MODE)
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

// ЛОКАЛЬНИЙ ЗАПУСК
if (require.main === module) {
    db.init().then(() => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

// ЕКСПОРТ ДЛЯ VERCEL
module.exports = app;