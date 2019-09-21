const BaseController = require('./base');
class galleryController extends BaseController {
    async upload() {
        await this.ctx.render('admin/goods/uploadajax');
    }
    async doUpload() {
        const {
            ctx
        } = this;
        var parts = await ctx.multipart({
            autoFields: true
        });
        var result = await this.ctx.service.gallery.upload(parts);
        if (result.flag) {
            var gallerys = result.data;
            this.ctx.body = {
                gallerys: gallerys
            };
        } else {
            var msg = result.msg;
            this.ctx.body = {
                msg: msg
            }
        }

    }

}


module.exports = galleryController;