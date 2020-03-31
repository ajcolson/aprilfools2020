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
      text: "RAWR?!",
      threshold: Globals.Constants.MAX_RAND_ROLL_VAL
    },
  ],
  GetRandomResponseData(){
    var topHalfRoll = Globals.MT_RAND.NextFromRangeInclusive(Globals.Constants.MIN_RAND_ROLL_VAL,Globals.Constants.MAX_RAND_ROLL_VAL/2)

    Globals.MT_RAND.SetSeed(""+Globals.GetUnixTime())
    Globals.MT_RAND.GenerateNewPRNG()

    var bottomHalfRoll = Globals.MT_RAND.NextFromRangeInclusive(Globals.Constants.MIN_RAND_ROLL_VAL,Globals.Constants.MAX_RAND_ROLL_VAL/2)
    var thresholdRoll =  topHalfRoll + bottomHalfRoll
    var rounds = 0
    while ( rounds <= 99 ) {
      rounds++
      let indexRoll = Globals.MT_RAND.NextFromRange(0,RexResponses.ResponsesList.length)
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
