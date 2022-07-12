import { getNextSequenceValue } from '../utils'
import Analytic from '../models/analytic'
import moment from 'moment'
import { WINDOW, windowOptions } from '../utils/constants'

class AnalyticService {
  /**
   * Create a analytics 
   * @param {String} body
   */
  create (body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let resp: Array<any> = []

        for (let item of body) {
          const currentTime = new Date()
          const eventType: string = item.eventType
          const itemWindow: number = -WINDOW[eventType as keyof windowOptions]
          const duration = moment(currentTime).add(itemWindow, 'seconds')

          const exist = await Analytic.findOne({
            user: item.user,
            eventType: item.eventType,
            date: { $gte: duration }
          }).lean()

          if (!exist) {
            item._id = await getNextSequenceValue('analytic')
            item.date = currentTime
            const analytic = new Analytic(item)
            analytic.save()

            resp.push(analytic.toObject())
          }
        }

        resolve(resp)
      } catch (error) {
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }

  find (body: any, options: any = null): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let sort: any = {}
        if (options.order) {
          sort.date = options.order.toUpperCase() == 'DESC' ? -1 : 1
        }
        const analytic = await Analytic.find(body)
          .sort(sort)
          .lean()

        resolve(analytic)
      } catch (error) {
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }
}

export default AnalyticService
