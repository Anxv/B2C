const {
    Controller
} = require('egg');

class baseController extends Controller {
    async success(redirectUrl, msg) {
        var msg = msg || '操作成功';

        await this.ctx.render('admin/common/success', {
            redirectUrl,
            msg
        });

    }

    async fail(redirectUrl, msg) {
        var msg = msg || '操作失败';

        await this.ctx.render('admin/common/fail', {redirectUrl,msg});

    }
}

module.exports = baseController;