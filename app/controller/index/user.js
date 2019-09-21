const {
    Controller
} = require('egg');

class UserController extends Controller {
    async index(){
       await this.ctx.render('index/user');
    }
}
module.exports = UserController;