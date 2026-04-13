const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

// ГОЛОВНА СТОРІНКА (Додаємо для перевірки)
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1 style="color: #0070f3;">✅ Site is working!</h1>
                <p>Lab 5 & 6 are successfully deployed by Pukhalskyi Vlad.</p>
                <a href="/items">View Items API</a>
            </body>
        </html>
    `);
});

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// ЛОГІКА ЗАПУСКУ
// На Vercel ми не викликаємо app.listen, але нам потрібно ініціалізувати БД
let isDbInitialized = false;
const initDb = async () => {
    if (!isDbInitialized) {
        await db.init();
        isDbInitialized = true;
    }
};

// Middleware для гарантованої ініціалізації БД перед запитами
app.use(async (req, res, next) => {
    try {
        await initDb();
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send('Database initialization failed');
    }
});

// Для локальної розробки
if (require.main === module) {
    db.init().then(() => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

// Експорт для Vercel
module.exports = app;