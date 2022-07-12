import Counter from '../models/counter'

const JsonResponse = (
  res: any,
  status: number,
  msg: string,
  data: any = null,
  meta: any = null
) => {
  let body: any = {
    data: null,
    success: false
  }

  if (data) {
    body = data
  }

  res.status(status).send(body)
  return
}

async function getNextSequenceValue (
  sequenceName: string,
  increment: boolean = true
) {
  const filter = { _id: sequenceName }
  const update = {
    $inc: { sequence_value: increment ? 1 : -1 }
  }

  let doc = await Counter.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  })

  return doc?.sequence_value
}

export { JsonResponse, getNextSequenceValue }
