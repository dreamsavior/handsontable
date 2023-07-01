import EventManager from '../eventManager';
import { isCtrlMetaKey, isKey, isPrintableChar } from '../helpers/unicode';

const eventManager = new EventManager();
const pressedKeys = new Set();
let refCount = 0;

/**
 * Begins observing keyboard keys states.
 */
function startObserving() {
  if (refCount === 0) {
    eventManager.addEventListener(document, 'keydown', (event) => {
      if (!pressedKeys.has(event.keyCode)) {
        pressedKeys.add(event.keyCode);
      }
    });
    eventManager.addEventListener(document, 'keyup', (event) => {
      if (pressedKeys.has(event.keyCode)) {
        pressedKeys.delete(event.keyCode);
      }
    });
    eventManager.addEventListener(document, 'visibilitychange', () => {
      if (document.hidden) {
        pressedKeys.clear();
      }
    });
    eventManager.addEventListener(window, 'blur', () => {
      pressedKeys.clear();
    });
  }

  refCount += 1;
}

/**
 * Stops observing keyboard keys states and clear all previously saved states.
 */
function stopObserving() {
  if (refCount > 0) {
    refCount -= 1;
  }

  if (refCount === 0) {
    _resetState();
  }
}

/**
 * Remove all listeners attached to the DOM and clear all previously saved states.
 */
function _resetState() {
  eventManager.clearEvents();
  pressedKeys.clear();
  refCount = 0;
}

/**
 * Checks if provided keyCode or keyCodes are pressed.
 *
 * @param {String} keyCodes The key codes passed as a string defined in helpers/unicode.js file delimited with '|'.
 * @return {Boolean}
 */
function isPressed(keyCodes) {
  return Array.from(pressedKeys.values()).some(_keyCode => isKey(_keyCode, keyCodes));
}

/**
 * Checks if ctrl keys are pressed.
 *
 * @return {Boolean}
 */
// function isPressedCtrlKey() {
//   const values = Array.from(pressedKeys.values());

//   return values.some(_keyCode => isCtrlMetaKey(_keyCode));
// }

/**
 * Returns reference count. Useful for debugging and testing purposes.
 *
 * @return {Number}
 */
function _getRefCount() {
  return refCount;
}

// dreamsavior edit ==================
const $ = window.$;
const HOTdv = {
  patchLog: 'Fixing paste to text mode'
};

$(window).on('blur.HOT', () => {
  HOTdv.resetCtrlKey = true;
  $(document).off('keydown.HOT');
  $(document).on('keydown.HOT', (e) => {
    if (e.ctrlKey) {
      HOTdv.resetCtrlKey = false;
      $(document).off('keydown.HOT');
    }
  });
});
/*
$(window).on("focus.HOT", function() {
  HOTdv.windowHasLostFocus = false;
});
*/

/**
 * Checks if ctrl keys are pressed.
 *
 * @return {Boolean}
 */
function isPressedCtrlKey() {
  if (HOTdv.resetCtrlKey) {
    return false;
  }
  const values = Array.from(pressedKeys.values());

  return values.some(function(_keyCode) {
    return (0, isCtrlMetaKey)(_keyCode);
  }) && values.every(function(_keyCode) {
    return !(0, isPrintableChar)(_keyCode);
  });
}
HOTdv.isPressedCtrlKey = isPressedCtrlKey;
// HOTdv._unicode = _unicode;
// end of dreamsavior edit =============

export {
  _getRefCount,
  _resetState,
  isPressed,
  isPressedCtrlKey,
  startObserving,
  stopObserving,
};
