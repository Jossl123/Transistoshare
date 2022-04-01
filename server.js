const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//var db = require('better-sqlite3')('Transistoshare.db')
const crypto = require("crypto")

async function hash(password) {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}
async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}
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


app.post('/api/register', (req, res) => {
    r = req.body
    if (r.username.length < 3) return res.json({ success: false, error: "username invalid" })
    if (r.email.length < 3 || !r.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return res.json({ success: false, error: "email invalid" })
    if (r.password.length < 3) return res.json({ success: false, error: "password invalid" })
    try {
        var user = db.prepare('SELECT * FROM Users WHERE username = ?').get(r.username)
        var email = db.prepare('SELECT * FROM Users WHERE email = ?').get(r.email)
    } catch (error) {
        return res.json({
            success: false,
            error: error
        })
    }
    if (user != undefined) { //si il n'y a pas d'utilisateur avec ce nom ni ce mail
        return res.json({
            success: false,
            error: "username used"
        })
    }
    if (email != undefined) { //si il n'y a pas d'utilisateur avec ce nom ni ce mail
        return res.json({
            success: false,
            error: "email used"
        })
    }
    try {
        db.prepare('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)').run(r.username, r.email, r.password)
        return res.json({
            success: true
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error
        })
    }
})

app.post('/api/login', (req, res) => {
    r = req.body
    try {
        var row = db.prepare('SELECT * FROM Users WHERE username = ?').get(r.username)
    } catch (e) {
        console.log(e)
    }
    if (row.password == r.password) return res.redirect('/')
    else return res.redirect('/login')
})
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));