import mongoose from 'mongoose';

const dateFormat = () => `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`
const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: String, default: dateFormat, immutable: true, required:true},
    fullName: {type: String, required: true},
    status: {type: String, required:true, default: 'Unrestricted'},
    loginDate: String
});

export default mongoose.model('User', schema);

