module.exports = app=> {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const userSchema = new Schema({
       login_name:{type:String,required:true},
       login_seret:{type:Number,required:true},
       login_pwd:{type:String,required:true},
       user_type:{type:Number,required:true},
       user_sex:{type:Number,required:true},
       user_name:{type:String,default:''},
       user_photo:{type:String,default:''},
       user_truename:{type:String,default:''},
       user_birthday:{type:String,default:''}, 
       user_wechat:{type:String,default:''},
       user_email:{type:String,default:''},
       user_totalscore:{type:Number,default:0},
       user_status:{type:Number,default:1},
       user_form:{type:Number,default:1},
       last_ip:{type:String,default:''},
       last_time:{type:String,default:''},
       data_status:{type:Number,default:1},
       create_time:{type:Number,default:Date.now()}
    });
    return mongoose.model('User',userSchema,'users');
 }