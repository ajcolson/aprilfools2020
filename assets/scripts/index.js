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
    Globals.ResetApp()
  })
  
  document.querySelector("#options-actions-close-link").addEventListener("click",(e)=>{
    window.location.href = "https://duck.com/"
  })
  document.querySelector("#chat-send-btn").addEventListener("click", (e)=>{
    Chat.ProcessUserInput()
  })
  document.querySelector("#chat-send-txt").addEventListener("keyup",(e)=>{
    if (e.keyCode === 13){
      Chat.ProcessUserInput()
    }
  })
  document.querySelector("#username-txt").addEventListener("change",(e)=>{
    e.preventDefault()
    Globals.ChangeUsername(document.querySelector("#username-txt").value)
  })

  Globals.ChangeUsername("User")
  Globals.MT_RAND.GenerateNewPRNG()
  Globals.ChangeViewTo("chat")
  Chat.AddBotMessageToChatWindow("Hello, I'm the IT Support Chat Bot! How can I be of assistance today?")
})