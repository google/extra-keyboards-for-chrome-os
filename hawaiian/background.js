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

// This is a table of glyphs to output depending on the state of the keyboard
// when a certain key is pressed. The values are "unshifted", "shifted",
// "level3 unshifted", and "level3 shifted".
var lut = {
  "KeyA": ["a", "A", "ā", "Ā"],
  "KeyE": ["a", "A", "ē", "Ē"],
  "KeyI": ["a", "A", "ī", "Ī"],
  "KeyO": ["a", "A", "ō", "Ō"],
  "KeyU": ["a", "A", "ū", "Ū"],
  "Quote": ["ʻ", "\"", "'"],
};
    

ime_api.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
});

ime_api.onBlur.addListener(() => {
    contextID = -1;
})

ime_api.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;

      if (keyData.type == "keydown") {
        // Only try to handle the keypress if the key is in the lookup table.
        if (lut[keyData.code]) {
          // Right Alt is the level three switch. If it is currently pressed
          // then offset the index by 2, else leave it at zero.
          let level3 = (keyData.code == "AltRight") ? 2 : 0;

          // Need integer value of 0 for unshifted and 1 for shifted. This is used
          // as an offset in the lookup table index above.
          let shifted = keyData.capsLock ^ keyData.shiftKey;

          let emit = lut[keyData.code][level3+shifted];

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
