const express = require('express');
const router = express.Router();
const login = require('../controllers/login')
const database = require('../controllers/database')
const Auth = require('../controllers/auth')

/* GET home page. */
router.post('/login', login);
router.get('/showdbs', Auth, database.getAllDatabases);
router.get('/showtables/:dbname', Auth, database.getAllTables);
router.get('/', (req, res, next) => {
    res.render('index', {
        title : 'Node my admin'
    })
});
module.exports = router;
