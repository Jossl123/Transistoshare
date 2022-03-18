const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/computer', (req, res) => {
    res.sendFile(__dirname + '/views/computer.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));