const { ipcRenderer } = require("electron");
const fs = require('fs')
const path = require('path')
const Vue = require('vue')

const getTodayTimeStamp = () => {
  const date = new Date()
  const today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  return new Date(today).getTime()
}

const app = Vue.createApp({

  data: () => {
    return {
      activeItems: new Set([]),
      essayList: [],
    }
  },

  mounted() {
    this.getEssayList()
  },
  methods: {
    getEssayList() {
      fs.readdir(path.join(__dirname, 'data/essay'), (err, files) => {
        if (err) {
          console.log(err)
        } else {
          files.sort(function (a, b) { return b - a })
          const list = files.map(item => {
            const date = new Date(parseInt(item))
            return {
              id: item,
              date: date.getMonth() + 1 + "月" + date.getDate() + "日",
              day: date.getDay()
            }
          })
          const today = new Date()
          if (list[0].date != (today.getMonth() + 1 + "月" + today.getDate() + "日")) {
            list.unshift({
              id: today.getTime(),
              date: today.getMonth() + 1 + "月" + today.getDate() + "日",
              day: today.getDay(),
              today: true
            })
          } else {
            list[0].today = true
          }
          this.essayList = list
          this.openEssay(list[0], 0)
        }
      })
    },
    openEssay(item, index) {
      if (this.activeItems.has(index)) {
        this.activeItems.delete(index)
      } else {
        fs.readFile(path.join(__dirname, 'data/essay/' + item.id), (err, data)=>{
          if(err) {
            // 文件不存在
            fs.openSync(path.join(__dirname, 'data/essay/' + item.id), 'w')
            console.log(err)
          } else {
            console.log(data.toString())
          }
          this.activeItems.add(index)
        })
      }
    }
  }
})
app.mount("#app")