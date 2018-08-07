import mongoose from 'mongoose';

const schema = new mongoose.Schema({ name: 'string', password: 'string'});
const Users = mongoose.model('Users', schema);
export default Users;
