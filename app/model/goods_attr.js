module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const goodsAttrSchema = new Schema({
        goods_id:{type:mongoose.ObjectId,required:true}, //商品id
        attr_id:{type:mongoose.ObjectId,required:true}, // 商品属性id
        type_id:{type:mongoose.ObjectId,required:true},// 类型id 
        attr_group:{type:String,default:''},    
        attr_name:{type:String,default:''}, //商品属性标题
        attr_value:{type:[String],default:[]}, //商品属性值
        attr_type:{type:Number,default:1}, //1 唯一属性 2 单选属性 3 复选属性

    });
    return mongoose.model('GoodsAttr',goodsAttrSchema,'goods_attrs');
 }