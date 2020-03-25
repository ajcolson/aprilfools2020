const Commands = {
  CommmandSigil = "/",
  CommandDelimiter = " ",
  __commands:{
    "rexsay": (args)=>{
      var argv = args.split(Commands.CommandDelimiter)
      
    },
    "botsay": (args)=>{

    },
    "set": (args)=>{

    }
    
  },
  RunCommandFromInput(userInput){
    //create a copy of the string without the sigil
    var userInputWithoutSigil = userInput.substr(1)
    
    //Chunk the input string into a array using the delimitor
    var inputChunks = userInputWithoutSigil.split(Commands.CommandDelimiter)

    //check if the first chunk matches a known command
    if ( inputChunks[0] in Commands.__commands){
      //the command exists, so call it and pass the unaltered userInput and return from it
      return Commands.__commands[inputChunks[0]](userInput)
    }

    //If execution reaches here, no command exists, return false to denote no command found
    return false

  }
}