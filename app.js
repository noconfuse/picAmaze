var express = require('express');
var app = express();
var path  = require('path');

//指定静态资源访问目录
app.use(express.static(path.join(__dirname,'public')));
app.set('views',(__dirname + "/public"));
app.set('view engine','html');
app.get('/',function(){
	res.render('index')
})
var server = app.listen(3000,"localhost",function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("server running at http://%s:%s",host,port)
})