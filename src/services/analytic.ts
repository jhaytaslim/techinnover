import mongoose from 'mongoose'
import {  getNextSequenceValue } from '../utils'
import Analytic from '../models/analytic'
import moment from 'moment'
import { WINDOW, windowOptions } from '../utils/constants'

class UserService {
  /**
   * Create a Company account
   * @param {String} body
   * @param {Object} user
   */
  createMany (body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const session = await mongoose.startSession()
      try {
        session.startTransaction()
        // const exist = await Analytic.findOne({
        //   $or: [{ username: body.username }, { email: body.email }]
        // })
        // if (exist) {
        //   reject({ code: 400, msg: 'Account already exist.' })
        //   return
        // }

        const analytic = await Analytic.insertMany(body, {
          ordered: true,
          session: session,
          lean: true
        })

        await session.commitTransaction()
        session.endSession()

        resolve(analytic)
      } catch (error) {
        session.abortTransaction()
        console.log('error', error)
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }

  /**
   * Create a Company account
   * @param {String} body
   * @param {Object} user
   */
  create (body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      // const session = await mongoose.startSession()
      try {
        // session.startTransaction()
        let resp: Array<any> = []

        for (let item of body) {
          const currentTime = new Date()
          const eventType: string = item.eventType
          const itemWindow: number = -WINDOW[eventType as keyof windowOptions]
          const duration = moment(currentTime).add(itemWindow, 'seconds')

          console.log('res:......', eventType, itemWindow, duration, item) 

          const exist = await Analytic.findOne({
            user: item.user,
            eventType: item.eventType,
            date: { $gte: duration }
          }).lean()

          console.log('exist:. .....', exist) 

          if (!exist) {
            item._id = await getNextSequenceValue('analytic')
            item.date = currentTime
            const analytic = new Analytic(item)
            analytic.save()

            resp.push(analytic.toObject())
          }
        }

        // await session.commitTransaction()
        // session.endSession()

        resolve(resp)
      } catch (error) {
        // session.abortTransaction()
        console.log('error', error)
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

  /**
   * Create a Company account
   * @param {String} body
   * @param {Object} user
   */
  // update (body: any): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     const session = await mongoose.startSession()
  //     try {
  //       session.startTransaction()
  //       console.log('body:', body)
  //       const user = await Analytic.findOne({ _id: body.id })
  //       if (!user) {
  //         reject({ code: 400, msg: 'Account doesn"t exist.' })
  //         return
  //       }

  //       user.verificationSession = body.verificationSession

  //       await user.save({ session: session })

  //       await session.commitTransaction()
  //       session.endSession()

  //       resolve(user)
  //     } catch (error) {
  //       session.abortTransaction()
  //       console.log('error', error)
  //       reject({ code: 500, msg: 'Server Error' })
  //       return
  //     }
  //   })
  // }

  // get (body: any): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     const session = await mongoose.startSession()
  //     try {
  //       session.startTransaction()
  //       console.log('body:', body)
  //       const user = await Analytic.findOne({ _id: body.id })
  //       if (!user) {
  //         reject({ code: 400, msg: 'Account doesn"t exist.' })
  //         return
  //       }

  //       resolve(user)
  //     } catch (error) {
  //       session.abortTransaction()
  //       console.log('error', error)
  //       reject({ code: 500, msg: 'Server Error' })
  //       return
  //     }
  //   })
  // }

  // find (body: any, options: any = null): Promise<any> {
  //   return new Promise(async (resolve, reject) => {
  //     const session = await mongoose.startSession()
  //     try {
  //       session.startTransaction()
  //       console.log('body:', body)
  //       const user = await Analytic.findOne(body)
  //         .select('-verificationSession')
  //         .lean()
  //       if (!user) {
  //         reject({ code: 400, msg: 'Account doesn"t exist.' })
  //         return
  //       }

  //       resolve(user)
  //     } catch (error) {
  //       session.abortTransaction()
  //       console.log('error', error)
  //       reject({ code: 500, msg: 'Server Error' })
  //       return
  //     }
  //   })
  // }
}

export default UserService
