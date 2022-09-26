/*
Copyright 2022 The Extra Keyboards for Chrome OS Authors.

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

var colemakDH = {
  "KeyQ": [ "q", "Q" ],
  "KeyW": [ "w", "W" ],
  "KeyE": [ "f", "F" ],
  "KeyR": [ "p", "P" ],
  "KeyT": [ "b", "B" ],
  "KeyY": [ "j", "J" ],
  "KeyU": [ "l", "L" ],
  "KeyI": [ "u", "U" ],
  "KeyO": [ "y", "Y" ],
  "KeyP": [ "'", "\"" ],
  "KeyA": [ "a", "A" ],
  "KeyS": [ "r", "R" ],
  "KeyD": [ "s", "S" ],
  "KeyF": [ "t", "T" ],
  "KeyG": [ "g", "G" ],
  "KeyH": [ "m", "M" ],
  "KeyJ": [ "n", "N" ],
  "KeyK": [ "e", "E" ],
  "KeyL": [ "i", "I" ],
  "Semicolon": [ "o", "O" ],
  "Quote": [ ";", ":" ],
  "KeyZ": [ "z", "Z" ],
  "KeyX": [ "x", "X" ],
  "KeyC": [ "c", "C" ],
  "KeyV": [ "d", "D" ],
  "KeyB": [ "v", "V" ],
  "KeyN": [ "k", "K" ],
  "KeyM": [ "h", "H" ],
};

chrome.input.ime.onFocus.addListener(
  function(context) {
    contextID = context.contextID;
  }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})

chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    var handled = false;

    if (keyData.type == "keydown") {
      if (colemakDH[keyData.code]) {
        let shifted = keyData.capsLock ^ keyData.shiftKey;
        let emit = colemakDH[keyData.code][shifted];

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
  }
);
