var mysql = require('mysql');
var $conf = require('../conf/db.js');
var $sql = require('./userSqlMapping');

var pool = mysql.createPool($conf.mysql);

//向前台返回JSON方法的简单封装
var jsonWrite = function(res,ret){
	if(typeof ret === 'undefined'){
		res.json({
			status:-1,
			msg: '操作失败'
		})
	}else {
		res.json(ret);
	}
}
module.exports = {
	regist: function(req,res,next){
		pool.getConnection(function(err,connection){
			var data = req.body;
			console.log(data)
			//建立连接，向表中插入值
			connection.query($sql.insert,[data.username,data.password],function(err,result){
				if(result){
					result = {
						code: 200,
						msg: '注册成功'
					}
				}
				jsonWrite(res,result);
				connection.release();
			})
		})
	}
}