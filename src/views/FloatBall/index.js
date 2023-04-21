const { ipcRenderer } = require("electron");
const Vue = require('vue')

let biasX = 0
let biasY = 0
const moveS = [0, 0, 0, 0]
function calcS() {
  const res = Math.pow(moveS[0] - moveS[2], 2) + Math.pow(moveS[1] - moveS[3], 2)
  return res < 5
}
function handleMove(e) {
  ipcRenderer.send('ballWindowMove', { x: e.screenX - biasX, y: e.screenY - biasY })
}

const app = Vue.createApp({

  data: () => {
    return {
      isNotMore: true,
      count: [0,0]
    }
  },

  mounted() {
    console.log(1)
    ipcRenderer.on("update",(e,data)=>{
      console.log(data)
      this.count = data
    })
    ipcRenderer.send("updateBall")
  },
  methods: {
    showMore() {
      this.isNotMore = false
      // ipcRenderer.send('setFloatIgnoreMouse', false)
    },
    showEssay(e) {
      if (calcS())
        ipcRenderer.send("showEssay", "show")
    },
    showTodo() {
      if (calcS())
        ipcRenderer.send("showTodo", "show")
    },
    showSimTodo() {
      if (calcS())
        ipcRenderer.send("showSimTodo", "show")
    },
    hideMore() {
      this.isNotMore = true
      // ipcRenderer.send('setFloatIgnoreMouse', true)
    },
    handleMouseDown(e) {
      if(e.button == 2) {
        this.isNotMore = true
        ipcRenderer.send('openMenu')
        return
      }
      biasX = e.x;
      biasY = e.y;
      moveS[0] = e.screenX - biasX
      moveS[1] = e.screenY - biasY
      document.addEventListener('mousemove', handleMove)
    },
    handleMouseUp(e) {
      moveS[2] = e.screenX - e.x
      moveS[3] = e.screenY - e.y
      biasX = 0
      biasY = 0
      document.removeEventListener('mousemove', handleMove)
    },
  },
  computed: {
    progress: function() {
      const totalCount = this.count[0] + this.count[1]
      if(totalCount == 0) {
        return "right: 0%;"
      } else {
        const percent = parseInt(this.count[1]*100/totalCount)
        return "right: " + percent + "%"
      }
    }
  }
})
app.mount("#app")