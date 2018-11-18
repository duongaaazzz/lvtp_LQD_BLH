/**
 * Created by Duong Le on 11/18/18.
 */

import moment from 'moment';

/**
 * Format daytime to time ago
 * @param dateTime
 * @returns {string}
 */
export default function formatDayAgo(dateTime) {
  const now = moment()
  const thatDate = moment(dateTime)
  let timeAgo = now.diff(thatDate, 'giây')
  if (timeAgo < 60)
    return 'Mới đây'
  else {
    timeAgo = now.diff(thatDate, 'minutes')
    if (timeAgo < 60)
      return `${timeAgo} phút trước`
    else {
      timeAgo = now.diff(thatDate, 'hours')
      if (timeAgo < 24)
        return `${timeAgo} giờ trước`
      else {
        timeAgo = now.diff(thatDate, 'days')
        if (timeAgo <= 1)
          return 'Hôm qua'
        else {
          if (timeAgo < 7)
            return `${timeAgo} ngày trước`
          else
            return moment(dateTime).local().format('YYYY-MM-DD')
        }
      }
    }
  }
}
