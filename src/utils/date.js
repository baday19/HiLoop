const formatterTime = (timestamp) => {
  const date = new Date(parseInt(timestamp))
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
  const hour = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
  const min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
  return `${month}月${day}日 ${hour}:${min}`
}

module.exports = {
  formatterTime
}