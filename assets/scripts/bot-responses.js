const BotResponses = {
  ResponsesList : [
    {
      text: "Try rebooting the thing. Did this help solve the problem?",
      threshold: 256
    },
    {
      text: "Try restarting the thing. Did this help solve the problem?",
      threshold: 512
    },
    {
      text: "Try turning the thing off and on again. Did this help solve the problem?",
      threshold: Globals.Constants.MIN_RAND_ROLL_VAL
    },
    {
      text: "Try updating the thing. Did this help solve the problem?",
      threshold: 100
    },
    {
      text: "Try upgrading the thing. Did this help solve the problem?",
      threshold: 200
    },
    {
      text: "Try reinstalling the thing. Did this help solve the problem?",
      threshold: 500
    },
    {
      text: "Try uninstalling the thing. Did this help solve the problem?",
      threshold: 500
    },
    {
      text: "Try installing the thing. Did this help solve the problem?",
      threshold: 300
    },
    {
      text: "Try updating passwords. Did this help solve the problem?",
      threshold: 200
    },
    {
      text: "Time to reimage! Did this help solve the problem?",
      threshold: 850
    },
    {
      text: "Try starting the thing. Did this help solve the problem?",
      threshold: 250
    },
    {
      text: "Do the thing. Did this help solve the problem?",
      threshold: 10
    },
    {
      text: "Check the KBAs! Did this help solve the problem?",
      threshold: 750
    },
    {
      text: `I found this document in the KBA. Did this help solve your problem?<br><button type="button" class="btn btn-light" onclick="Globals.OpenRandomLink()">Open Document</button>`,
      threshold: 25
    },
    {
      text: "ERROR: DOES NOT COMPUTE.",
      threshold: Globals.Constants.MAX_RAND_ROLL_VAL - 5
    },
    {
      text: "ALL YOUR BASE ARE BELONG TO ME.",
      threshold: Globals.Constants.MAX_RAND_ROLL_VAL
    }
  ],
  GetRandomResponseData(userInput){
    var topHalfRoll = Globals.MT_RAND.NextFromRangeInclusive(Globals.Constants.MIN_RAND_ROLL_VAL,Globals.Constants.MAX_RAND_ROLL_VAL/2)

    Globals.MT_RAND.SetSeed(""+Globals.GetUnixTime()+Globals.Variables.PastInputs[userInput])
    Globals.MT_RAND.GenerateNewPRNG()

    var bottomHalfRoll = Globals.MT_RAND.NextFromRangeInclusive(Globals.Constants.MIN_RAND_ROLL_VAL,Globals.Constants.MAX_RAND_ROLL_VAL/2)
    var thresholdRoll =  topHalfRoll + bottomHalfRoll
    var rounds = 0
    while ( rounds <= 99 ) {
      rounds++
      let indexRoll = Globals.MT_RAND.NextFromRange(0,BotResponses.ResponsesList.length)
      let posssibleResponse = BotResponses.ResponsesList[indexRoll]
      if ( thresholdRoll >= posssibleResponse.threshold ) {
        return {
          "text" : posssibleResponse.text,
          "rounds": rounds
        }
      }
    }
    return {"text":"Hi there, Alex here. Somehow the code that picks a random phrase was unable to find a phrase despite many attempts to do so. You shouldn't normally see this message, so congrats on getting this far! It is very unlikely you'll ever see this message again.","rounds":100} 
  }
}
