const {
    Service
} = require('egg');
const fs = require('fs');

class advertiseService extends Service {
    //增加品牌操作
    async insert(fromStream) {
        try {
            var body = fromStream.fields;
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                body.ads_img = filePath.dbPath;
                await this.ctx.service.tool.uploadFile(fromStream, filePath.targetPath);
                await this.ctx.service.tool.jimp(filePath.targetPath);
            }
            var advertiseModel = new this.ctx.model.Advertise(body);
            await advertiseModel.save();
            return {
                flag: true,
                msg: '增加广告成功'
            };
        } catch (error) {
            console.log(error);
            return {
                flag: false,
                msg: '数据异常，增加广告失败'
            };
        }

    }
    //查询所有广告
    async findAll() {
        try {
            var advertises = await this.ctx.model.Advertise.find({}).sort({data_sort:1});
            return {
                flag: true,
                data: advertises,
                msg: '查询所有广告成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有广告失败'
            }

        }
    }
    //依据位置查询广告
    async findAdsPosition(position,number) {
        try {
            var advertises = await this.ctx.model.Advertise.find({ads_position:position,ads_status:1}).sort({data_sort:1}).limit(number);
            return {
                flag: true,
                data: advertises,
                msg: '查询所有广告成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有广告失败'
            }

        }
    }
    //依据id查询广告
    async findById(_id) {

        try {
            var advertises = await this.ctx.model.Advertise.findById(_id);
            if (advertises) {
                return {
                    flag: true,
                    data: advertises,
                    msg: '依据id查询广告成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询广告失败'
            }
        }
    }
    //修改广告操作
    async update(fromStream) {

        try {
            var body = fromStream.fields;
            // console.log('body===='+JSON.stringify(body));
            
            var _id = body._id;
            //console.log('==='+_id);
            
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                body.ads_img = filePath.dbPath;
                await this.ctx.service.tool.uploadFile(fromStream, filePath.targetPath);
                await this.ctx.service.tool.jimp(filePath.targetPath);
                var object = await this.ctx.model.Advertise.findById({
                    _id: _id
                }, {
                    _id: 0,
                    ads_img: 1
                });
                var ads_img = object.ads_img;
                if (ads_img) {
                    var targetPath = 'app' + ads_img;
                    var targetPath200 = this.ctx.helper.url200('app' + ads_img);
                    if (fs.existsSync(targetPath)) {
                        fs.unlinkSync(targetPath);
                    }
                    if (fs.existsSync(targetPath200)) {
                        fs.unlinkSync(targetPath200);
                    }
                }

            }
            await this.ctx.model.Advertise.update({
                _id: _id
            }, body);
            return {
                flag: true,
                msg: '修改广告成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改广告失败'
            };
        }

    }
    //依据id删除广告
    async deleteById(_id) {
        try {
            var object = await this.ctx.model.Advertise.findById({
                _id: _id 
            }, {
                _id: 0,
                ads_img: 1
            });
            var ads_img = object.ads_img;
            if (ads_img) {
                var targetPath = 'app' + ads_img;
                var targetPath200 = this.ctx.helper.url200('app' + ads_img);
                if (fs.existsSync(targetPath)) {
                    fs.unlinkSync(targetPath);
                }
                if (fs.existsSync(targetPath200)) {
                    fs.unlinkSync(targetPath200);
                }
            }
            await this.ctx.model.Advertise.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除广告成功'
            };

        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，删除广告失败'
            };
        }
    }
}
module.exports = advertiseService;