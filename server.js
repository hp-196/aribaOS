const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(process.env.DB_URL, 
    function(err, client) {
        
        db = client.db('aribaOS');
        
    
        app.listen(process.env.PORT, function() {
            console.log('server open');
        });
    }) //db접속 완료하면 서버 접속


app.get('/', function(req, res) {
    res.render('startPage.ejs');
})
app.get('/hello', function(req, res) {
    res.render('hello.ejs');
})

//한식 양식 일식 중식 메뉴
app.get('/korea', function(req, res) {
    res.render('korea.ejs');
})
app.get('/us', function(req, res) {
    res.render('us.ejs');
})
app.get('/japan', function(req, res) {
    res.render('japan.ejs');
})
app.get('/china', function(req, res) {
    res.render('china.ejs');
})
//한식 양식 일식 중식 메뉴

app.get('/bossPage', function(req, res) {
    db.collection('menu').find().toArray(function(err, result) {
        res.render('bossPage.ejs', {menus : result})
    })
})
app.get('/addMenu', function(req, res) {
    res.render('addMenu.ejs');
})

app.post('/add', function(req, res) {
    //var total = {메뉴 : req.body.name, 카테고리: req.body.info, 가격 : req.body.price};
    //db.collection('menu').insertOne(total, function(){
        //res.redirect('/bossPage');

    //});
    console.log(req.body.form.q);
})
