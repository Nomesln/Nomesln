const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, 'bookings.json');

// Говорим серверу понимать данные из форм и отдавать файлы сайта из папки public
app.use(express.json());
app.use(express.static('public'));

// Функция для чтения нашей мини-базы данных
const getBookings = () => {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify([])); // Создаем файл базы, если его еще нет
    }
    return JSON.parse(fs.readFileSync(dataFile));
};

// ПРИЕМ ЗАЯВОК: Когда сайт отправляет форму, сервер ловит её здесь
app.post('/api/book', (req, res) => {
    const bookings = getBookings();
    
    const newBooking = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...req.body
    };

    bookings.push(newBooking);
    fs.writeFileSync(dataFile, JSON.stringify(bookings, null, 2)); // Сохраняем в файл
    
    res.json({ success: true, message: 'Заявка сохранена!' });
});

// ОТДАЧА ЗАЯВОК: Когда админка просит показать список, сервер отдает его
app.get('/api/bookings', (req, res) => {
    res.json(getBookings());
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`🚀 Сервер успешно запущен!`);
    console.log(`Ваш сайт доступен по адресу: http://localhost:${PORT}`);
    console.log(`Ваша админка доступна по адресу: http://localhost:${PORT}/admin.html`);
});