const ChatCommands = {
  CommandSigil: "/",
  CommandDelimiter:  " ",
  __commands:{
    "rexsay": (argsArray,argsString)=>{      
      Chat.AddRexMessageToChatWindow(argsString.substr(argsArray[0].length))
    },
    "botsay": (argsArray,argsString)=>{
      Chat.AddBotMessageToChatWindow(argsString.substr(argsArray[0].length))
    },
    "set": (argsArray,argsString)=>{
      var theVarName = argsArray[1]
      var theVarValue = ""
      for (var i = 2; i < argsArray.length; i++){
        //Prepend a space for each item after the first
        theVarValue += ( (i==2) ?"":" ") + argsArray[i]
      }
      switch (argsArray[1]){
        case "username":
          Globals.ChangeUsername(theVarValue)
        break
      }
    },
    "reset": ()=>{
      Globals.ResetApp()
    }
  },
  RunCommandFromInput(userInput){
    //create a copy of the string without the sigil
    var userInputWithoutSigil = userInput.substr(1)
    
    //Chunk the input string into a array using the delimitor
    var inputChunks = userInputWithoutSigil.split(ChatCommands.CommandDelimiter)

    //check if the first chunk matches a known command
    if ( inputChunks[0] in ChatCommands.__commands){
      //the command exists, so call it and pass the unaltered userInput and return from it
      return ChatCommands.__commands[inputChunks[0]](inputChunks,userInputWithoutSigil)
    }

    //If execution reaches here, no command exists, return false to denote no command found
    return false

  }
}