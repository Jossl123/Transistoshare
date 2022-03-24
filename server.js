const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var db = require('better-sqlite3')('Transistoshare.db')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
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
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});
app.post('/register', (req, res) => {
    r = req.body
    try {
        db.prepare('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)').run(r.username, r.email, r.password)
    } catch (e) {
        res.sendFile(__dirname + '/views/register.html');
    }
    //if (r.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    res.sendFile(__dirname + '/views/login.html');
})
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));