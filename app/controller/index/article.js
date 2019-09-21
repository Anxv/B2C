const {
    Controller
} = require('egg');

class articleController extends Controller {
    async index(){
        var article_id = this.ctx.request.query._id;
        var result = await this.ctx.service.article.findById(article_id);
        if (result.flag) {
            let article = result.data;
            await this.ctx.render('index/article/index',{article});
        } else {
            this.ctx.body = result.msg;
        }
       
    }
}
module.exports = articleController;