/*
Copyright 2018 The Extra Keyboards for Chrome OS Authors. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var Shift = { PLAIN: 'plain', SHIFTED: 'shifted' };

var contextID = -1;
var shiftState = Shift.PLAIN;
var lastRemappedKeyEvent = undefined;

var assetKeymap = {
  Digit1: { key: { plain: '1', shifted: '!' }, code: 'Digit1' },
  Digit2: { key: { plain: '2', shifted: '@' }, code: 'Digit2' },
  Digit3: { key: { plain: '3', shifted: '#' }, code: 'Digit3' },
  Digit4: { key: { plain: '4', shifted: '$' }, code: 'Digit4' },
  Digit5: { key: { plain: '5', shifted: '%' }, code: 'Digit5' },
  Digit6: { key: { plain: '6', shifted: '^' }, code: 'Digit6' },
  Digit7: { key: { plain: '7', shifted: '&' }, code: 'Digit7' },
  Digit8: { key: { plain: '8', shifted: '*' }, code: 'Digit8' },
  Digit9: { key: { plain: '9', shifted: '(' }, code: 'Digit9' },
  Digit0: { key: { plain: '0', shifted: ')' }, code: 'Digit0' },
  Minus: { key: { plain: '-', shifted: '_' }, code: 'Minus' },
  Equal: { key: { plain: '=', shifted: '+' }, code: 'Equal' },

  KeyQ: { key: { plain: 'q', shifted: 'Q' }, code: 'KeyQ' },
  KeyW: { key: { plain: 'w', shifted: 'W' }, code: 'KeyW' },
  KeyE: { key: { plain: 'j', shifted: 'J' }, code: 'KeyE' },
  KeyR: { key: { plain: 'f', shifted: 'F' }, code: 'KeyR' },
  KeyT: { key: { plain: 'g', shifted: 'G' }, code: 'KeyT' },
  KeyY: { key: { plain: 'y', shifted: 'Y' }, code: 'KeyY' },
  KeyU: { key: { plain: 'p', shifted: 'P' }, code: 'KeyU' },
  KeyI: { key: { plain: 'u', shifted: 'U' }, code: 'KeyI' },
  KeyO: { key: { plain: 'l', shifted: 'L' }, code: 'KeyO' },
  KeyP: { key: { plain: ';', shifted: ':' }, code: 'KeyP' },
  BracketLeft: { key: { plain: '[', shifted: '{' }, code: 'BracketLeft' },
  BracketRight: { key: { plain: ']', shifted: '}' }, code: 'BracketRight' },
  KeyA: { key: { plain: 'a', shifted: 'A' }, code: 'KeyA' },
  KeyS: { key: { plain: 's', shifted: 'S' }, code: 'KeyS' },
  KeyD: { key: { plain: 'e', shifted: 'E' }, code: 'KeyD' },
  KeyF: { key: { plain: 't', shifted: 'T' }, code: 'KeyF' },
  KeyG: { key: { plain: 'd', shifted: 'D' }, code: 'KeyG' },
  KeyH: { key: { plain: 'h', shifted: 'H' }, code: 'KeyH' },
  KeyJ: { key: { plain: 'n', shifted: 'N' }, code: 'KeyJ' },
  KeyK: { key: { plain: 'i', shifted: 'I' }, code: 'KeyK' },
  KeyL: { key: { plain: 'o', shifted: 'O' }, code: 'KeyL' },
  Semicolon: { key: { plain: 'r', shifted: 'R' }, code: 'Semicolon' },
  Quote: { key: { plain: "'", shifted: '"' }, code: 'Quote' },
  KeyZ: { key: { plain: 'z', shifted: 'Z' }, code: 'KeyZ' },
  KeyX: { key: { plain: 'x', shifted: 'X' }, code: 'KeyX' },
  KeyC: { key: { plain: 'c', shifted: 'C' }, code: 'KeyC' },
  KeyV: { key: { plain: 'v', shifted: 'V' }, code: 'KeyV' },
  KeyB: { key: { plain: 'b', shifted: 'B' }, code: 'KeyB' },
  KeyN: { key: { plain: 'k', shifted: 'K' }, code: 'KeyN' },
  KeyM: { key: { plain: 'm', shifted: 'M' }, code: 'KeyM' },
  Comma: { key: { plain: ',', shifted: '<' }, code: 'Comma' },
  Period: { key: { plain: '.', shifted: '>' }, code: 'Period' },
  Slash: { key: { plain: '/', shifted: '?' }, code: 'Slash' }
};

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

function updateShiftState(keyData) {
  var isShifted = keyData.shiftKey != keyData.capsLock;
  shiftState = isShifted ? Shift.SHIFTED : Shift.PLAIN;
}

function isPureModifier(keyData) {
  return keyData.key == 'Shift' || keyData.key == 'Ctrl' || keyData.key == 'Alt';
}

chrome.input.ime.onKeyEvent.addListener(function(engineID, keyData) {
  var handled = false;

  updateShiftState(keyData);

  if (assetKeymap[keyData.code]) {
    // If these are not relevent keypresses, then quit early.
    if (isPureModifier(keyData) || keyData.type !== 'keydown') {
      return handled;
    }

    var emit = assetKeymap[keyData.code].key[shiftState] 
    chrome.input.ime.commitText({ contextID: contextID, text: emit });
    handled = true;
  }

  return handled;
});
