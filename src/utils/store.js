
const defaultConfig = {
  opacity: 0.6,
  mainColor: '#49CE95',
  subColor: '#FA0A55'
}

const getConfig = () => {
  const config = localStorage.getItem('config')
  return config?JSON.parse(config):defaultConfig
}

/**
 * 在页面内调用该方法设置css变量
 */
const applyConfig = () => {
  const config = getConfig()
  document.documentElement.style.setProperty('--main-color', config.mainColor)
  document.documentElement.style.setProperty('--sub-color', config.subColor)
  document.documentElement.style.setProperty('--opacity', config.opacity)
}

module.exports = {
  defaultConfig,
  getConfig,
  applyConfig
}