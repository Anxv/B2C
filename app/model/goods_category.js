module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const goodsCategorySchema = new Schema({
        cate_name:{type:String,default:''},  //分类名称
        cate_icon:{type:String,default:''},  //分类icon
        cate_keys:{type:String,default:''},  //seo关键字
        cate_desc:{type:String,default:''},  //seo描述
        cate_url:{type:String,default:''},   
        cate_template:{type:String,default:''},
        cate_pid:{type:Schema.Types.Mixed},
        cate_status:{type:Number,default:1},
        data_sort:{type:Number,default:50},
        data_status:{type:Number,default:1},
    });
    return mongoose.model('GoodsCategory',goodsCategorySchema,'goods_categorys');
 }