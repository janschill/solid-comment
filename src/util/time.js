import { isString } from 'lodash'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default class Time {
  static format (format, time) {
    let dateTime = time
    if (isString(time)) {
      dateTime = new Date(this.fromStrippedToDate(time))
    }
    const month = this.shortMonthName(monthNames[dateTime.getMonth()])
    const date = dateTime.getDate()
    switch (format) {
      case 'M d':
        return `${month} ${date}`
      default:
        return dateTime
    }
  }

  static shortMonthName (month) {
    if (month.length >= 3) {
      return month[0] + month[1] + month[2]
    }
    return month
  }

  static trimSymbols (timeString) {
    if (isString(timeString) &&
      (timeString.includes('-') || timeString.includes(':') || timeString.includes('.'))
    ) {
      return timeString.replace(/-/g, '').replace(/:/g, '').replace(/\./g, '')
    }
    return timeString
  }

  static trimMilliseconds (timeString) {
    if (isString(timeString) && timeString.length === 24 && timeString.includes('.')) {
      return `${timeString.split('.')[0]}Z`
    }
    return timeString
  }

  static jsToIso8601Strip (dateObject) {
    if (dateObject instanceof Date) {
      const timeString = dateObject.toISOString()
      const timeStringWithoutMilliseconds = this.trimMilliseconds(timeString)
      const timeStringStripped = this.trimSymbols(timeStringWithoutMilliseconds)

      return timeStringStripped
    }
    return dateObject
  }

  // Converts stripped time to JavaScript time object
  // eg. 2021-02-25T14:42:27:463Z ->
  static fromStrippedToDate (timeString) {
    const year = timeString.substring(0, 4)
    const month = timeString.substring(4, 6)
    const day = timeString.substring(6, 8)
    const hour = timeString.substring(9, 11)
    const minute = timeString.substring(11, 13)
    const second = timeString.substring(13, 15)

    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
  }
}
