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
    db.collection('menu').find().toArray(function(err, result) {
        res.render('korea.ejs', {menu : result});
   })
})
app.get('/us', function(req, res) {
    db.collection('menu').find().toArray(function(err, result) {
        res.render('us.ejs', {menu : result});
    })
})
app.get('/japan', function(req, res) {
    db.collection('menu').find().toArray(function(err, result) {
        res.render('japan.ejs', {menu : result});
    })
})
app.get('/china', function(req, res) {
    db.collection('menu').find().toArray(function(err, result) {
        res.render('china.ejs', {menu : result});
    })
})
//한식 양식 일식 중식 메뉴

app.get('/bossPage', function(req, res) {
    db.collection('menu').find().toArray(function(err, result) {
        res.render('bossPage.ejs', {menus : result})
        console.log(result);
    })
})
app.get('/addMenu', function(req, res) {
    res.render('addMenu.ejs');
})

app.post('/add', function(req, res) {
    db.collection('menuCount').findOne({ count : '메뉴개수'}, function(err, result1) {
        console.log(result1);
    var sum = result1.num;
    var total = {_id : sum+1, 메뉴 : req.body.name, 카테고리 : req.body.type, 가격 : req.body.price};
        db.collection('menu').insertOne(total, function(err, result2){
            db.collection('menuCount').updateOne( { count :'메뉴개수'}, { $inc : { num:1 } }, function(err, result) {
                res.redirect('/bossPage');
            })
        });
    })
}) 

app.delete('/delete', function(req, res) {
    console.log(req.body._id);
   id = parseInt(req.body._id);
   var del = { _id : id };
   console.log(del);
   db.collection('menu').deleteOne( del , function(err, result) {
    console.log('삭제완료');
    res.status(200).send('sex');
   } )
})
