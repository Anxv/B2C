const {
    Service
} = require('egg');
const fs = require('fs');
class galleryService extends Service {

    //上传文件
    async upload(parts) {
        try {
            var links = [];
            var fromStream;
            while ((fromStream = await parts()) != null) {
                if (fromStream.filename) {
                    var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                    var dbPath = filePath.dbPath;
                    var targetPath = filePath.targetPath;
                    await this.ctx.service.tool.uploadFile(fromStream, targetPath);
                    links.push(dbPath)
                } else {
                    continue
                }
            }
            return {
                flag: true,
                data: links,
                msg: '上传图片成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，上传图片失败'
            };
        }

    }

}
module.exports = galleryService;