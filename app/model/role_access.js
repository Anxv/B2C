module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const roleAccessSchema = new Schema({
        role_id: {
            type: mongoose.ObjectId
        },
        access_id: {
            type: mongoose.ObjectId
        }
    });
    return mongoose.model('RoleAccess', roleAccessSchema, 'role_access');
}