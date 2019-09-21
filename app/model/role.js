module.exports = app=>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
 
    const roleSchema = new Schema({
        role_name:{type:String,required:true},
        role_desc:{type:String,default:''},
        create_time:{type:Number,default:Date.now()},
        data_status:{type:Number,default:1},
    
 
    });
    return mongoose.model('Role',roleSchema,'roles');
 }