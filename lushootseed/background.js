/*
Copyright 2018 The Extra Keyboards for Chrome OS Authors.

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
  "KeyQ": [ "q", "q̓" ],
  "KeyW": [ "w", "w̓" ],
  "KeyE": [ "ə", "q̓ʷ" ],
  "KeyR": [ "š", "√" ],
  "KeyT": [ "t", "t̕" ],
  "KeyY": [ "y", "y̓" ],
  "KeyU": [ "u", null ],
  "KeyI": [ "i", "kʷ" ],
  "KeyO": [ "ʷ", null ],
  "KeyP": [ "p", "p̓" ],
  "KeyA": [ "a", "qʷ" ],
  "KeyS": [ "s", "S" ],
  "KeyD": [ "d", "dᶻ" ],
  "KeyF": [ "ʔ", null ],
  "KeyG": [ "g", "gʷ" ],
  "KeyH": [ "h", null ],
  "KeyJ": [ "ǰ", "k̓ʷ" ],
  "KeyK": [ "k", "k̓" ],
  "KeyL": [ "l", "l̕" ],
  "Semicolon": [ "ɬ", "ƛ̕" ],
  "KeyZ": [ "x̌", "x̌ʷ" ],
  "KeyX": [ "x", "xʷ" ],
  "KeyC": [ "c", "c̓" ],
  "KeyV": [ "č", "č̓" ],
  "KeyB": [ "b", "b̓" ],
  "KeyN": [ "n", "n̓" ],
  "KeyM": [ "m", "m̓" ],
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
