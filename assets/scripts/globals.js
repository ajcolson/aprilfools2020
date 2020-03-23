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
    }
  },
  Variables : {
    Username: "User"
  },
  MT_RAND : {
    __seed: "Default-Seed -- This value gets changed later. :)",
    __prng: new Math.seedrandom(Globals.MT_RAND.__seed),
    SetSeed(newSeedValue = "Default-Seed -- This value gets changed later. :)"){
      Globals.MT_RAND.__seed = newSeedValue
    },
    GenerateNewPRNG(){
      Globals.MT_RAND.__prng = new Math.seedrandom(Globals.MT_RAND.__seed)
    },
    Next(){
      return Globals.MT_RAND.__prng.Int32()
    },
    NextFromRange(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      var next
      do {
        next = Globals.MT_RAND.Next()
      }
      while (next < min || next > max)
      return next
    },
    NextFromRangeInclusive(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      var next
      do {
        next = Globals.MT_RAND.Next()
      }
      while (next < min || next > max+1)
      return next
    },
  },
  GetRandNumber() {
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
  }
}