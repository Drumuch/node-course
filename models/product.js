import mongoose from 'mongoose';

const schema = new mongoose.Schema({ name: 'string', price: 'string', reviews: 'string'});
const Products = mongoose.model('Products', schema);
export default Products;
