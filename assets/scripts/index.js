document.addEventListener("DOMContentLoaded",(e)=>{
  document.querySelector("#options-dropdown a").addEventListener("click",(e)=>{
    e.preventDefault()
  })

  document.querySelector("#options-view-chat-link").addEventListener("click",(e)=>{
    Globals.ChangeViewTo("chat")
  })

  document.querySelector("#options-view-settings-link").addEventListener("click",(e)=>{
    Globals.ChangeViewTo("settings")
  })
  
  document.querySelector("#options-view-about-link").addEventListener("click",(e)=>{
    Globals.ChangeViewTo("about")
  })

  document.querySelector("#options-actions-reset-link").addEventListener("click",(e)=>{
    window.location.href = "."
  })
  
  document.querySelector("#options-actions-close-link").addEventListener("click",(e)=>{
    window.location.href = "https://duck.com/"
  })

  //document.querySelector("")

  Globals.ChangeViewTo("chat")
  Chat.AddBotMessageToChatWindow("Hello, I'm the IT Support Chat Bot! How can I be of assistance today?")
})