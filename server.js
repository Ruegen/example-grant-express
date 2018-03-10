require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Grant = require('grant-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const axios = require('axios')

const server = express()
const userRoutes = require('./users/usersRoutes.js')

const grantConfig = {
    "server": {
        "protocol": "http",
        "host": "localhost:3000",
        "callback": "/callback",
        "transport": "session",
        "state": true,
    },
    "github": {
        "key": process.env.GITHUB_KEY,
        "secret": process.env.GITHUB_SECRET,
        "scope": "read:user",
        "callback": "/github/callback"
    }
}
const grant = new Grant(grantConfig)

server.use(cors())
server.use(bodyParser.json())
server.use(session({
    name: 'grant',
    secret: 'very secret',
    saveUninitialized: false,
    resave: false
}))
server.use(grant)


server.use('/', userRoutes)
server.get('/github/callback', (req, res) => {

    if(req.query.error) {
        res.json({error: req.query.error})
    }

    const { access_token } = req.session.grant.response

    axios.get(`https://api.github.com/user?access_token=${access_token}`)
    .then(response => {
        console.log(response)
        return response.data
    })
    .then(data =>
        res.json(data)
    )
    .catch(err => res.status(400).json({err: err}))
    
})



server.use('/', (req, res) => {
    res.json({hello: 'world'})
})
server.listen(3000, () => {
    console.log('server running on port 3000')
})

module.exports = server