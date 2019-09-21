const {
    Service
} = require('egg');
const fs = require('fs');

class goodsService extends Service {

    //增加商品操作
    async insert(fromStream) {
        try {
            var body = fromStream.fields;
            //console.log(body);

            //字段处理
            //relate_gifts relate_parts relate_articles
            //console.log('===='+body.relate_goods.trim().split(','));
            
            body.relate_goods = body.relate_goods.trim().split(',');
            body.relate_gifts = body.relate_gifts.trim().split(',');
            body.relate_parts = body.relate_parts.trim().split(',');
            body.relate_articles = body.relate_articles.trim().split(',');
            //文件上传
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                var dbPath = filePath.dbPath;
                var targetPath = filePath.targetPath;
                await this.ctx.service.tool.uploadFile(fromStream, targetPath);
                await this.ctx.service.tool.jimp(targetPath);
            }
            body.goods_img = dbPath;
            //保存 数据库
            var goodsModel = new this.ctx.model.Goods(body);
            var result = await goodsModel.save();

            // console.log('====='+result);

            //商品id
            var goods_id = result._id;
            //处理商品属性值
            var attr_values = body.attr_value_list;
            var attr_new_values = [];
            // attr_values.forEach(value => {
            //     var item = value.trim().split('\r\n');
            //     attr_new_values.push(item);
            // });
            for (const value of attr_values) {
                var item = value.trim().split('\r\n');
                attr_new_values.push(item);
            }

            // console.log('attr_new_values===='+attr_new_values);

            //拼装商品属性对象，循环存储数据库
            for (let i = 0; i < body.attr_id_list.length; i++) {
                //拆分字段
                var attr_id = body.attr_id_list[i];
                var attr_value = attr_new_values[i];
                var typeAttr = await this.ctx.model.GoodsTypeAttr.findById(attr_id);
                var attr_name = typeAttr.attr_name;
                var type_id = typeAttr.type_id;
                var attr_group = typeAttr.attr_group;
                var attr_type = typeAttr.attr_type;
                //拼接对象 存储
                var goodsAttrModel = new this.ctx.model.GoodsAttr({
                    goods_id,
                    attr_id,
                    type_id,
                    attr_name,
                    attr_value,
                    attr_group,
                    attr_type
                })
                await goodsAttrModel.save();
            }
            return {
                flag: true,
                msg: '增加商品成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，增加商品失败'
            };
        }
    }
    //查询商品 依据页数和条数
    async findAllWithPage(page, pageSize) {
        try {
            var totalNum = await this.ctx.model.Goods.count({
                data_status: 1
            });
            var totalPage = Math.ceil(totalNum / pageSize);
            if (page > totalPage) {
                page = totalPage;
            }
            var goodss = await this.ctx.model.Goods.find({
                data_status: 1
            }).skip((page - 1) * pageSize).limit(pageSize);
            return {
                flag: true,
                data: {
                    goodss: goodss,
                    totalPage: totalPage,
                    page: page
                },
                msg: '查询所有商品品牌成功'
            }

        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，查询所有商品品牌失败'
            }

        }
    }
    //依据id查询商品
    async findById(_id) {
        try {
            var goods = await this.ctx.model.Goods.findById(_id);
            if (goods) {
                return {
                    flag: true,
                    data: goods,
                    msg: '依据id查询商品成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据id查询商品失败'
            }
        }
    }
    
    async findByIds(goods_objs) {
        try {
            var goods = await this.ctx.model.Goods.find({$or:goods_objs},{_id:1,goods_img:1});
            if (goods) {
                return {
                    flag: true,
                    data: goods,
                    msg: '依据关联ids 查询商品成功'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，依据关联ids 查询商品失败'
            }
        }
    }
    //删除图片
    async deleteImg(goods_id, img_url) {
        try {
            //数据库层面删除
            var result = await this.ctx.model.Goods.updateOne({
                _id: goods_id
            }, {
                $pull: {
                    relate_gallerys: img_url
                }
            });
            //物理删除
            if (img_url) {
                var targetPath = 'app' + img_url;
                if (fs.existsSync(targetPath)) {
                    fs.unlinkSync(targetPath);
                }
            }
            if (result.ok == 1) {
                return {
                    flag: true,
                    msg: '删除相册图片成功'
                }
            } else {
                return {
                    flag: false,
                    msg: '没有可修改的图片，删除失败'
                }
            }
        } catch (error) {
            return {
                flag: false,
                msg: '数据异常，删除相册图片失败'
            }
        }
    }
    //修改商品操作
    async update(fromStream) {
        try {
            var body = fromStream.fields;
            var goods_id = body._id;
            //字段处理
            //relate_gifts relate_parts relate_articles
            body.relate_goods = body.relate_goods.trim().split(',');
            body.relate_gifts = body.relate_gifts.trim().split(',');
            body.relate_parts = body.relate_parts.trim().split(',');
            body.relate_articles = body.relate_articles.trim().split(',');
            //  console.log('body===' + JSON.stringify(body));
            //文件上传
            if (fromStream && fromStream.filename) {
                var filePath = await this.ctx.service.tool.filePath(fromStream.filename);
                var dbPath = filePath.dbPath;
                var targetPath = filePath.targetPath;
                await this.ctx.service.tool.uploadFile(fromStream, targetPath);
                await this.ctx.service.tool.jimp(targetPath);
                body.goods_img = dbPath;
                await this.ctx.model.Goods.updateOne({
                    _id: goods_id
                }, body);
                var targetPath = 'app' + body.history_img;
                var targetPath200 = this.ctx.helper.url200('app' + body.history_img);
                if (fs.existsSync(targetPath)) {
                    fs.unlinkSync(targetPath);
                }
                if (fs.existsSync(targetPath200)) {
                    fs.unlinkSync(targetPath200);
                }
            } else {
                await this.ctx.model.Goods.updateOne({
                    _id: goods_id
                }, body);
            }
            var attr_ids = body.attr_id_list;
            //console.log('attr_ids=='+attr_ids);
            
            var attr_values = body.attr_value_list;
            if (typeof (body.attr_id_list) == 'string') {
                var attr_values = new Array(body.attr_value_list);
                var attr_ids = new Array(body.attr_id_list)
            }
            // 处理商品属性值

            var attr_new_values = [];
            // attr_values.forEach(value => {
            //     var item = value.trim().split('\r\n');
            //     attr_new_values.push(item);
            // });
            for (const value of attr_values) {
                var item = value.trim().split('\r\n');
                attr_new_values.push(item);
            }
            // console.log('attr_new_values===='+attr_new_values);
            //拼装商品属性对象，循环存储数据库
            var result = await this.ctx.service.goodsattr.deleteByGoodsId(goods_id);
           // console.log(result);
            if (result.flag) {
                for (let i = 0; i < attr_ids.length; i++) {
                    //拆分字段
                    var attr_id = attr_ids[i];
                    var attr_value = attr_new_values[i];
                    var typeAttr = await this.ctx.model.GoodsTypeAttr.findById(attr_id);
                   // console.log(typeAttr);
                    var attr_name = typeAttr.attr_name;
                    var type_id = typeAttr.type_id;
                    var attr_group = typeAttr.attr_group;
                    var attr_type = typeAttr.attr_type;
                    //删除商品所有属性
                    var goodsAttrModel = new this.ctx.model.GoodsAttr({
                        goods_id,
                        attr_id,
                        type_id,
                        attr_name,
                        attr_value,
                        attr_group,
                        attr_type
                    });
                    await goodsAttrModel.save();
                }
            } else {
                return {
                    flag: false,
                    msg: result.msg
                };
            }
            return {
                flag: true,
                msg: '修改商品成功'
            };
        } catch (error) {
            console.log(error);

            return {
                flag: false,
                msg: '数据异常，修改商品失败'
            };
        }
    }
    //依据条件查询 商品
    async findGoodsCondition(condition, number) {
        try {
            var json = {
                data_status: 1
            };
            var limit = number | 4;
            switch (condition) {
                case 'is_hot':
                    json = Object.assign(json, {
                        is_hot: 1
                    });
                    break;
                case 'is_new':
                    json = Object.assign(json, {
                        is_new: 1
                    });
                    break;
                case 'is_best':
                    json = Object.assign(json, {
                        is_best: 1
                    });
                    break;
            }
            var goodss = await this.ctx.model.Goods.find(json).limit(limit);
            return {flag:true,data:goodss,msg:'查询商品成功'}
        } catch (error) {
            return{flag:true,msg:'数据异常，查询商品失败'}
        }

    }

    async findByCateId(cate_id){
        try {
             var goodss = await this.ctx.model.Goods.find({data_stats:1,cate_id:cate_id},{goods_title:1,goods_img:1,price_market:1,price_selling:1});
             return {flag:true,data:goodss,msg:'获取所有商品成功'}
        } catch (error) {
            return {flag:false,msg:'获取所有商品失败'}
        }   
    }

    async findByCateIds(cate_ids){
        try {
             var goodss = await this.ctx.model.Goods.find({$or:cate_ids},{goods_title:1,goods_img:1,price_market:1,price_selling:1,_id:0});
             return {flag:true,data:goodss,msg:'获取所有商品成功'}
        } catch (error) {
            return {flag:false,msg:'获取所有商品失败'}
        }   
    }

}
module.exports = goodsService;