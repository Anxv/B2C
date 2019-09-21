const {
    Service
} = require('egg');
const fs = require('fs');

class goodsBrandService extends Service {
    //增加品牌操作
    async insert(fromStream) {
        try {
            var body = fromStream.fields;
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                body.brand_logo = filePath.dbPath;
                await this.ctx.service.tool.uploadFile(fromStream, filePath.targetPath);
                await this.ctx.service.tool.jimp(filePath.targetPath);
            }
            var goodsBrandModel = new this.ctx.model.GoodsBrand(body);
            await goodsBrandModel.save();
            return {
                flag: true,
                msg: '增加商品品牌成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，增加商品品牌失败'
            };
        }

    }
    //查询所有商品品牌
    async findAll() {
        try {
            var brands = await this.ctx.model.GoodsBrand.find({});
            return {
                flag: true,
                data: brands,
                msg: '查询所有商品品牌成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有商品品牌失败'
            }

        }
    }
    //依据id查询商品品牌
    async findById(_id) {

        try {
            var brands = await this.ctx.model.GoodsBrand.findById(_id);
            if (brands) {
                return {
                    flag: true,
                    data: brands,
                    msg: '依据id查询商品品牌成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询商品品牌失败'
            }
        }
    }
    //修改商品品牌操作
    async update(fromStream) {

        try {
            var body = fromStream.fields;
            var _id = body._id;
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                body.brand_logo = filePath.dbPath;
                await this.ctx.service.tool.uploadFile(fromStream, filePath.targetPath);
                await this.ctx.service.tool.jimp(filePath.targetPath);
                var object = await this.ctx.model.GoodsBrand.findById({
                    _id: _id
                }, {
                    _id: 0,
                    brand_logo: 1
                });
                var brand_logo = object.brand_logo;
                if (brand_logo) {
                    var targetPath = 'app' + brand_logo;
                    var targetPath200 = this.ctx.helper.url200('app' + brand_logo);
                    if (fs.existsSync(targetPath)) {
                        fs.unlinkSync(targetPath);
                    }
                    if (fs.existsSync(targetPath200)) {
                        fs.unlinkSync(targetPath200);
                    }
                }

            }
            await this.ctx.model.GoodsBrand.update({
                _id: _id
            }, body);
            return {
                flag: true,
                msg: '修改商品品牌成功'
            };
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，修改商品品牌失败'
            };
        }

    }
    //依据id删除商品品牌
    async deleteById(_id) {
        try {
            var object = await this.ctx.model.GoodsBrand.findById({
                _id: _id 
            }, {
                _id: 0,
                brand_logo: 1
            });
            var brand_logo = object.brand_logo;
            if (brand_logo) {
                var targetPath = 'app' + brand_logo;
                var targetPath200 = this.ctx.helper.url200('app' + brand_logo);
                if (fs.existsSync(targetPath)) {
                    fs.unlinkSync(targetPath);
                }
                if (fs.existsSync(targetPath200)) {
                    fs.unlinkSync(targetPath200);
                }
            }
            await this.ctx.model.GoodsBrand.deleteOne({
                _id: _id
            });
            return {
                flag: true,
                msg: '删除商品品牌成功'
            };

        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，删除商品品牌失败'
            };
        }
    }
}
module.exports = goodsBrandService;