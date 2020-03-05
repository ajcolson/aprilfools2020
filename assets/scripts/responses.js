const MagicResponses = {
  ResponsesList : [
    {
      text: "Reboot the thing.",
      threshold: 256
    },
    {
      text: "Restart the thing.",
      threshold: 512
    },
    {
      text: "Turn the thing off and on again.",
      threshold: Helpers.Constants.MIN_RAND_ROLL_VAL
    },
    {
      text: "Update the thing.",
      threshold: 100
    },
    {
      text: "Upgrade the thing.",
      threshold: 200
    },
    {
      text: "Reinstall the thing.",
      threshold: 500
    },
    {
      text: "Uninstall the thing.",
      threshold: 500
    },
    {
      text: "Install the thing.",
      threshold: 300
    },
    {
      text: "Update passwords.",
      threshold: 200
    },
    {
      text: "Time to reimage!",
      threshold: 850
    },
    {
      text: "Start the thing.",
      threshold: 250
    },
    {
      text: "Do the thing.",
      threshold: 10
    },
    {
      text: "Check the KBAs!",
      threshold: 750
    },
    {
      text: "ERROR: DOES NOT COMPUTE.",
      threshold: Helpers.Constants.MAX_RAND_ROLL_VAL - 5
    },
    {
      text: "Unsure at this time, try again later.",
      threshold: 500
    },
    {
      text: "ALL YOUR BASE ARE BELONG TO ME.",
      threshold: Helpers.Constants.MAX_RAND_ROLL_VAL
    }
  ],
  GetRandomResponseData(){
    let thresholdRoll = Helpers.GetRandomIntInclusive(Helpers.Constants.MIN_RAND_ROLL_VAL,Helpers.Constants.MAX_RAND_ROLL_VAL/2) + Helpers.GetRandomIntInclusive(Helpers.Constants.MIN_RAND_ROLL_VAL,Helpers.Constants.MAX_RAND_ROLL_VAL/2)
    var rounds = 0
    while (1) {
      rounds++
      let indexRoll = Helpers.GetRandomInt(0,Responses.ResponsesList.length)
      let posssibleResponse = Responses.ResponsesList[indexRoll]
      if ( thresholdRoll >= posssibleResponse.threshold ) {
        return {
          "text" : posssibleResponse.text,
          "rounds": rounds
        }
      }
      if (rounds > 99) {
        return {"text":"Hi there, Alex here. Somehow the code that picks a random phrase was unable to find a phrase despite many attempts to do so. You shouldn't normally see this message, so congrats on getting this far! It is very unlikely you'll ever see this message again.","rounds":rounds}
      }
    } 
  }
}
