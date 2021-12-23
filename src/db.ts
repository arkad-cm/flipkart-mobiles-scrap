import mongoose from 'mongoose'
import MobileDetailModel from './models/MobileDetail.model.js'

mongoose.set('debug', true)

export const connect = async () => {
  console.log('Connecting to DB...')
  await mongoose.connect(process.env.MONGODB_URI!)
  console.log('Connected to mongodb!')

  console.log('Deleting All Previous Records...')
  await MobileDetailModel.deleteMany()
  console.log('Deleted..!')
}
