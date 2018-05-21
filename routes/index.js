var router = require('express').Router();
var fs = require('fs');
var util = require('util');
var multiparty = require('multiparty');

var userDao = require('../dao/userDao.js');
/*由于传输的图片是base64编码，所以不可以用multer*/
// var multer = require('multer');
// var storage = multer.diskStorage({
// 	destination: function(req,file,cb){
// 		cb(null,'./upload');//保存路径
// 	},
// 	filename: function(req,file,cb){
// 		//将保存文件名设置为字段名+时间戳
// 		cb(null,file.originalname+'-'+Date.now());
// 	}
// })
// var upload = multer({storage:storage});
router.get('/',function(req,res){
	res.render('index')
})
router.get("/test",function(req,res){
	res.render("test")
})
router.get('/123',function(req,res){
	res.writeHead(200,{'Content-Type':'image/jpeg'})
	fs.readFile('./public/123.jpg','binary',function(err,file){
		if(err){
			throw err
		}else {
			res.write(file,'binary')
			res.end();
		}
	})
})

router.post('/uploadAvatar',function(req,res){
	var form = new multiparty.Form();
	form.parse(req,function(err,fields,files){
		console.log(files)
		var imgData = fields.file[0].replace(/^data:image\/\w+;base64,/,'');
		var dataBuffer = new Buffer(imgData,'base64');
		//写入文件
		fs.writeFile('upload/image.png',dataBuffer,function(){
			if(err){
				throw err
			}else {
				res.send({ret:0})
			}
		})
	})
})
router.post('/uploadImage',function(req,res){
    var form = new multiparty.Form();
    form.parse(req,function(err,fields,files){
		if(err){
    		res.json({
    			statusCode:err.statusCode,
    			message:err.toString()
    		})
		}else {
            var imageUrl = [],
				_files = files['file'];

			if(_files){
				_files.forEach(function(file,i){
					// 使用文件流输入输出，跨分区重命名
					var is = fs.createReadStream(file.path);
					var os = fs.createWriteStream('upload/'+file.originalFilename);
					is.pipe(os);
					imageUrl.push('upload/'+file.originalFilename)
					if(i===_files.length-1){
	                    res.json({statusCode:0,message:'ok',imageUrl:imageUrl})
					}
				})
			}
		}
    })
})
router.post('/regist',function(req,res,next){
	userDao.regist(req,res,next);
})
module.exports = router;