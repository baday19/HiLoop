const { ipcRenderer } = require("electron");
const Vue = require('vue')
const { formatterTime } = require("../../utils/date.js")
const { getConfig, defaultConfig } = require("../../utils/store.js")
const { showToast } = require("../../utils/toast.js")

let currConfig = {}
const app = Vue.createApp({

  data: () => {
    return {
      opacity: 0.6,
      mainColor: '#49CE95',
      subColor: '#FA0A55'
    }
  },

  mounted() {
    currConfig = getConfig()
    this.opacity = currConfig.opacity
    this.mainColor = currConfig.mainColor
    this.subColor = currConfig.subColor
  },
  methods: {
    storeConfig(type) {
      const data = type == 0 ? {
        opacity: this.opacity,
        mainColor: this.mainColor,
        subColor: this.subColor,
      } : defaultConfig
      if (type == 1) {
        this.opacity = defaultConfig.opacity
        this.mainColor = defaultConfig.mainColor
        this.subColor = defaultConfig.subColor
      }
      localStorage.setItem('config', JSON.stringify(data))
      currConfig = data
      ipcRenderer.send('updateConfig', data)
      showToast("更改成功", 1000)
    },
    checkOpacity(e) {
      const flag = /^(1|(0\.[0-9]+))$/.test(this.opacity)
      if (!flag) {
        this.opacity = currConfig.opacity
      }
    },
    checkColor(type) {
      console.log(type)
      const reg = /^#([0-9]|[a-f|A-F]){6}$/
      if (type == 0) {
        !reg.test(this.mainColor) ? this.mainColor = currConfig.mainColor : ''
      } else {
        !reg.test(this.subColor) ? this.subColor = currConfig.subColor : ''
      }
    },
  }
})
app.mount("#app")