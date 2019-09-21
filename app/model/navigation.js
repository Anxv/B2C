module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const navigationSchema = new Schema({
        nav_name:{type:String,default:''}, //导航名称
        nav_icon:{type:String,default:''}, //icon
        nav_position:{type:Number,default:0},//导航位置
        nav_open:{type:Number,default:1},//1 本窗口 2 新窗口
        nav_link:{type:String,default:''}, // 导航链接
        data_sort:{type:Number,default:10},// 排序
        nav_status:{type:Number,default:1},// 1 显示 2 隐藏
        create_time:{type:Number,default:Date.now()}// 创建时间
    });
    return mongoose.model('Navigation',navigationSchema,'navigations');
 }