const {
    Controller
} = require('egg');

class GoodsController extends Controller {
    async goodsList() {
        let goodsList = [
            {
            goods_name: 'apple',
            price: 12.5
        }, 
    ]
    this.ctx.body = goodsList;


    }
}
module.exports = GoodsController;