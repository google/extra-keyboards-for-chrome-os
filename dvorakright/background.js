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
"Digit5": { "plain": {"plain": "j", "shifted": "J"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyJ"},
"Digit6": { "plain": {"plain": "l", "shifted": "L"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyL"},
"Digit7": { "plain": {"plain": "m", "shifted": "M"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyM"},
"Digit8": { "plain": {"plain": "f", "shifted": "F"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyF"},
"Digit9": { "plain": {"plain": "p", "shifted": "P"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyP"},
"Digit0": { "plain": {"plain": "/", "shifted": "?"}, "alternate": {"plain": "", "shifted":""}, "code": "Slash"},
"Minus": { "plain": {"plain": "[", "shifted": "{"}, "alternate": {"plain": "", "shifted":""}, "code": "BracketLeft"},
"Equal": { "plain": {"plain": "]", "shifted": "}"}, "alternate": {"plain": "", "shifted":""}, "code": "BracketRight"},
"KeyQ": { "plain": {"plain": "5", "shifted": "%"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit5"},
"KeyW": { "plain": {"plain": "6", "shifted": "^"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit6"},
"KeyE": { "plain": {"plain": "q", "shifted": "Q"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyQ"},
"KeyR": { "plain": {"plain": ".", "shifted": ">"}, "alternate": {"plain": "", "shifted":""}, "code": "Period"},
"KeyT": { "plain": {"plain": "o", "shifted": "O"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyO"},
"KeyY": { "plain": {"plain": "r", "shifted": "R"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyR"},
"KeyU": { "plain": {"plain": "s", "shifted": "S"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyS"},
"KeyI": { "plain": {"plain": "u", "shifted": "U"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyU"},
"KeyO": { "plain": {"plain": "y", "shifted": "Y"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyY"},
"KeyP": { "plain": {"plain": "b", "shifted": "B"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyB"},
"BracketLeft": { "plain": {"plain": ";", "shifted": ":"}, "alternate": {"plain": "", "shifted":""}, "code": "Semicolon"},
"BracketRight": { "plain": {"plain": "=", "shifted": "+"}, "alternate": {"plain": "", "shifted":""}, "code": "Equal"},
"KeyA": { "plain": {"plain": "7", "shifted": "&"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit7"},
"KeyS": { "plain": {"plain": "8", "shifted": "*"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit8"},
"KeyD": { "plain": {"plain": "z", "shifted": "Z"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyZ"},
"KeyF": { "plain": {"plain": "a", "shifted": "A"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyA"},
"KeyG": { "plain": {"plain": "e", "shifted": "E"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyE"},
"KeyH": { "plain": {"plain": "h", "shifted": "H"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyH"},
"KeyJ": { "plain": {"plain": "t", "shifted": "T"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyT"},
"KeyK": { "plain": {"plain": "d", "shifted": "D"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyD"},
"KeyL": { "plain": {"plain": "c", "shifted": "C"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyC"},
"Semicolon": { "plain": {"plain": "k", "shifted": "K"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyK"},
"Quote": { "plain": {"plain": "-", "shifted": "_"}, "alternate": {"plain": "", "shifted":""}, "code": "Minus"},
"KeyZ": { "plain": {"plain": "9", "shifted": "("}, "alternate": {"plain": "", "shifted":""}, "code": "Digit9"},
"KeyX": { "plain": {"plain": "0", "shifted": ")"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit0"},
"KeyC": { "plain": {"plain": "x", "shifted": "X"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyX"},
"KeyV": { "plain": {"plain": ",", "shifted": "<"}, "alternate": {"plain": "", "shifted":""}, "code": "Comma"},
"KeyB": { "plain": {"plain": "l", "shifted": "L"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyL"},
"KeyN": { "plain": {"plain": "n", "shifted": "N"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyN"},
"KeyM": { "plain": {"plain": "w", "shifted": "W"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyW"},
"Comma": { "plain": {"plain": "v", "shifted": "V"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyV"},
"Period": { "plain": {"plain": "g", "shifted": "G"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyG"},
"Slash": { "plain": {"plain": "'", "shifted": "\""}, "alternate": {"plain": "", "shifted":""}, "code": "Quote"},
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
          lastRemappedKeyEvent = remappedKeyEvent;
        } else if (keyData.type == "keydown" && !isPureModifier(keyData)) {
          chrome.input.ime.commitText({"contextID": contextID, "text": remappedKeyData.key});
          handled = true;
        }
      }
      
      return handled;
});