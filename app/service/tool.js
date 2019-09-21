const {
    Service
} = require('egg');
var svgCaptcha = require('svg-captcha');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp')
const dateFormat = require('dateformat');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const Jimp = require('jimp');

class toolService extends Service {

    async captcha(width, height, fontSize) {

        let w = width ? width : 100;
        let h = height ? height : 40;
        let f = fontSize ? fontSize : 40
        var captcha = svgCaptcha.create({
            size: 4,
            width: w,
            height: h,
            fontSize: f
        });
        return captcha;
    }
    //后台，固定加盐
    async md5(content) {
        return md5(content + '123');
    }
    async md5Sign(content) {
        return md5(content);
    }
    //前台，动态加盐
    async md5Secret(content, secret) {
        return md5(content + secret);
    }

    async randomNumber() {
        return Math.floor(Math.random() * 9000 + 1000);
    }
    //上传文件 重命名&return目标路径
    async filePath(fileName) {
        let upLoadBaseDir = this.app.config.upLoadBaseDir;
        let dateDir = dateFormat(new Date(), 'yyyymmdd');
        let baseDir = path.join(upLoadBaseDir, dateDir);
        mkdirp(baseDir);
        const filename = Date.now() + Math.floor(Math.random() * 9000 + 1000) + path.extname(fileName).toLocaleLowerCase();
        //写入目标路径
        var targetPath = path.join(baseDir, filename);
        var dbPath = targetPath.slice(3).replace(/\\/g, "/");      
        return {
            targetPath: targetPath,
            dbPath: dbPath
        }
    }
    //上传文件
    async uploadFile(fromStream, targetPath) {
        var writeStream = fs.createWriteStream(targetPath);
        try {
            await awaitWriteStream(fromStream.pipe(writeStream));
        } catch (error) {
            await sendToWormhole(fromStream);
            throw error;
        } finally {
            await sendToWormhole(fromStream);
        }

    }
    //压缩文件
    async jimp(targetPath) {
        Jimp.read(targetPath)
            .then(lenna => {
                return lenna
                    .resize(200, 200) // resize
                    .quality(30) // set JPEG quality
                   // .greyscale() // set greyscale
                    .write(targetPath + '_200x200'+path.extname(targetPath)); // save
            })
            .catch(err => {
                console.error(err);
            });
    }

    async getDay(){
            return dateFormat(new Date(timestamp), 'yyyyaammdd');
    }
    async getTime(){
        return Date.now();
    }

}
module.exports = toolService;