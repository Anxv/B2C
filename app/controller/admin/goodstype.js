const BaseController = require('./base');
class goodsTypeController extends BaseController {
    //商品类型列表
    async list() {
        var result = await this.ctx.service.goodstype.findAll();
        if (result.flag) {
            var goodstypes = result.data;
            await this.ctx.render('/admin/goodstype/list', {
                goodstypes
            });
        } else {
            this.ctx.body = result.msg;
        }
    }
    //增加商品类型显示
    async add() {
        await this.ctx.render('/admin/goodstype/add');
    }
    //增加商品类型操作
    async doAdd() {
        var body = this.ctx.request.body;
        var attrString = body.attr_group;
        var attrGroup = attrString.trim();
        var attr_group = attrGroup.split('\r\n');
        var goodstype = {
            type_name: body.type_name,
            attr_group: attr_group
        }

        var result = await this.ctx.service.goodstype.insert(goodstype);
        if (result.flag) {
            await this.success('/admin/goodstype', result.msg);
        } else {
            await this.fail('/admin/goodstype/add', result.msg);
        }
    }
    async edit() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.goodstype.findById(_id);
        if (result.flag) {
            var goodstype = result.data;
            await this.ctx.render('/admin/goodstype/edit', {
                goodstype
            })
        } else {
            await this.fail('/admin/goodstype', result.msg);
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        var attrString = body.attr_group;
        var attrGroup = attrString.trim();
        var attr_group = attrGroup.split('\r\n');
        var goodstype = {
            type_name: body.type_name,
            attr_group: attr_group,
            type_status: body.type_status
        }
        var result = await ctx.service.goodstype.update(_id, goodstype);

        if (result.flag) {
            await this.success('/admin/goodstype', result.msg)
        } else {
            await this.fail('/admin/goodstype', result.msg);
        }
    }
    //删除商品类型
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.goodstype.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
}

module.exports = goodsTypeController;