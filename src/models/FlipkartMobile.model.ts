import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: String,
    price: String,
    link: String,
    stars: Number,
    ratings: Number,
    reviews: Number,
    features: [{ type: String }],
  },
  { timestamps: true },
)
export default mongoose.model('FlipkartMobile', schema)
