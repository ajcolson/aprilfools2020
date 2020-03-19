const RexResponses = {
  ResponsesList : [
    {
      text: "RAWR!",
      threshold: Globals.Constants.MIN_RAND_ROLL_VAL
    },
    {
      text: "RAWR?",
      threshold: 750
    },
    {
      text: "RAWR!",
      threshold: Globals.Constants.MAX_RAND_ROLL_VAL
    },
  ],
  GetRandomResponseData(){
    let thresholdRoll = Globals.GetRandomIntInclusive(Globals.Constants.MIN_RAND_ROLL_VAL,Globals.Constants.MAX_RAND_ROLL_VAL/2) + Globals.GetRandomIntInclusive(Globals.Constants.MIN_RAND_ROLL_VAL,Globals.Constants.MAX_RAND_ROLL_VAL/2)
    var rounds = 0
    while ( rounds <= 99 ) {
      rounds++
      let indexRoll = Globals.GetRandomInt(0,RexResponses.ResponsesList.length)
      let posssibleResponse = RexResponses.ResponsesList[indexRoll]
      if ( thresholdRoll >= posssibleResponse.threshold ) {
        return {
          "text" : posssibleResponse.text,
          "rounds": rounds
        }
      }
    }
    return {"text":"RAWR!","rounds":100} 
  }
}