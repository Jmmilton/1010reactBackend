import express, { request, response } from 'express';
import router from "./src/routes.js"
import * as db from './src/db'
require('dotenv').config()
const cors = require("cors")
const bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken")

const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors());
app.use(router)



const users = [] 

app.get('/auth', (req, res) => {
    res.json(users)
})

app.post('/auth', async (req, res) => {
    let userSubmit = { ...req.body }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.username, password: hashedPassword }
        let userHashedPassword = user.password

        if (!req.body.username) {
            return res.status(400).send("Error, no username")
        } else if (!req.body.password) {
            return res.status(400).send("Error, no password")
        } else if (!req.body.username && !req.body.password) {
            return res.status(400).send("Error, no username or password")
        } else {
            users.push(user)
            console.log(userHashedPassword) // send that to DB not actuall pass
            // console.log(userSubmit)
            return res.status(201).send(userSubmit).json(await db.createUser(userSubmit))
            // res.status(201).send()
        }
    } catch {
        res.status(500).send()
    }
})


app.post('/posts', verifyToken, async (req, res) => {
    const entries = await db.getAllEntries()
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json(entries)
        }
    })
})

app.post('/login', (req, res) => {
    let newUser = {
        name: req.body.username,
        password: req.body.password,
    }
  
    jwt.sign({newUser}, 'secretkey', { expiresIn: /*'3000s'*/ '30s' }, (err, token) => {
        res.status(201).json({
            newUser,
            token: token
      });
    });
  });

  
  // Verify Token
  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  
  }


// app.post('/auth', (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

//     if (username == "test" && password == "password") {
//         const token = jwtGenerator.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'})
//         return res.send({token})
//     }
//     return res.status(401).send({error: "incorrect username\password"})
// })

// app.use("/contact_form/entries", missingPropsError)

app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))