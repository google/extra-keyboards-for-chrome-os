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
var previousCharIsMagic = false;
var contextID = -1;
var lut = { "a": "à", "A": "À", "e": "è", "E": "È", "i": "ì", "I": "Ì", "o": "ò", "O": "Ò", "u": "ù", "U": "Ù", "w": "ẁ", "W": "Ẁ", "y": "ỳ", "Y": "Ỳ", "`": "`" };
var usingTeReoLayout = false;

chrome.input.ime.onFocus.addListener(function (context) {
  contextID = context.contextID;
});

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
}

chrome.input.ime.onKeyEvent.addListener(
  function (engineID, keyData) {
    if (engineID === 'uk_extended_ime') {
      var handled = false;

      if (previousCharIsMagic && keyData.type == "keydown" && !isPureModifier(keyData)) {
        previousCharIsMagic = false;
        if (lut[keyData.key]) {
          chrome.input.ime.commitText({
            "contextID": contextID,
            "text": lut[keyData.key]
          });
          handled = true;
        } else {
          chrome.input.ime.commitText({
            "contextID": contextID,
            "text": "`"
          });
        }
      }

      if (!handled && keyData.type == "keydown" && keyData.code == "Backquote" && keyData.key == "`") {
        previousCharIsMagic = true;
        handled = true;
      }

      return handled;
    }
    else if (engineID === 'english_nz') {
      // undo india keyboard map.
      if (keyData.type === 'keydown' && keyData.shiftkey && keyData.code === 'digit4') {
        chrome.input.ime.committext({ 'contextid': contextid, 'text': '$' });
        return true;
      }
      if (keyData.type === 'keydown' && keyData.altgrKey) {
        switch (keyData.key) {
          case 'a':
            chrome.input.ime.commitText({ 'contextID': contextID, 'text': 'ā' });
            return true;
          case 'e':
            chrome.input.ime.commitText({ 'contextID': contextID, 'text': 'ē' });
            return true;
          case 'i':
            chrome.input.ime.commitText({ 'contextID': contextID, 'text': 'ī' });
            return true;
          case 'o':
            chrome.input.ime.commitText({ 'contextID': contextID, 'text': 'ō' });
            return true;
          case 'u':
            chrome.input.ime.commitText({ 'contextID': contextID, 'text': 'ū' });
            return true;
          default:
            return false;
        }
      }
      return false;
    }
    else { // Te reo
      // undo india keyboard map.
      if (keyData.type === 'keydown' && keyData.shiftkey && keyData.code === 'digit4') {
        chrome.input.ime.committext({ 'contextid': contextid, 'text': '$' });
        return true;
      }

      const teReoAltGrMapping = {
        'q': 'ka',
        'w': 'wh',
        'e': 'ē',
        'y': 'ū',
        'u': 'ū',
        'i': 'ī',
        'o': 'ō',
        // row 2
        'a': 'ā',
        's': 'te',
        'd': 'ē',
        'f': 'wh',
        'g': 'ng',
        'h': 'he',
        'j': 'ī',
        'k': 'ka',
        'l': 'ō',
        // row 3,
        'z': 'ā',
        'x': 'ki',
        'c': 'ko',
        'v': 'ngā',
        'b': 'he'
      }

      const teReoMapping = {
        'q': 'ka',
        'y': 'ū',
        's': 'te',
        'd': 'ē',
        'f': 'wh',
        'g': 'ng',
        'j': 'ī',
        'l': 'ō',
        'z': 'ā',
        'x': 'ki',
        'c': 'ko',
        'v': 'ngā',
        'b': 'he'
      }

      // In both modes, the alt-gr layer is the same
      if (keyData.type === 'keydown' && keyData.altgrKey && keyData.shiftKey && teReoAltGrMapping[keyData.key.toLowerCase()]) {
        // Altgr+shift makes the keys uppercase.
        const letters = teReoAltGrMapping[keyData.key.toLowerCase()];
        chrome.input.ime.commitText({ 'contextID': contextID, 'text': letters.charAt(0).toUpperCase() + letters.slice(1) });
        return true;
      }
      else if (keyData.type === 'keydown' && keyData.altgrKey && teReoAltGrMapping[keyData.key]) {
        chrome.input.ime.commitText({ 'contextID': contextID, 'text': teReoAltGrMapping[keyData.key] });
        return true;
      }

      if (usingTeReoLayout) {
        if (keyData.type === 'keydown' && keyData.shiftKey && teReoMapping[keyData.key.toLowerCase()]) {
          // Altgr+shift makes the keys uppercase.
          const letters = teReoMapping[keyData.key.toLowerCase()];
          chrome.input.ime.commitText({ 'contextID': contextID, 'text': letters.charAt(0).toUpperCase() + letters.slice(1) });
          return true;
        }
        else if (keyData.type == 'keydown' && teReoMapping[keyData.key]) {
          chrome.input.ime.commitText({ 'contextID': contextID, 'text': teReoMapping[keyData.key] });
          return true;
        }
      }

      if (keyData.type === 'keydown' && keyData.key === '`') {
        usingTeReoLayout = !usingTeReoLayout;
        return true;
      }
      return false;
    }

  });
