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
var deadKeyRegister = undefined;
var lastRemappedKeyEvent = undefined;

var lut ={
"Backquote": { "plain": {"plain": "$", "shifted": "#"}, "alternate": {"plain": "–", "shifted":"¶"}, "code": "#N/A"},
"Digit1": { "plain": {"plain": "\"", "shifted": "1"}, "alternate": {"plain": "—", "shifted":"„"}, "code": "#N/A"},
"Digit2": { "plain": {"plain": "«", "shifted": "2"}, "alternate": {"plain": "<", "shifted":"“"}, "code": "#N/A"},
"Digit3": { "plain": {"plain": "»", "shifted": "3"}, "alternate": {"plain": ">", "shifted":"”"}, "code": "#N/A"},
"Digit4": { "plain": {"plain": "(", "shifted": "4"}, "alternate": {"plain": "[", "shifted":"≤"}, "code": "#N/A"},
"Digit5": { "plain": {"plain": ")", "shifted": "5"}, "alternate": {"plain": "]", "shifted":"≥"}, "code": "#N/A"},
"Digit6": { "plain": {"plain": "@", "shifted": "6"}, "alternate": {"plain": "^", "shifted":""}, "code": "#N/A"},
"Digit7": { "plain": {"plain": "+", "shifted": "7"}, "alternate": {"plain": "±", "shifted":"¬"}, "code": "#N/A"},
"Digit8": { "plain": {"plain": "-", "shifted": "8"}, "alternate": {"plain": "−", "shifted":"¼"}, "code": "Minus"},
"Digit9": { "plain": {"plain": "/", "shifted": "9"}, "alternate": {"plain": "÷", "shifted":"½"}, "code": "Slash"},
"Digit0": { "plain": {"plain": "*", "shifted": "0"}, "alternate": {"plain": "×", "shifted":"¾"}, "code": "Minus"},
"Minus": { "plain": {"plain": "=", "shifted": "°"}, "alternate": {"plain": "≠", "shifted":"′"}, "code": "Equal"},
"Equal": { "plain": {"plain": "%", "shifted": "`"}, "alternate": {"plain": "‰", "shifted":"″"}, "code": "#N/A"},
"KeyQ": { "plain": {"plain": "b", "shifted": "B"}, "alternate": {"plain": "|", "shifted":"¦"}, "code": "KeyB"},
"KeyW": { "plain": {"plain": "é", "shifted": "É"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyE": { "plain": {"plain": "p", "shifted": "P"}, "alternate": {"plain": "&", "shifted":"§"}, "code": "KeyP"},
"KeyR": { "plain": {"plain": "o", "shifted": "O"}, "alternate": {"plain": "œ", "shifted":"Œ"}, "code": "KeyO"},
  "KeyT": { "plain": {"plain": "è", "shifted": "È"}, "alternate": {"plain": "", "shifted":"`"}, "code": "#N/A"},
  "KeyY": { "plain": {"plain": function() { return deadKey("^");}, "shifted": "!"}, "alternate": {"plain": "¡", "shifted":""}, "code": "#N/A"},
"KeyU": { "plain": {"plain": "v", "shifted": "V"}, "alternate": {"plain": "", "shifted":""}, "code": ""},
"KeyI": { "plain": {"plain": "d", "shifted": "D"}, "alternate": {"plain": "ð", "shifted":"Ð"}, "code": "KeyD"},
"KeyO": { "plain": {"plain": "l", "shifted": "L"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyL"},
"KeyP": { "plain": {"plain": "j", "shifted": "J"}, "alternate": {"plain": "ĳ", "shifted":"Ĳ"}, "code": "KeyJ"},
"BracketLeft": { "plain": {"plain": "z", "shifted": "Z"}, "alternate": {"plain": "ə", "shifted":"Ə"}, "code": "KeyZ"},
"BracketRight": { "plain": {"plain": "w", "shifted": "W"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyW"},
"Backslash": { "plain": {"plain": "ç", "shifted": "Ç"}, "alternate": {"plain": "", "shifted":""}, "code": "#N/A"},
"KeyA": { "plain": {"plain": "a", "shifted": "A"}, "alternate": {"plain": "æ", "shifted":"Æ"}, "code": "KeyA"},
"KeyS": { "plain": {"plain": "u", "shifted": "U"}, "alternate": {"plain": "ù", "shifted":"Ù"}, "code": "KeyU"},
  "KeyD": { "plain": {"plain": "i", "shifted": "I"}, "alternate": {"plain": function() { return deadKey("¨");}, "shifted":""}, "code": "KeyI"},
"KeyF": { "plain": {"plain": "e", "shifted": "E"}, "alternate": {"plain": "€", "shifted":""}, "code": "KeyE"},
"KeyG": { "plain": {"plain": ",", "shifted": ";"}, "alternate": {"plain": "’", "shifted":""}, "code": "Comma"},
"KeyH": { "plain": {"plain": "c", "shifted": "C"}, "alternate": {"plain": "©", "shifted":"ſ"}, "code": "KeyC"},
"KeyJ": { "plain": {"plain": "t", "shifted": "T"}, "alternate": {"plain": "þ", "shifted":"Þ"}, "code": "KeyT"},
"KeyK": { "plain": {"plain": "s", "shifted": "S"}, "alternate": {"plain": "ß", "shifted":"ẞ"}, "code": "KeyS"},
"KeyL": { "plain": {"plain": "r", "shifted": "R"}, "alternate": {"plain": "®", "shifted":"™"}, "code": "KeyR"},
"Semicolon": { "plain": {"plain": "n", "shifted": "N"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyN"},
"Quote": { "plain": {"plain": "m", "shifted": "M"}, "alternate": {"plain": "", "shifted":"º"}, "code": "KeyM"},
"IntlBackslash": { "plain": {"plain": "ê", "shifted": "Ê"}, "alternate": {"plain": "/", "shifted":""}, "code": ""},
"KeyZ": { "plain": {"plain": "à", "shifted": "À"}, "alternate": {"plain": "\\", "shifted":""}, "code": "#N/A"},
"KeyX": { "plain": {"plain": "y", "shifted": "Y"}, "alternate": {"plain": "{", "shifted":"‘"}, "code": "KeyY"},
"KeyC": { "plain": {"plain": "x", "shifted": "X"}, "alternate": {"plain": "}", "shifted":"’"}, "code": "KeyX"},
"KeyV": { "plain": {"plain": ".", "shifted": ":"}, "alternate": {"plain": "…", "shifted":"·"}, "code": "Period"},
"KeyB": { "plain": {"plain": "k", "shifted": "K"}, "alternate": {"plain": "~", "shifted":""}, "code": "KeyK"},
"KeyN": { "plain": {"plain": "'", "shifted": "?"}, "alternate": {"plain": "¿", "shifted":""}, "code": "Quote"},
"KeyM": { "plain": {"plain": "q", "shifted": "Q"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyQ"},
"Comma": { "plain": {"plain": "g", "shifted": "G"}, "alternate": {"plain": "", "shifted":""}, "code": "KeyG"},
"Period": { "plain": {"plain": "h", "shifted": "H"}, "alternate": {"plain": "†", "shifted":"‡"}, "code": "KeyH"},
"Slash": { "plain": {"plain": "f", "shifted": "F"}, "alternate": {"plain": "", "shifted":"ª"}, "code": "KeyF"},
"Space": { "plain": {"plain": " ", "shifted": "\u00a0"}, "alternate": {"plain": "_", "shifted":"\u202f"}, "code": "#N/A"},
};

var deadKeysCombos = 
{
"~": { "a": "ã", "A": "Ã", "n": "ñ", "N": "Ñ", "o": "õ", "O": "Õ", "u": "ũ", "U": "Ũ", "y": "ỹ", "Y": "Ỹ", "i": "ĩ", "I": "Ĩ", },
"`": { "u": "ù", "U": "Ù", "y": "ý", "Y": "Ý", "o": "ò", "O": "Ò", "e": "è", "E": "È", "a": "à", "A": "À", "p": "ṕ", "P": "Ṕ", "i": "ì", "I": "Ì", "`": "`", },
"´": { "u": "ú", "U": "Ú", "y": "ý", "Y": "Ý", "o": "ó", "O": "Ó", "e": "é", "E": "É", "a": "á", "A": "Á", "p": "ṕ", "P": "Ṕ", "´": "´", },
"^": { "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "a": "â", "A": "Â", "e": "ê", "E": "Ê", "i": "î", "I": "Î", "o": "ô", "O": "Ô", "u": "û", "U": "Û", "^": "^", },
"¨": { "a": "ä", "A": "Ä", "e": "ë", "E": "Ë", "i": "ï", "I": "Ï", "o": "ö", "O": "Ö", "u": "ü", "U": "Ü", "y": "ÿ", "Y": "Ÿ", "¨": "¨", },
};

var functionKeysCodes = ["Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "HistoryBack", "HistoryForward", "BrowserRefresh", "ChromeOSFullscreen", "ChromeOSSwitchWindow", "BrightnessDown", "BrightnessUp", "VolumeMute", "AudioVolumeDown", "AudioVolumeUp", "Power"];
var modifierKeysCodes = ["ShiftLeft", "ControlLeft", "AltLeft", "AltRight", "ControlRight", "ShiftRight"];

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(function(context) {
  contextID = -1;
});

function updateAltGrState(keyData) {
  altGrState = (keyData.code == "AltRight") ? ((keyData.type == "keydown") ? AltGr.ALTERNATE : AltGr.PLAIN)
                                              : altGrState;
}

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
  //return (modifierKeysCodes.indexOf(keyData.code) != -1);
}

function isFunctionKey(keyData) {
  return (functionKeysCodes.indexOf(keyData.code) != -1);
}

function deadKey(standaloneGlyph) {
  return standaloneGlyph;
}

function isRemappedEvent(keyData) {  
  // hack, should check for a sender ID (to be added to KeyData)
  return lastRemappedKeyEvent != undefined &&
         (lastRemappedKeyEvent.key == keyData.key &&
          lastRemappedKeyEvent.code == keyData.code &&
          lastRemappedKeyEvent.type == keyData.type
         ); // requestID would be different so we are not checking for it  
}

// keyboard shortcuts are currently killed...
function dispatchKeyEvents(keyData) {
  var handled = false;
  
  if (chrome.input.ime.sendKeyEvents != undefined) {
    chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
     handled = true;
     lastRemappedKeyEvent = keyData;                                                                   
  } else if (keyData.type == "keydown" && !isPureModifier(keyData)) {
     chrome.input.ime.commitText({"contextID": contextID, "text": keyData.key});
     handled = true;
  }
    
  return handled;
}

function isUnravellingKeyEvent(keyData) {
  return !(isPureModifier(keyData) || isFunctionKey(keyData));
} 

function unravelPendingDeadKey() {
  if (deadKeyRegister == undefined) return;
  
  deadKeyRegister.type = "keydown";
  dispatchKeyEvents(deadKeyRegister);
  deadKeyRegister = undefined;
}


function remapKeyData(keyData) {
  var handled = false;
  
  if (isRemappedEvent(keyData)) {
    lastRemappedKeyEvent = undefined;
    return handled;
  }
  
  if (lut[keyData.code]) {
   var remappedKeyData = keyData;
   remappedKeyData.key = lut[keyData.code][altGrState][shiftState];
   remappedKeyData.code = lut[keyData.code].code;
  
   handled = true;
      
    
   if (deadKeyRegister != undefined) {
     if (typeof(remappedKeyData.key) == "function") {  
       if (remappedKeyData.type == "keyup") return true;
       remappedKeyData.key = remappedKeyData.key();
     }
    
     if (deadKeysCombos[deadKeyRegister.key][remappedKeyData.key]) {
         remappedKeyData.key = deadKeysCombos[deadKeyRegister.key][remappedKeyData.key];
     } else {
       unravelPendingDeadKey();
     }
     
     handled = dispatchKeyEvents(remappedKeyData);
     deadKeyRegister = undefined;
   } else {
     if (typeof(remappedKeyData.key) == "function") {
        if (remappedKeyData.type == "keyup") return true;
        remappedKeyData.key = remappedKeyData.key();
        deadKeyRegister = remappedKeyData;
        handled = true;
     } else {
        handled = dispatchKeyEvents(remappedKeyData);
     }
   }
 } else if (isUnravellingKeyEvent(keyData)) {
   unravelPendingDeadKey();
 }
  
 return handled;
}


function handleKeyEvent(engineID, keyData) {
      updateAltGrState(keyData);
      updateShiftState(keyData);
      return remapKeyData(keyData);
};

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      return handleKeyEvent(engineID, keyData);
});
