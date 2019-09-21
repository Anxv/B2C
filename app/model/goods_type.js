module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const goodsTypeSchema = new Schema({
        type_name:{type:String,default:'',required:true},
        attr_group:{type:[String]},
        type_status:{type:Number,default:1},
    });
    return mongoose.model('GoodsType',goodsTypeSchema,'goods_types');
 }