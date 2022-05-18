const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var db = require('better-sqlite3')('Transistoshare.db')
const crypto = require("crypto")

function hash(password) {
    return new Promise(async(resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

function verify(password, hash) {
    return new Promise(async(resolve, reject) => {
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
app.post('/api/register', async(req, res) => {
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
    //vérifie qu'il n'y ait pas déjâ un utilisateur avec ce nom ou cet email
    if (user != undefined) {
        return res.json({
            success: false,
            error: "username used"
        })
    }
    if (email != undefined) {
        return res.json({
            success: false,
            error: "email used"
        })
    }
    //
    try {
        db.prepare('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)').run(r.username, r.email, await hash(r.password))
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

function generateToken() {
    return crypto.randomBytes(32).toString('hex')
}
app.post('/api/login', async(req, res) => {
    var r = req.body
    try {
        var row = db.prepare('SELECT * FROM Users WHERE username = ?').get(r.username)
    } catch (e) {
        console.log(e)
    }
    if (row == undefined) return res.json({
        success: false,
        error: "user not found"
    })
    if (await verify(r.password, row.password)) {
        token = generateToken();
        try {
            var row = db.prepare(`UPDATE Users SET token = ? WHERE username = ?`).run(token, r.username)
        } catch (e) {
            console.log(e)
        }
        return res.json({
            success: true,
            data: { token: token }
        })
    } else return res.json({
        success: false,
        error: "wrong password"
    })
})

app.post('/api/logout', (req, res) => {
    var token = req.body.token
    try {
        var row = db.prepare('UPDATE Users SET token = NULL WHERE token = ?').run(token)
    } catch (e) {
        console.log(e)
    }
    return res.json({
        success: true,
        error: "loged out"
    })
})

app.post('/api/getUser', (req, res) => {
    var token = req.body.token
    try {
        var row = db.prepare('SELECT * FROM Users WHERE token = ?').get(token)
    } catch (e) {
        console.log(e)
    }
    if (row == undefined) {
        return res.json({
            success: false,
            error: "wrong token"
        })
    } else {
        return res.json({
            success: true,
            data: row
        })
    }
})
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));