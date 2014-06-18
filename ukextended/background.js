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
var lut = {"a": "à", "A": "À", "e": "è", "E": "È", "i": "ì", "I":"Ì", "o": "ò", "O":"Ò", "u":"ù", "U":"Ù", "w":"ẁ", "W":"Ẁ", "y":"ỳ", "Y":"Ỳ", "`": "`"};

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
}

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (previousCharIsMagic && keyData.type == "keydown" && !isPureModifier(keyData)) {
        previousCharIsMagic = false;
        if (lut[keyData.key]) {
          chrome.input.ime.commitText({"contextID": contextID,
                                   "text": lut[keyData.key]});
          handled = true;
        } else {
          chrome.input.ime.commitText({"contextID": contextID,
                                   "text": "`"});
        }
      }
      
      if (!handled && keyData.type == "keydown" && keyData.code == "Backquote" && keyData.key =="`") {
        previousCharIsMagic = true;
        handled = true;
      }
      
      return handled;
});
