const express = require('express')
const router = express.Router()

router.get('/users/:id',(req, res) => {
    res.json({first_name: 'Ruegen'})
})

router.get('/users', (req, res) => {
    res.json([
        {first_name: 'Ruegen'}
    ])
})

module.exports = router