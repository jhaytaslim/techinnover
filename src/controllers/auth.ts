import express from 'express'
import { version } from '../../package.json'
import { JsonResponse } from '../utils'
import {
  validateCreateAnalytics,
  validateGetAnalytics
} from '../validate/analytic'
import AnalyticService from '../services/analytic'

const router = express.Router()

router.get('/', (_, res) =>
  res.send(`Server is up and running version ${version}`)
)

router.post('/analytics', async (req, res, next) => {
  try {
    const { error } = validateCreateAnalytics(req.body)
    if (error) return JsonResponse(res, 400, error.details[0].message)

    const userService = new AnalyticService()

    // send body to service
    let result = await userService.create(req.body)

    if (!result) {
      return JsonResponse(res, 400, 'username invalid')
    }

    return JsonResponse(res, 201, `Analytics added successfully`, {
      ingested: result.length
    })
  } catch (err) {
    console.log('err: ', err)
    return JsonResponse(res, err.code || 500, err.msg || 'Server Error')
  }
})

router.get('/analytics', async (req, res, next) => {
  try {
    const { error } = validateGetAnalytics(req.query)
    if (error) return JsonResponse(res, 400, error.details[0].message)

    const userService = new AnalyticService()

    let result = await userService.find({}, req.query)

    return JsonResponse(res, 201, `Analytics retrieved successfully`, result)
  } catch (err) {
    console.log('err: ', err)
    return JsonResponse(res, err.code || 500, err.msg || 'Server Error')
  }
})

router.get('/analytics/:user', async (req, res, next) => {
  try {
    const { error } = validateGetAnalytics(req.query)
    if (error) return JsonResponse(res, 400, error.details[0].message)

    const userService = new AnalyticService()

    const params = req.params as any

    let result = await userService.find(params, req.query)

    return JsonResponse(res, 200, `Analytics retrieved successfully`, result)
  } catch (err) {
    console.log('err: ', err)
    return JsonResponse(res, err.code || 500, err.msg || 'Server Error')
  }
})

export default router
