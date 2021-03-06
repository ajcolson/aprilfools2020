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
      return false
    }

    //check if the user is running a command
    if (userInput[0] == ChatCommands.CommandSigil){
      //Process this as a command string
      return ChatCommands.RunCommandFromInput(userInput)
    }
    
    //Since its not a commmand, go ahead and write the users input to the screen
    Chat.AddUserMessageToChatWindow(userInput)
    
    //check for certain key words/phrases that trigger a canned response
    switch(userInput.toLowerCase()){
      case "no": case "n": case "nope": case "nop": case "no.": case "n.": case "nope.": case "nop":
        Chat.AddBotMessageToChatWindow("Try asking the question again or changing the phrasing, I might have a better chance of answering it. Rex will show you how. Rex?")
        Chat.AddRexMessageToChatWindow("RAWR?")
        Chat.AddBotMessageToChatWindow("Thank you Rex.")
        return true
      break;
      case "yes": case "y": case "ye": case "yes.": case "y.": case "ye.":
        Chat.AddBotMessageToChatWindow("Glad that helped! If you have any other questions, please feel free to ask.")
        Chat.AddRexMessageToChatWindow("RAWR!!")
        return true
      break;
      case "what is your name?": case "what's your name?": case "what are you called?": case "who are you?":
        Chat.AddBotMessageToChatWindow(`I am called the IT Support Chat Bot, nice to meet you ${Globals.Variables.Username}! I also have a friend named Rex. Rex say hello.`)
        Chat.AddRexMessageToChatWindow("RAWR.")
        return true
      break;
      case "what thing?": case "what is the thing?":
        Chat.AddBotMessageToChatWindow("You know, the thing. I think Rex knows what it is, right?")
        Chat.AddRexMessageToChatWindow("RAWR!")
        Chat.AddBotMessageToChatWindow("That's right Rex, thanks for clearing that up.")
        return true
      break;
      case "who is rex?":
        Chat.AddBotMessageToChatWindow("Rex is my friend. Rex say hi.")
        Chat.AddRexMessageToChatWindow("RAWR!")
        return true
      break;
      case "rex?":
        Chat.AddRexMessageToChatWindow("RAWR?")
        return true
      break;
      case "what time is it?": case "what is the time?":
        Chat.AddBotMessageToChatWindow(`The time appears to be ${Globals.GetUnixTime()} seconds since the beginning of time. Rex can convert that to you local time. Rex?`)
        Chat.AddRexMessageToChatWindow("RAWR.")
        return true
      break;
      case "hello": case "hi":
        Chat.AddBotMessageToChatWindow("Hello! What can I help with today?")
        Chat.AddRexMessageToChatWindow("RAWR!")
        return true
      break;
      case "tell me a joke": case "can you tell me a joke?":
        Chat.AddRexMessageToChatWindow("RAWR?")
        Chat.AddBotMessageToChatWindow("I am not sure, what do you call it Rex?")
        Chat.AddRexMessageToChatWindow("RAWR!")
        return true
      break;
      case "help":
        Chat.AddBotMessageToChatWindow("How can I help?")
        Chat.AddRexMessageToChatWindow("RAWR?")
        return true
      break;
    }

    //Since this is not an input with a canned response, add it to the chat history:
    Globals.AddInputToHistory(userInput)

    //See if the input is phrased as a question
    if (userInput[userInput.length-1] != "?") {
      Chat.AddBotMessageToChatWindow(`I am sorry, I am not sure I understand what you mean. Can you phrase that in the form of a question?`)
    } else {
      Globals.MT_RAND.SetSeed(userInput)
      Globals.MT_RAND.GenerateNewPRNG()      
      
      var botChatData = BotResponses.GetRandomResponseData(userInput)
      Chat.AddBotMessageToChatWindow(botChatData.text)

      //roll for rex
      Globals.MT_RAND.SetSeed(""+Globals.GetUnixTime())
      Globals.MT_RAND.GenerateNewPRNG()
      var chanceOfRexRoll = Globals.MT_RAND.NextFromRangeInclusive(0,1337)
      if (chanceOfRexRoll == 1337 || chanceOfRexRoll <= 42){
        var rexChatData = RexResponses.GetRandomResponseData()
        Chat.AddRexMessageToChatWindow(rexChatData.text)
      }
      return true
    }
  }
}