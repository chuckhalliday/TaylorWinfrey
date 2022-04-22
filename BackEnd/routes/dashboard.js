const router = require('express').Router();
const pool = require('../queries');
const authorization = require('../middleware/authorization')


router.get('/', authorization, async (req, res) => {
    try {
        const user = await pool.query('SELECT username FROM users WHERE id = $1', [req.user])
        res.json(req.user)
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
})

module.exports = router;