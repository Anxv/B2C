const BaseController = require('./base');
class goodsBrandController extends BaseController {
    //商品品牌显示
    async list() {
        var result = await this.ctx.service.goodsbrand.findAll();
        if (result.flag) {
            var goodsbrands = result.data;          
            await this.ctx.render('/admin/goodsbrand/list', {
                goodsbrands
            });
        } else {
            this.ctx.body = result.msg;
        }
    }
    //增加商品品牌显示
    async add() {
        await this.ctx.render('/admin/goodsbrand/add')
    }
    //增加商品品牌操作
    async doAdd() {
        //创建文件夹及路径
         var fromStream = await this.ctx.getFileStream({requireFile:false});
        //  console.log('====='+JSON.stringify(fromStream.fields));
        var result = await this.ctx.service.goodsbrand.insert(fromStream);
        if (result.flag) {
            await this.success('/admin/goodsbrand', result.msg);
        } else {
            await this.fail('/admin/goodsbrand/add', result.msg);
        }
    }
    //修改商品品牌显示
    async edit() {
        const {
            ctx
        } = this;
        var brand_id = ctx.request.query._id;
        var brandResult = await ctx.service.goodsbrand.findById(brand_id);
        if (brandResult.flag) {
            var brands = brandResult.data;
            await this.ctx.render('/admin/goodsbrand/edit', {
                brands
            })
        } else {
            await this.fail('/admin/goodsbrand', result.msg);
        }

    }
    //修改操作
    async doEdit() {

        var fromStream = await this.ctx.getFileStream({requireFile:false});
        var result = await this.ctx.service.goodsbrand.update(fromStream);
        if (result.flag) {
            await this.success('/admin/goodsbrand', result.msg);
        } else {
            await this.fail('/admin/goodsbrand/edit', result.msg);
        }
    }
    //删除商品类型
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.goodsbrand.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
}

module.exports = goodsBrandController;