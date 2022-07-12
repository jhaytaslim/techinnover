const EVENTS = Object.freeze({
  CLICK: 'click',
  PAGE_VIEW: 'pageView'
})
const WINDOW: windowOptions = Object.freeze({
  [EVENTS.CLICK]: 3,
  [EVENTS.PAGE_VIEW]: 5
})
interface windowProp  {
    found: boolean,
    data?: string[],
    
  }

type windowOptions = {
    [key: string]: number
}

const ORDERS = Object.freeze({
  DESC: 'desc',
  ASC: 'asc'
})

export { EVENTS, ORDERS, WINDOW,  }
export {windowOptions}
