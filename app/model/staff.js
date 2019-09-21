module.exports = app=>{
   const mongoose = app.mongoose;
   const Schema = mongoose.Schema;

   const staffSchema = new Schema({
       login_name:{type:String,required:true}, //账号
       login_pwd:{type:String,required:true},
       staff_name:{type:String,required:true},
       staff_no:{type:String,default:''},
       staff_phone:{type:String,default:''},
       staff_status:{type:Number,default:1},
       role_id:{type:Schema.Types.ObjectId,required:true},
       is_super:{type:Number,default:0},
       data_status:{type:Number,default:1},
       create_time:{type:String,default:Date.now()},
       last_time:{type:String,default:''},
       last_ip:{type:String,default:''},
   });
   return mongoose.model('Staff',staffSchema,'staffs');
}