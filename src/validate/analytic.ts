import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
import { EVENTS, ORDERS } from '../utils/constants'

const complexityOptions = {
  min: 6,
  max: 20,
  requirementCount: 2
}

const passwordComplexityOptions = () => {
  return passwordComplexity(complexityOptions)
}

function validateCreateAnalytics (body: any) {
  const schema = Joi.array().items(
    Joi.object({
      eventType: Joi.string()
        .valid(...Object.values(EVENTS))
        .required(),
      user: Joi.number().required()
    })
  )

  return schema.validate(body)
}

function validateGetAnalytics (body: any) {
  const schema = Joi.object({
    order: Joi.string()
      .valid(...Object.values(ORDERS))
      .optional()
  })

  return schema.validate(body)
}

export { validateCreateAnalytics, validateGetAnalytics }
