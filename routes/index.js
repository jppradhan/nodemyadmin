const express = require('express');
const router = express.Router();
const login = require('../controllers/login')
const databaseController = require('../controllers/database')
const Auth = require('../controllers/auth')

/* GET home page. */
router.post('/login', login)
router.post('/dbs', Auth, databaseController.createDatabase)
router.get('/showdbs', Auth, databaseController.getAllDatabases)
router.get('/showtables/:dbname', Auth, databaseController.getAllTables)
router.get('/table/:table', Auth, databaseController.getTable)
router.post('/table', Auth, databaseController.createTable)
router.get('/', (req, res, next) => {
    res.render('index', {
        title : 'Node my admin'
    })
});
module.exports = router
