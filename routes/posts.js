const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/stam', verify, (req,res) => {
    res.json({
        reponse: {stam: 'stam response, token validation'}
    })
});

module.exports = router;