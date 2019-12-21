/*
Copyright 2019 the Extra Keyboard project Authors. All rights reserved.

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

var contextID = 0;

var lut = {
  "Backquote":      [ "ई", "ञ" ],
  "Digit1":         [ "ज्ञ", "१" ],
  "Digit2":         [ "घ", "२" ],
  "Digit3":         [ "ङ", "३" ],
  "Digit4":         [ "झ", "४" ],
  "Digit5":         [ "छ", "५" ],
  "Digit6":         [ "ट", "६" ],
  "Digit7":         [ "ठ", "७" ],
  "Digit8":         [ "ड", "८" ],
  "Digit9":         [ "ढ", "९" ],
  "Digit0":         [ "ण", "०" ],
  "Minus":          [ "(", ")" ]
  "Equal":          [ ".", "ं" ],
  "KeyQ":           [ "ौ", "ो" ],
  "KeyW":           [ "ध", "ध्" ],
  "KeyE":           [ "भ", "भ्" ],
  "KeyR":           [ "च", "च्" ],
  "KeyT":           [ "त", "त्" ],
  "KeyY":           [ "थ", "थ्" ],
  "KeyU":           [ "ग", "ग्" ],
  "KeyI":           [ "ष", "क्ष" ],
  "KeyO":           [ "य", "इ" ],
  "KeyP":           [ "उ", "ए" ],
  "BracketLeft":    [ "ृ", "र्" ],
  "BracketRight":   [ "े", "ै" ],
  "Backslash":      [ "्र", "्" ],
  "KeyA":           [ "ब", "ब्" ],
  "KeyS":           [ "क", "क्" ],
  "KeyD":           [ "म", "म्" ],
  "KeyF":           [ "ा", "ँ" ],
  "KeyG":           [ "न", "न्" ],
  "KeyH":           [ "ज", "ज्" ],
  "KeyJ":           [ "व", "व्" ],
  "KeyK":           [ "प", "प्" ],
  "KeyL":           [ "ि", "ी" ],
  "Semicolon":      [ "स", "स्" ],
  "Quote":          [ "ु", "ू" ],
  "KeyZ":           [ "श", "श्" ],
  "KeyX":           [ "ह", "ह्" ],
  "KeyC":           [ "अ", "आ" ],
  "KeyV":           [ "ख", "ख्" ],
  "KeyB":           [ "द", "द्" ],
  "KeyN":           [ "ल", "ल्" ],
  "KeyM":           [ "फ", "ः" ],
  "Comma":          [ ",", "?" ],
  "Period":         [ "।", "श्र" ],
  "Slash":          [ "र", "रू" ],
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})


// TODO: Add support for virtual keyboard input.

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (keyData.type == "keydown") {
        if (lut[keyData.code]) {
          let shifted = keyData.capsLock ^ keyData.shiftKey;
          let emit = lut[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
