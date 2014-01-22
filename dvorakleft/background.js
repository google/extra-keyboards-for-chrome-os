/*
Copyright 2014 Google Inc. All rights reserved.

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
var AltGr = { PLAIN: "plain", ALTERNATE: "alternate" };
var Shift = { PLAIN: "plain", SHIFTED: "shifted" };

var contextID = -1;
var altGrState = AltGr.PLAIN;
var shiftState = Shift.PLAIN;
var lastRemappedKeyEvent = undefined;

var lut = {
"Digit1": { "plain": {"plain": "[", "shifted": "{"}, "alternate": {"plain": "", "shifted":""}, "code": "BracketLeft"},
"Digit2": { "plain": {"plain": "]", "shifted": "}"}, "alternate": {"plain": "", "shifted":""}, "code": "BracketRight"},
"Digit3": { "plain": {"plain": "/", "shifted": "?"}, "alternate": {"plain": "", "shifted":""}, "code": "Slash"},
"Digit4": { "plain": {"plain": "p", "shifted": "P"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyP"},
"Digit5": { "plain": {"plain": "f", "shifted": "F"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyF"},
"Digit6": { "plain": {"plain": "m", "shifted": "M"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyM"},
"Digit7": { "plain": {"plain": "l", "shifted": "L"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyL"},
"Digit8": { "plain": {"plain": "j", "shifted": "J"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyJ"},
"Digit9": { "plain": {"plain": "4", "shifted": "$"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit4"},
"Digit0": { "plain": {"plain": "3", "shifted": "#"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit3"},
"Minus": { "plain": {"plain": "2", "shifted": "@"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit2"},
"Equal": { "plain": {"plain": "1", "shifted": "!"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit1"},
"KeyQ": { "plain": {"plain": ";", "shifted": ":"}, "alternate": {"plain": "", "shifted":""}, "code": "Semicolon"},
"KeyW": { "plain": {"plain": "q", "shifted": "Q"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyQ"},
"KeyE": { "plain": {"plain": "b", "shifted": "B"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyB"},
"KeyR": { "plain": {"plain": "y", "shifted": "Y"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyY"},
"KeyT": { "plain": {"plain": "u", "shifted": "U"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyU"},
"KeyY": { "plain": {"plain": "r", "shifted": "R"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyR"},
"KeyU": { "plain": {"plain": "s", "shifted": "S"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyS"},
"KeyI": { "plain": {"plain": "o", "shifted": "O"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyO"},
"KeyO": { "plain": {"plain": ".", "shifted": ">"}, "alternate": {"plain": "", "shifted":""}, "code": "Period"},
"KeyP": { "plain": {"plain": "6", "shifted": "^"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit6"},
"BracketLeft": { "plain": {"plain": "5", "shifted": "%"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit5"},
"BracketRight": { "plain": {"plain": "=", "shifted": "+"}, "alternate": {"plain": "", "shifted":""}, "code": "Equal"},
"KeyA": { "plain": {"plain": "-", "shifted": "_"}, "alternate": {"plain": "", "shifted":""}, "code": "Minus"},
"KeyS": { "plain": {"plain": "k", "shifted": "K"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyK"},
"KeyD": { "plain": {"plain": "c", "shifted": "C"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyC"},
"KeyF": { "plain": {"plain": "d", "shifted": "D"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyD"},
"KeyG": { "plain": {"plain": "t", "shifted": "T"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyT"},
"KeyH": { "plain": {"plain": "h", "shifted": "H"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyH"},
"KeyJ": { "plain": {"plain": "e", "shifted": "E"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyE"},
"KeyK": { "plain": {"plain": "a", "shifted": "A"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyA"},
"KeyL": { "plain": {"plain": "z", "shifted": "Z"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyZ"},
"Semicolon": { "plain": {"plain": "8", "shifted": "*"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit8"},
"Quote": { "plain": {"plain": "7", "shifted": "&"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit7"},
"KeyZ": { "plain": {"plain": "'", "shifted": "\""}, "alternate": {"plain": "", "shifted":""}, "code": "Quote"},
"KeyX": { "plain": {"plain": "x", "shifted": "X"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyX"},
"KeyC": { "plain": {"plain": "g", "shifted": "G"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyG"},
"KeyV": { "plain": {"plain": "v", "shifted": "V"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyV"},
"KeyB": { "plain": {"plain": "w", "shifted": "W"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyW"},
"KeyN": { "plain": {"plain": "n", "shifted": "N"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyN"},
"KeyM": { "plain": {"plain": "l", "shifted": "L"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyL"},
"Comma": { "plain": {"plain": ",", "shifted": "<"}, "alternate": {"plain": "", "shifted":""}, "code": "Comma"},
"Period": { "plain": {"plain": "0", "shifted": ")"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit0"},
"Slash": { "plain": {"plain": "9", "shifted": "("}, "alternate": {"plain": "", "shifted":""}, "code": "Digit9"},
};
    

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

function updateAltGrState(keyData) {
  altGrState = (keyData.code == "AltRight") ? ((keyData.type == "keydown") ? AltGr.ALTERNATE : AltGr.PLAIN)
                                              : altGrState;
}

function updateShiftState(keyData) {
  shiftState = ((keyData.shiftKey && !(keyData.capsLock)) || (!(keyData.shiftKey) && keyData.capsLock)) ? 
                 Shift.SHIFTED : Shift.PLAIN;
}

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
}

function isRemappedEvent(keyData) {
  // hack, should check for a sender ID (to be added to KeyData)
  return lastRemappedKeyEvent != undefined &&
         (lastRemappedKeyEvent.key == keyData.key &&
          lastRemappedKeyEvent.code == keyData.code &&
          lastRemappedKeyEvent.type == keyData.type
         ); // requestID would be different so we are not checking for it  
}


chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (isRemappedEvent(keyData)) {
        lastRemappedKeyEvent = undefined;
        return handled;
      }

      updateAltGrState(keyData);
      updateShiftState(keyData);
                
      if (lut[keyData.code]) {
          var remappedKeyData = keyData;
          remappedKeyData.key = lut[keyData.code][altGrState][shiftState];
          remappedKeyData.code = lut[keyData.code].code;
        
        if (chrome.input.ime.sendKeyEvents != undefined) {
          chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [remappedKeyData]});
          handled = true;
          lastRemappedKeyEvent = remappedKeyData;
        } else if (keyData.type == "keydown" && !isPureModifier(keyData)) {
          chrome.input.ime.commitText({"contextID": contextID, "text": remappedKeyData.key});
          handled = true;
        }
      }
      
      return handled;
});