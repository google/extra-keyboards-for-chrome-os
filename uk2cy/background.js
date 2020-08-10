var context_id = -1;

chrome.input.ime.onFocus.addListener(function(context) {
  context_id = context.contextID;
});

var shifted = false;

chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    var handled = false;
    
    if (keyData.type == "keydown") {
      if (keyData.code == "AltRight") {
        if (keyData.code == "KeyA") {
          keyData.code = "\u00e2";
        }
        //keyData.code = "Enter";
        //chrome.input.ime.sendKeyEvents({"contextID": context_id, "keyData": [keyData]});
        handled = true;
      }
        // if (keyData.code == "Backslash") {
        // keyData.code = "Enter";
        // chrome.input.ime.sendKeyEvents({"contextID": context_id, "keyData": [keyData]});
        // handled = true;
        //}
      else if (keyData.key == "Shift") {
        // keyData.key = "Shift";
        // keyData.code = "ShiftLeft";
        // keyData.shiftKey = true;
        // chrome.input.ime.sendKeyEvents({"contextID": context_id, "keyData": [keyData]});
        
        shifted = true;
        handled = true;

      } else  if (shifted) {
        keyData.shiftKey = true;
        chrome.input.ime.commitText({"contextID": context_id, "text": keyData.key.toUpperCase()});
        handled = true;
      }
    } else if (keyData.type == "keyup") {
      if (keyData.code == "AltRight") {
        // keyData.key = "Shift";
        // keyData.code = "ShiftLeft";
        // chrome.input.ime.sendKeyEvents({"contextID": context_id, "keyData": [keyData]});
        
        shifted = false;
        handled = true;
      }
    }
    
    return handled;
});