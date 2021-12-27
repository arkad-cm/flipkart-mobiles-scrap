import FlipkartMobileModel from './models/FlipkartMobile.model.js'
import rp from 'request-promise'
import cheerio from 'cheerio'
import logger from "./utils/logger.js";
import events from "./events.js";

export default async (from: number, to: number) => {

  const flipkartUrl = `https://www.flipkart.com/`
  const mobiles: {
    name: String
    price: String
    link: String
    stars: number
    ratings: number
    reviews: number
    features: String[]
  }[] = []

  for (let i = from; i <= to; i++) {
    const url = `${flipkartUrl}search?q=mobiles&page=${i}`

    const html = await rp(url)
    const $ = cheerio.load(html)
    $('a._1fQZEK').each((_, el) => {
      const href = $(el).attr('href')?.substring(1)
      const link = flipkartUrl + href?.substring(0, href.indexOf('?'))
      const name = $(el).find('div._4rR01T').text()
      const price = $(el).find('div._30jeq3._1_WHN1').text()
      const stars = +$(el).find('div._3LWZlK').text()
      const details = $(el).find('span._2_R_DZ').text().split('&')
      const ratings = +details[0]?.trim().split(' ')[0]?.replaceAll(',', '')
      const reviews = +details[1]?.trim().split(' ')[0]?.replaceAll(',', '')
      const features: string[] = []
      $(el)
        .find('li.rgWa7D')
        .each((_, it) => {
          features.push($(it).text())
        })
      mobiles.push({
        name,
        price,
        link,
        stars,
        ratings: isNaN(ratings) ? 0 : ratings,
        reviews: isNaN(reviews) ? 0 : reviews,
        features,
      })
    })
  }
  const clearResult = await FlipkartMobileModel.deleteMany()
  logger.info(events.DB_CLEAR, `Truncated DB for storing latest changes. deletedCount = ${clearResult.deletedCount}`)
  return await FlipkartMobileModel.insertMany(mobiles)
}