var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path  = require('path');

// var mysql = require('mysql');
// var connection = mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'root',
// 	database:'testdb'
// });
// connection.connect();
// connection.query('select * from solution',function(err,rows,fields){
// 	if(err){
// 		throw err
// 	}
// 	console.log('The solution is:',rows);
// })
// connection.end();
// var poll = mysql.createPoll({//引入连接池，免去手动关闭connection
// 	host:'localhost',
// 	user:'root',
// 	password:'root',
// 	database: 'testdb'
// });

//指定静态资源访问目录
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'lib')));
app.use(express.static(path.join(__dirname,'upload')));
app.use(bodyParser.urlencoded({extended:false}));
app.set('views',(__dirname + "/public"));

app.engine('html',require('ejs').__express)
app.set('view engine','html');

app.use('/',require('./routes'))

var server = app.listen(3000,"localhost",function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("server running at http://%s:%s",host,port)
})