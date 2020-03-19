document.addEventListener("DOMContentLoaded",(e)=>{
  document.querySelector("#options-dropdown a").addEventListener("click",(e)=>{
    e.preventDefault()
  })

  document.querySelector("#options-reset-link").addEventListener("click",(e)=>{
    window.location.href = "."
  })

  document.querySelector("#options-settings-link").addEventListener("click",(e)=>{})
  
  document.querySelector("#options-about-link").addEventListener("click",(e)=>{
    e.preventDefault()
  })
  
  document.querySelector("#options-close-link").addEventListener("click",(e)=>{
    window.location.href = "https://duck.com/"
  })
  
  addBotMessageToChatWindow("Hello, I'm the IT Support Chat Bot! How can I be of assistance today?")
})