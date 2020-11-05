/***

Scalable fonts for the coin (H,T,🔑,🔍)
Adapted from https://github.com/adactio/FitText.js

***/

const addEvent = function (el, type, fn) {
  if (el.addEventListener) { el.addEventListener(type, fn, false) } else { el.attachEvent('on' + type, fn) }
}

export const fitText = function (el, kompressor, options) {
  var settings = {
    minFontSize: -1 / 0,
    maxFontSize: 1 / 0,
    ...options,
  }

  var fit = function (el) {
    var compressor = kompressor || 1

    let debounceTimer

    var resizer = function () {
      clearTimeout(debounceTimer)
      setTimeout(() => {
        el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px'
      }, 50)
    }

    // Call once to set.
    resizer()

    // Bind events
    // If you have any js library which support Events, replace this part
    // and remove addEvent function (or use original jQuery version)
    addEvent(window, 'resize', resizer)
    addEvent(window, 'orientationchange', resizer)
  }

  if (el.length) {
    for (var i = 0; i < el.length; i++) { fit(el[i]) }
  } else { fit(el) }

  // return set of elements
  return el
}
