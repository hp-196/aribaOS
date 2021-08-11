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

let multer = require('multer');

var storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './public/image')
    },
    filename : function(req, file, cb) {
        let newFileName = new Date().valueOf() + path.extname(file.originalname)
        cb(null, newFileName);  
    }
});
var path = require('path');
var upload = multer({
    storage : storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('이미지만 업로드하세요'))
        }
        callback(null, true)
    }
})

app.get('/addMenu', function(req, res) {
    res.render('addMenu.ejs');
})

app.post('/add', upload.single('menuName'), function(req, res) {
    db.collection('menuCount').findOne({ count : '메뉴개수'}, function(err, result1) {
    var sum = result1.num;
    var total = {_id : sum+1, 메뉴 : req.body.name, 카테고리 : req.body.type, 가격 : req.body.price, 메뉴사진 : req.file.path};
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
