module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const userTemp = new Schema({
      phone:{type:Number}, // 手机号
      send_count:{type:Number}, //发送次数
      sign:{type:String}, // 签名
      day:{type:Number}, // 当天时间
      ip:{type:String}, // IP
      add_time:{type:Number,default:Date.now()} // 添加时间
    });
    return mongoose.model('UserTemp',userTemp,'user_temps');
 }