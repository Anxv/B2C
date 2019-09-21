const 
    baseController
 = require('./base');
const md5 = require('md5');

class homeController extends baseController {
    //显示主页
    async index() {

        await this.ctx.render('/admin/home/home')

    }
    async welcome() {

        await this.ctx.render('/admin/home/welcome')

    }


};
module.exports = homeController;