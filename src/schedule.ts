import cron from 'node-cron'
import logger from './utils/logger.js'
import scrap from './scrap.js'
import events from './events.js'

const FROM = 1
const TO = 10

/* const RUN_EVERY_24_HOURS = '0 *!/24 * * *'
const RUN_EVERYDAY_MIDNIGHT = '0 0 * * *'
const RUN_EVERYDAY_8_AM = '0 8 * * *' */
const RUN_EVERY_5_MINUTE = '*/5 * * * *' // For Testing Purposes only
/* const RUN_EVERY_10_SECONDS = '*!/10 * * * * *' // For Testing Purposes only */

export default () => {
  cron.schedule(RUN_EVERY_5_MINUTE, async () => {
    try {
      logger.info(
        events.SCHEDULER_UPDATE_START,
        `Automatic Daily Sync Starting...`,
      )
      const results = await scrap(FROM, TO)
      logger.info(
        events.SCHEDULER_UPDATE_END,
        `Auto-Synced DB with latest changes. Stored Count = ${results.length}`,
      )
    } catch (e: any) {
      logger.error(
        events.ERROR_SCHEDULER_UPDATE,
        `Failed to sync latest changes automatically. Error Message = ${
          e.message
        }, Configuration: {from: ${FROM}, to: ${TO}, pages: ${
          FROM - TO + 1
        }}.`,
      )
      logger.stacktrace(e.stack)
    }
  })
}
