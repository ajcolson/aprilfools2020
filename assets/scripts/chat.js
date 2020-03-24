const Chat = {
  __helpers:{
    _addChatHTMLtoChatWindow(msgHTML, doScroll = true){
      var chat_container = document.querySelector("#chat-messages-container")
      chat_container.innerHTML += msgHTML
      if (doScroll)
        chat_container.scrollTop = chat_container.scrollHeight
    }
  },
  AddBotMessageToChatWindow(msgText){
    var html_message = 
    `<div class="chat-bubble">
      <div class="chat-bubble-avatar mb-1">
        <span class="badge badge-pill badge-secondary p-2">
          <span class="mdi mdi-24px mdi-light mdi-robot"></span>
        </span>
        <h4>IT Support Bot</h4>
      </div>
      <div class="chat-bubble-message">
        <div class="card bg-secondary text-light mb-3">
          <div class="card-body">
            <p class="card-text">${msgText}</p>
          </div>
        </div>
      </div>
    </div>`
    Chat.__helpers._addChatHTMLtoChatWindow(html_message)
  },
  AddUserMessageToChatWindow(msgText){
    var html_message = 
    `<div class="chat-bubble user-chat-bubble">
      <div class="chat-bubble-avatar mb-1">
        <span class="badge badge-pill badge-light p-2">
          <span class="mdi mdi-24px mdi-account"></span>
        </span>
        <h4>${Globals.Variables.Username}</h4>
      </div>
      <div class="chat-bubble-message">
        <div class="card bg-light mb-3">
          <div class="card-body">
            <p class="card-text">${msgText}</p>
          </div>
        </div>
      </div>
    </div>`
    Chat.__helpers._addChatHTMLtoChatWindow(html_message)
  },
  AddRexMessageToChatWindow(msgText){
    var html_message = 
    `<div class="chat-bubble">
      <div class="chat-bubble-avatar mb-1">
        <span class="badge badge-pill badge-dark p-2">
          <span class="mdi mdi-24px mdi-google-downasaur"></span>
        </span>
        <h4>Rex</h4>
      </div>
      <div class="chat-bubble-message">
        <div class="card bg-dark text-white mb-3">
          <div class="card-body">
            <p class="card-text">${msgText}</p>
          </div>
        </div>
      </div>
    </div>`
    Chat.__helpers._addChatHTMLtoChatWindow(html_message)
  },
  ProcessUserInput(){
    var userInput = document.querySelector("#chat-send-txt").value
    document.querySelector("#chat-send-txt").value = ""
    
    //Don't process blank inputs or input not of type string
    if (userInput === "" || typeof userInput != "string"){
      return
    }

    if (userInput[0] == "/"){
      //Process this as a command string
    } else {
      Globals.MT_RAND.SetSeed(userInput)
      Globals.MT_RAND.GenerateNewPRNG()
      Chat.AddUserMessageToChatWindow(userInput)
      
      var botChatData = BotResponses.GetRandomResponseData()
      Chat.AddBotMessageToChatWindow(botChatData.text)

      //roll for rex
      Globals.MT_RAND.SetSeed(""+Globals.GetUnixTime())
      Globals.MT_RAND.GenerateNewPRNG()
      var chanceOfRexRoll = Globals.MT_RAND.NextFromRangeInclusive(0,1337)
      if (chanceOfRexRoll == 1337){
        var rexChatData = RexResponses.GetRandomResponseData()
        Chat.AddRexMessageToChatWindow(rexChatData.text)
      }

    }
  }
}