const BaseController = require('./base');
class goodsController extends BaseController {
    //获取类型属性
    async getTypeAttrs() {
        const {
            ctx
        } = this;
        var type_id = this.ctx.request.query.type_id;
        var result = await ctx.service.goodstypeattr.findAllByTypeId(type_id);
        if (result.flag) {
            var attrs = result.data;
            return ctx.body = {
                result: attrs
            };
        } else {
            ctx.body = '失败'
        }
    }
    //商品列表显示
    async list() {
        const {
            ctx
        } = this;
        var page = ctx.request.query.page || 1;
        var pageSize = 2;
        var result = await ctx.service.goods.findAllWithPage(page, pageSize);
        if (result.flag) {
            var goodss = result.data.goodss;
            var totalPage = result.data.totalPage;
            var page = result.data.page;
            await this.ctx.render('/admin/goods/list', {
                goodss,
                totalPage,
                page
            });

        } else {
            ctx.body = result.msg;
        }
    }


    //显示添加
    async add() {
        const {
            ctx
        } = this;
        var typeResult = await this.ctx.service.goodstype.findAll();
        var cateResult = await this.ctx.service.goodscategory.findAll();
        var brandResult = await this.ctx.service.goodsbrand.findAll();

        if (typeResult.flag && cateResult.flag && brandResult.flag) {
            var types = typeResult.data;
            var cates = cateResult.data;
            var brands = brandResult.data;
            await ctx.render('admin/goods/add', {
                types,
                cates,
                brands
            });
        } else {
            await this.fail('/admin/goods', '显示增加页面失败');
        }
    }
    //表单提交操作
    async doAdd() {
        var formStream = await this.ctx.getFileStream({
            requireFile: false
        });
        var result = await this.ctx.service.goods.insert(formStream);
        if (result.flag) {
            await this.success('/admin/goods', result.msg);
        } else {
            await this.fail('/admin/goods', result.msg);
        }

    }
    //图片上传
    async doUpload() {
        const {
            ctx
        } = this;
        var parts = await ctx.multipart({
            autoFields: true
        });
        var result = await this.ctx.service.gallery.upload(parts);
        if (result.flag) {
            var links = result.data;
            this.ctx.body = {
                link: links[0]
            };
        } else {
            var msg = result.msg;
            this.ctx.body = {
                msg: msg
            }
        }
    }
    //修改商品显示
    async edit() {
        const {
            ctx
        } = this;
        var goods_id = ctx.request.query._id;     
        var typeResult = await ctx.service.goodstype.findAll();
        var cateResult = await ctx.service.goodscategory.findAll();
        var brandResult = await ctx.service.goodsbrand.findAll();
        var goodsResult = await ctx.service.goods.findById(goods_id);
        var goodsAttrResult = await ctx.service.goodsattr.findByGoodsId(goods_id);
        var lastPage = ctx.locals.lastPage;
        if (goodsAttrResult.flag) {
            var goodsAttrs = goodsAttrResult.data;  
            var goodsAttr = '';
            for (var i = 0; i < goodsAttrs.length; i++) {
                if (goodsAttrs[i].attr_type == 1) {
                    goodsAttr += '<li><span>' + goodsAttrs[i].attr_name +
                        ': </span><input type="hidden" name="attr_id_list" value="' + goodsAttrs[i].attr_id +
                        '" />  <input type="text" name="attr_value_list" value="'+ goodsAttrs[i].attr_value +'"/></li>'
                } else {
                    goodsAttr += '<li><span>' + goodsAttrs[i].attr_name +
                        ': </span><input type="hidden" name="attr_id_list" value="' + goodsAttrs[i].attr_id + '" />'
                    goodsAttr += '<textarea name="attr_value_list" rows="8" cols="60">'
                    for (const value of goodsAttrs[i].attr_value) {
                        goodsAttr += value + '\r\n'
                    }
                    goodsAttr += '</textarea>'
                    goodsAttr += '</li>'
                }
            }
        }

        if (typeResult.flag && cateResult.flag && brandResult.flag && goodsResult.flag) {
            var types = typeResult.data;
            var cates = cateResult.data;
            var brands = brandResult.data;
            var goods = goodsResult.data;
            await ctx.render('admin/goods/edit', {
                types,
                cates,
                brands,
                goods,
                goodsAttr,
                lastPage
            });
        } else {
            // await ctx.fail('/admin/goods',result.msg);
            ctx.body = "36666";
        }

    }
    //修改商品提交操作
    async doEdit(){
        const {ctx} = this;
        var fromStream = await this.ctx.getFileStream({
            requireFile: false
        });
        var targetPage = fromStream.fields.lastPage;
        var result = await this.ctx.service.goods.update(fromStream);
        if (result.flag) {
            await this.success(targetPage, result.msg);
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }

    }
    async deleteImg() {
        var {
            ctx
        } = this;
        var goods_id = ctx.request.query._id;
        // console.log('===='+goods_id);
        
        var img_url = ctx.request.query.img_url;
        var result = await ctx.service.goods.deleteImg(goods_id, img_url);
        // console.log(result);
        if (result.flag) {
            ctx.body = {
                flag: true,
                msg: result.msg
            }
        } else {
            ctx.body = {
                flag: false,
                msg: result.msg
            }
        }
    }
    async delete(){
        const {ctx} = this;
        var goods_id =ctx.request.query._id;
        var result = await ctx.model.Goods.updateOne({_id:goods_id},{data_status:0});
        if (result.ok == 1) {
            await this.success(ctx.locals.lastPage,'删除成功');
        }else{
            await this.fail(ctx.locals.lastPage,'删除失败')
        }
    }
}
module.exports = goodsController;