/*
Copyright 2020 Extra Keyboards for Chrome OS authors. All rights reserved.

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

var ime_api = chrome.input.ime;

var contextID = -1;

// Whether to use the third-level glyphs in the lookup table below. If the user is
// holding the right Alt (AltGr) key this will be 2, otherwise it will be 0.
var altGr = 0;
var shift = 0;

// This is a table of glyphs to output depending on the state of the keyboard
// when a certain key is pressed. The values are "unshifted", "shifted",
// "level3 unshifted", and "level3 shifted".
var lut = {
  "KeyA": ["a", "A", "ā", "Ā"],
  "KeyE": ["e", "E", "ē", "Ē"],
  "KeyI": ["i", "I", "ī", "Ī"],
  "KeyO": ["o", "O", "ō", "Ō"],
  "KeyU": ["u", "U", "ū", "Ū"],
  "Quote": ["ʻ", "\"", "'", undefined],
};


ime_api.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
});

ime_api.onBlur.addListener(() => {
    contextID = -1;
})

function updateAltGr(keyData) {
  if (keyData.code == "AltRight") {
    altGr = keyData.type == "keydown" ? 2 : 0;
  }
}

function updateShift(keyData) {
  if (keyData.shiftKey ^ keyData.capsLock) {
    shift = 1;
  } else {
    shift = 0;
  }
}

ime_api.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;

      // Right Alt is the level three switch. If it is currently pressed
      // then offset the index by 2, else leave it at zero.
      updateAltGr(keyData);
      // Need integer value of 0 for unshifted and 1 for shifted. This is used
      // as an offset in the lookup table index above.
      updateShift(keyData);

      if (keyData.type == "keydown") {
        // Only try to handle the keypress if the key is in the lookup table.
        if (lut[keyData.code]) {
          let emit = lut[keyData.code][altGr+shift];

          if (emit != null && contextID != -1) {
            ime_api.commitText({
              "contextID": contextID,
              "text": emit
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
            handled = true;
          }
        }
      }
      return handled;
});
