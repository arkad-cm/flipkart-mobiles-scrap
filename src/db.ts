import mongoose from 'mongoose'

export const connect = async () => {
  // if (process.env.NODE_ENV === 'development') {
  //   mongoose.set('debug', true)
  // }
  console.log('Connecting to DB...')
  await mongoose.connect(process.env.MONGODB_URI!)
  console.log('Connected to mongodb!')
}
