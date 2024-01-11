const express = require('express');
const router = express.Router();
const path = require('path');

router.get("^/$|index|shop(.html)?", (req, res) => {
    res.render('shop')
});

module.exports = router;
