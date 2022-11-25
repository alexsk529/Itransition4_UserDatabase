import mongoose from 'mongoose';

const dateFormat = () => `${new Date().toLocaleString()}`
const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: String, default: dateFormat, immutable: true, required:true},
    fullName: {type: String, required: true},
    status: {type: String, required:true, default: 'Unrestricted'},
    loginDate: {type: String, required: true, default: 'Not signed in'}
});

export default mongoose.model('User', schema);

