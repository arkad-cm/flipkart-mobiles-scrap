import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  price: String,
  link: String,
},{timestamps: true})
export default mongoose.model('MobileDetail', schema)
