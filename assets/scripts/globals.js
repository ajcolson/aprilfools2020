const Globals = {
  Constants : {
    MIN_RAND_ROLL_VAL: 0,
    MAX_RAND_ROLL_VAL: 1000,
    VIEWS: {
      "chat": {
        selectors: [
          "#chat-messages-container", "#chat-actions-bar-container"
        ],
        isActive: true
      },
      "about": {
        selectors: [ "#about-app-container" ],
        isActive: false
      },
      "settings": {
        selectors: ["#app-settings-container"],
        isActive: false
      }
    },
    LINKS: [
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0",
     "https://www.youtube.com/watch?v=oHg5SJYRHA0", //maybe if I repeat this enough, it will be the link the user gets? :P
     "https://www.xkcd.com/627/",
     "https://lmgtfy.com/?q=minify+js&pp=1&s=d&iie=1"
    ]
  },
  Variables : {
    Username: "Gordan Freeman",
    PastInputs: {} //Use the user input as a key and keep a count of number of times.

  },
  MT_RAND : {
    __seed: "Default-Seed -- This value gets changed later. :)",
    __prng: null,
    SetSeed(newSeedValue = "LoremIpsum"){
      Globals.MT_RAND.__seed = newSeedValue
    },
    GenerateNewPRNG(){
      Globals.MT_RAND.__prng = new Math.seedrandom(Globals.MT_RAND.__seed)
    },
    Next(){
      if(Globals.MT_RAND.__prng == null)
        Globals.MT_RAND.GenerateNewPRNG()
        //only return unsigned values
        return Math.abs(Globals.MT_RAND.__prng.int32())
    },
    NextFromRange(min, max){
      min = Math.ceil(min)
      max = Math.floor(max)
      var next = Globals.MT_RAND.Next()
      while (next < min || next > (max-1)) {
        if (next == 0){
          if (min != 0)
            next = max-1
          break
        }
        else next = next % (max-1)
      }
      return next
    },
    NextFromRangeInclusive(min, max){
      min = Math.ceil(min)
      max = Math.floor(max)
      var next = Globals.MT_RAND.Next()
      while (next < min || next > max) {
        if (next == 0){
          if (min != 0)
            next = max
          break
        }
        else next = next % max
      }
      return next
    }
  },
  GetRandNumber(){
    return 4
  },
  GetUrlVars(){
    var returns = {}
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        returns[pair[0]] = pair[1]
    }
    return returns
  },
  ChangeViewTo(viewName = "chat"){
    if ( !(viewName in Globals.Constants.VIEWS) )
      viewName = "chat"

      for (const viewID in Globals.Constants.VIEWS){
        const view = Globals.Constants.VIEWS[viewID]
        if (viewName == viewID){
          view.isActive = true
          for (const selector of view.selectors){
            document.querySelector(selector).style.display = "block"
          }
        } else {
          view.isActive = false
          for (const selector of view.selectors){
            document.querySelector(selector).style.display = "none"
        }
      }
    } 
  },
  GetUnixTime(){
    return Math.floor(Date.now() / 1000)
  },
  ChangeUsername(username){
    Globals.Variables.Username = username.substr(0,16)
    document.querySelector("#username-txt").value = Globals.Variables.Username
  },
  ResetApp(){
    window.location.href = "."
  },
  AddInputToHistory(userInput){
    if( userInput in Globals.Variables.PastInputs ){
      Globals.Variables.PastInputs[userInput]++
    } else Globals.Variables.PastInputs[userInput] = 1
  },
  OpenRandomLink(){
    Globals.MT_RAND.SetSeed(Globals.GetUnixTime()+"")
    Globals.MT_RAND.GenerateNewPRNG()
    var linkPathID = Globals.MT_RAND.NextFromRange(0,Globals.Constants.LINKS.length)
    window.location.href = Globals.Constants.LINKS[linkPathID]
  }
}