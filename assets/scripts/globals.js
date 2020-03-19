const Globals = {
  Constants : {
    MIN_RAND_ROLL_VAL: 0,
    MAX_RAND_ROLL_VAL: 1000
  },
  Variables : {
    Username: "User"
  },
  GetRandNumber() {
    return 4
  },
  GetRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },
  GetRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
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
  }
}