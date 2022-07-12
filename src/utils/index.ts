import { BadWord, badWords, ResponseBody } from './data'
import config from 'config'
import Counter from '../models/counter'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JsonResponse = (
  res: any,
  status: number,
  msg: string,
  data: any = null,
  meta: any = null
) => {
  const body: ResponseBody = {
    message: '',
    data: null,
    status: 200,
    success: false,
    meta: {
      total: 1,
      pagination: {
        pageSize: 1,
        page: 1
      }
    }
  }

  if (data) {
    delete data.password
    body.data = data
  }
  if (meta) {
    body.meta = meta
  } else {
    delete body.meta
  }

  if (typeof msg === 'string') {
    body.message = msg
  }

  body.status = status ?? 200
  body.success = body.status < 300 && body.status >= 200 ? true : false
  delete body?.data?.password
  res.status(body.status).send(body)
  return
}

const SuggestWords = (value: string) => {
  let arr = []
  let i = 0
  while (arr.length < 10) {
    const str = `${value}${i % 2 == 0 ? i : `_${i}`}`
    const bad = <BadWord>(
      (<Array<BadWord>>convertObjectToArray(badWords)).find(
        item => str.indexOf(item.value) !== -1
      )
    )

    if (bad == null) continue
    arr.push(str.replace(bad.value, ''))
    i++
    if (i === 100) break
  }

  return arr
}

const convertObjectToArray = (object: any) => {
  return [...Object.values(object)]
}

const generateToken = (user: any) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
      // type: user.type,
      // platform: user.platform,
      // role: user.role
      // group: user.group,
      // enterprise: user.enterprise?._id
    },
    config.get('jwt.key'),
    { expiresIn: config.get('jwt.expireDate') }
  )
  return token
}

const isValidPassword = async (
  queryPassword: string,
  modelPassword: string
) => {
  return await bcrypt.compare(queryPassword, modelPassword)
}
const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}

async function getNextSequenceValue (
  sequenceName: string,
  increment: boolean = true
) {
   const filter = { _id: sequenceName }
  const update = {
    $inc: { sequence_value: 1 }
  }

  let doc = await Counter.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  })

  return doc?.sequence_value 
}

export {
  JsonResponse,
  SuggestWords,
  convertObjectToArray,
  generateToken,
  isValidPassword,
  encryptPassword,
  getNextSequenceValue
}
