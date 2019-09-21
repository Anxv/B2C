const BaseController = require('./base');
class goodsTypeAttrController extends BaseController {
    //商品类型属性列表
    async list() {
        const {
            ctx
        } = this;
        var type_id = ctx.request.query._id;
        var typeResult = await ctx.service.goodstype.findById(type_id);
        var allAttrResult = await ctx.service.goodstypeattr.findAllByTypeId(type_id);
        if (allAttrResult.flag && typeResult.flag) {
            var allAttrs = allAttrResult.data;
            var goodstype = typeResult.data;
            await ctx.render('/admin/goodstypeattr/list', {
                allAttrs,
                goodstype
            });
        } else {
            this.ctx.body = '失败了';
        }
    }
    //增加商品类型属性显示
    async add() {
        const {
            ctx
        } = this;
        var type_id = ctx.request.query._id;
        var goodsTypeResult = await ctx.service.goodstype.findById(type_id);
        var goodsTypesResult = await ctx.service.goodstype.findAll();
        if (goodsTypeResult.flag && goodsTypesResult.flag) {
            var fromgoodstype = goodsTypeResult.data;
            var goodstypes = goodsTypesResult.data;
            await this.ctx.render('/admin/goodstypeattr/add', {
                fromgoodstype,
                goodstypes
            });
        } else {
            await this.fail('/admin/goodstypeattr', '数据异常，显示增加页面失败');
        }

    }
    //增加商品类型属性操作
    async doAdd() {
        var body = this.ctx.request.body;
        var type_id = body.type_id;
        // var attrvalueArray = body.attr_value.trim().split('\r\n');
        // body.attr_value = attrvalueArray;
        var result = await this.ctx.service.goodstypeattr.insert(body);
        if (result.flag) {
            await this.success('/admin/goodstypeattr?_id=' + type_id, result.msg);
        } else {
            await this.fail('/admin/goodstypeattr/add?_id=' + type_id, result.msg);
        }
    }
    async edit() {
        const {
            ctx
        } = this;
        var attr_id = ctx.request.query._id;
        var attrResult = await ctx.service.goodstypeattr.findAttrWithType(attr_id);
        var goodsTypesResult = await ctx.service.goodstype.findAll();
        if (attrResult.flag && goodsTypesResult.flag) {
            var attr = attrResult.data;
            var alltypes = goodsTypesResult.data;
            await this.ctx.render('/admin/goodstypeattr/edit', {
                attr,
                alltypes
            })
        } else {
            await this.fail('/admin/goodstypeattr', '数据异常，显示修改页面失败');
        }

    }
    //修改操作
    async doEdit() {
        const {
            ctx
        } = this;
        var body = ctx.request.body;
        var _id = body._id;
        var type_id = body.type_id;
        // var attrString = body.attr_value;
        // var attrValue = attrString.trim();
        // var attr_value = attrValue.split('\r\n');
        // body.attr_value = attr_value;
        var result = await ctx.service.goodstypeattr.update(_id, body);

        if (result.flag) {
            await this.success('/admin/goodstypeattr?_id=' + type_id, result.msg)
        } else {
            await this.fail('/admin/goodstypeattr?_id=' + _id, result.msg);
        }
    }
    //删除商品类型
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.goodstypeattr.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
}

module.exports = goodsTypeAttrController;