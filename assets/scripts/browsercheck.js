
/*
 * Check to see if the user's browser supports ECMAScript 6 features. Returns a boolean indicating if ES6 features are supported.
 * If true, it is likely a modern browser such as Chrome, Firefox, Edge
 * If false, it is likely not a modern browser such as IE11 or lesser     
 */
function BrowserSupportsES6(){
  "use strict";

  if (typeof Symbol == "undefined") return false;
  try {
      eval("class Foo {}");
      eval("var bar = (x) => x+1");
  } catch (e) { return false; }
  return true;
}