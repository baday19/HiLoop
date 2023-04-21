const { ipcRenderer } = require("electron");
const Vue = require('vue')
const { formatterTime } = require("../../utils/date.js")

const app = Vue.createApp({

  data: () => {
    return {
      essayList: [],
      // str2Html: handleStr
    }
  },

  mounted() {
    this.getEssayList()
  },
  methods: {
    submitEssay(e){
      const essay = document.getElementById('editing-essay')
      // console.log(essay.innerHTML)
      const time = new Date().getTime().toString()
      const content = essay.innerHTML
      const id = ipcRenderer.sendSync("essay", {name: "add", time: time, content: content})
      const item = {
        id: id[0]['last_insert_rowid()'],
        time: formatterTime(time),
        content,
        status: 0
      }
      this.essayList.unshift(item)
      essay.innerHTML = '<div><br></div>'
    },
    getEssayList() {
      const list = ipcRenderer.sendSync("essay", { name: "getAll" })
      this.essayList = list.map(item => {
        item.time = formatterTime(item.time)
        return item
      })
    },
    changeStatus(item, index) {
      const id = item.id
      this.essayList[index].status = 1 - parseInt(item.status)
      ipcRenderer.send("essay", { name: "change", id: id, status: item.status })
    }
  }
})
app.mount("#app")