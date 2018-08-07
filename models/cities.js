import mongoose from 'mongoose';

const schema = new mongoose.Schema({ name: 'string', country: 'string', capital: 'boolean', location: { lat: 'number', long: 'number'} });
const Cities = mongoose.model('Cities', schema);
export default Cities;

