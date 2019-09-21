const BaseController = require('./base');
class advertiseController extends BaseController {
    //广告显示
    async list() {
        var result = await this.ctx.service.advertise.findAll();
        if (result.flag) {
            var advertises = result.data;
            await this.ctx.render('/admin/advertise/list', {
                advertises
            });
        } else {
            this.ctx.body = result.msg;
        }
    }
    //增加广告显示
    async add() {
        await this.ctx.render('/admin/advertise/add')
    }
    //增加广告操作
    async doAdd() {
        // //创建文件夹及路径
        var fromStream = await this.ctx.getFileStream({
            requireFile: false
        });
        // console.log('====='+JSON.stringify(fromStream.fields));
        var result = await this.ctx.service.advertise.insert(fromStream);
        if (result.flag) {
            await this.success('/admin/advertise', result.msg);
        } else {
            await this.fail('/admin/advertise/add', result.msg);
        }
    }
    //修改广告显示
    async edit() {
        const {
            ctx
        } = this;
        var advertise_id = ctx.request.query._id;
        var advertiseResult = await ctx.service.advertise.findById(advertise_id);
        if (advertiseResult.flag) {
            var advertises = advertiseResult.data;
            // console.log('advertises===='+advertises);
            
            await this.ctx.render('/admin/advertise/edit', {
                advertises,
            })
        } else {
            await this.fail('/admin/advertise', result.msg);
        }

    }
    //修改操作
    async doEdit() {

        var fromStream = await this.ctx.getFileStream({
            requireFile: false
        });
        var result = await this.ctx.service.advertise.update(fromStream);
        if (result.flag) {
            await this.success('/admin/advertise', result.msg);
        } else {
            await this.fail('/admin/advertise/edit', result.msg);
        }
    }
    //删除广告
    async delete() {
        const {
            ctx
        } = this;
        var _id = ctx.request.query._id;
        var result = await ctx.service.advertise.deleteById(_id);
        if (result.flag) {
            await this.success(ctx.locals.lastPage, result.msg)
        } else {
            await this.fail(ctx.locals.lastPage, result.msg);
        }
    }
}

module.exports = advertiseController;