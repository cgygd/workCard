var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var gm = require('gm');
var spawn = require('child_process').spawn;
var imgFolder = '../public/upload/';

function combineImg(src, filename, cb){
    src="C:\\Users\\user\\AppData\\Local\\Temp\\7956-tdh8jm.jpg";
    filename = 'dest.jpg';
    var crop = spawn('convert', [
        '-density',
        '300x300', //定义DPI
        '-resize',
        '680x1032', //放大后尺寸
        '-crop',
        '548x870+124+0', //截图坐标
        '-quality',
        '100', //定义输出质量
        '+profile',
        '*', //去除EXT信息
        src,
        imgFolder+filename
    ]);

    crop.on('exit',function(code) {
        if (code != 0) {
            console.log('gm crop process exited with code ' + code);
        } else {
            console.log('ok');
            var imgSrc = '/upload/'+filename;
            if (cb) cb(imgSrc);
        }
    });
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/**
 * save or edit pic
 */
router.post('/api/upload', multipartMiddleware, function(req, res, next) {
    console.log(req.body, req.files[0]);
    var resMsg = {
        stauts: "ok",
        msg: "上传成功",
        data: ""
    };
    var zhname = req.body.zhname;
    var enname = req.body.enname;
    var department = req.body.department;
    var files = req.files;
    if (!zhname || !enname || !department || !files){
        resMsg.stauts = "error";
        resMsg.msg = "上传信息不全！";
        return res.json(resMsg);
    }

    return combineImg2();

    for(var filename in files){
        var file = files[filename]
        return combineImg(file.path, filename, function(src){
            resMsg.data = src;
            return res.json(resMsg);
        })
    }

});

module.exports = router;