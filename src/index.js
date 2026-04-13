const express = require('express');
const app = express();

// Це ПЕРШИЙ маршрут, який побачить користувач
app.get('/', (req, res) => {
    res.send('<h1>This site is working!</h1><p>Lab 6 is deployed.</p>');
});

// Додатковий маршрут для перевірки
app.get('/status', (req, res) => {
    res.json({ status: 'online' });
});

// Експорт обов'язковий для Vercel
module.exports = app;

// Локальний запуск (не впливає на Vercel)
if (require.main === module) {
    app.listen(3000, () => console.log('Server started on port 3000'));
}