
const showToast = (content, time = 1500) => {
  const body = document.getElementsByTagName('body')[0]
  const toastWrap = document.createElement('div')
  const toastBox = document.createElement('div')
  toastWrap.setAttribute('id', 'hi-toast')
  toastWrap.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  toastBox.innerText = content
  toastBox.style.cssText = `
    background-color: rgba(0,0,0,0.6);
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-size: 10px;
    max-width: 60%;
    text-align: center;
  `
  toastWrap.appendChild(toastBox)
  body.appendChild(toastWrap)
  setTimeout(() => {
    body.removeChild(toastWrap)
  }, time)
}

module.exports = {
  showToast
}