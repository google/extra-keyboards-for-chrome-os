/*
Copyright 2021 The Extra Keyboards for Chrome OS Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


RuIntl cyrillic keyboard layout
Based on the Russian standard keyboard layout
The AltGr key to be used as the Compose key
Updated 2024-09-21
Version 1.3
*/

let contextID = 0;

const capsoffkeys = [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Backslash",
    "Slash"
];

//The lookup table (lut) object structure:
//  "keyData.code"    : [ "plain", "shifted", "altered", "altered&shifted" ]
const lut = {
    "Backquote"   : [ "ё", "Ё", "`", " ́" ],
    "Digit1"      : [ "1", "!", "₽", "¹" ],
    "Digit2"      : [ "2", "\"","@", "²" ],
    "Digit3"      : [ "3", "#", "№", "³" ],
    "Digit4"      : [ "4", ";", "$", "¤" ],
    "Digit5"      : [ "5", "%", "€", "£" ],
    "Digit6"      : [ "6", ":", "^", "¼" ],
    "Digit7"      : [ "7", "?", "&", "½" ],
    "Digit8"      : [ "8", "*", "~", "¾" ],
    "Digit9"      : [ "9", "(", "«", "±" ],
    "Digit0"      : [ "0", ")", "»", "™" ],
    "Minus"       : [ "-", "_", "¥", "₴" ],
    "Equal"       : [ "=", "+", "×", "÷" ],
    "KeyQ"        : [ "й", "Й",  "",  "" ],
    "KeyW"        : [ "ц", "Ц", "џ", "Џ" ],
    "KeyE"        : [ "у", "У",  "",  "" ],
    "KeyR"        : [ "к", "К", "¶", "®" ],
    "KeyT"        : [ "е", "Е", "є", "Є" ],
    "KeyY"        : [ "н", "Н", "њ", "Њ" ],
    "KeyU"        : [ "г", "Г", "ґ", "Ґ" ],
    "KeyI"        : [ "ш", "Ш", "ї", "Ї" ],
    "KeyO"        : [ "щ", "Щ", "ў", "Ў" ],
    "KeyP"        : [ "з", "З",  "",  "" ],
    "BracketLeft" : [ "х", "Х", "{", "“" ],
    "BracketRight": [ "ъ", "Ъ", "}", "”" ],
    "Backslash"   : [ "/", "\\", "|", "¬" ],
    "KeyA"        : [ "ф", "Ф",  "",  "" ],
    "KeyS"        : [ "ы", "Ы", "§", "§" ],
    "KeyD"        : [ "в", "В",  "",  "" ],
    "KeyF"        : [ "а", "А",  "", "ª" ],
    "KeyG"        : [ "п", "П", "Ω",  "" ],
    "KeyH"        : [ "р", "Р",  "",  "" ],
    "KeyJ"        : [ "о", "О", "j", "J" ],
    "KeyK"        : [ "л", "Л", "љ", "Љ" ],
    "KeyL"        : [ "д", "Д", "ђ", "Ђ" ],
    "Semicolon"   : [ "ж", "Ж", "[", "‘" ],
    "Quote"       : [ "э", "Э", "]", "’" ],
    "KeyZ"        : [ "я", "Я", "s", "S" ],
    "KeyX"        : [ "ч", "Ч", "ћ", "Ћ" ],
    "KeyC"        : [ "с", "С", "¢", "©" ],
    "KeyV"        : [ "м", "М", "↓", "↑" ],
    "KeyB"        : [ "и", "И", "i", "I" ],
    "KeyN"        : [ "т", "Т",  "",  "" ],
    "KeyM"        : [ "ь", "Ь", "µ", "º" ],
    "Comma"       : [ "б", "Б", "<", "←" ],
    "Period"      : [ "ю", "Ю", ">", "→" ],
    "Slash"       : [ ".", ",", "'", "°" ],
    "Space"       : [ " ", " ", "\u00a0", "\u00a0" ],
};

let altstate = false;

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
      let handled = false;

      if ((keyData.type == "keydown") && (keyData.code == "AltRight")) {
          if (altstate == false) {
              altstate = true;
          }
      }

      if (keyData.type == "keydown" && keyData.altKey == false && keyData.ctrlKey == false) {

          if (lut[keyData.code]) {
            let modified = (keyData.shiftKey != keyData.capsLock) + 2 * altstate;
            if (capsoffkeys.includes(keyData.code)) {
              modified = keyData.shiftKey + 2 * altstate;
            }
              
            let emit = lut[keyData.code][modified];
            altstate = false;
              
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
