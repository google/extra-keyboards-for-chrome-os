let layout = {
  "Digit3": ["3", "ё"],
  "Digit4": ["4", "Ё"],
  "Digit5": ["5", "ъ"],
  "Digit6": ["6", "Ъ"],
  "Equal": ["ч", "Ч"],
  "KeyQ": ["я", "Я"],
  "KeyW": ["в", "В"],
  "KeyE": ["е", "Е", "ё", "Ё"],
  "KeyR": ["р", "Р"],
  "KeyT": ["т", "Т"],
  "KeyY": ["ы", "Ы"],
  "KeyU": ["у", "У", "ў", "Ў"],
  "KeyI": ["і", "І", "и", "И"],
  "KeyO": ["о", "О"],
  "KeyP": ["п", "П"],
  "BracketLeft": ["ш", "Ш"],
  "BracketRight": ["ў", "Ў", "щ", "Щ"],
  "KeyA": ["а", "А"],
  "KeyS": ["с", "С"],
  "KeyD": ["д", "Д"],
  "KeyF": ["ф", "Ф"],
  "KeyG": ["г", "Г"],
  "KeyH": ["х", "Х"],
  "KeyJ": ["й", "Й"],
  "KeyK": ["к", "К"],
  "KeyL": ["л", "Л"],
  "Backquote": ["ю", "Ю"],
  "Backslash": ["э", "Э"],
  "KeyZ": ["з", "З"],
  "KeyX": ["ь", "Ь", "ъ", "Ъ"],
  "KeyC": ["ц", "Ц"],
  "KeyV": ["ж", "Ж"],
  "KeyB": ["б", "Б"],
  "KeyN": ["н", "Н"],
  "KeyM": ["м", "М"],
};

let ime = chrome.input.ime;

let contextID = 0;
ime.onFocus.addListener(function (context) {
  contextID = context.contextID;
});
ime.onBlur.addListener(function () {
  contextID = 0;
});

function emitKey(emit) {
  if (contextID == 0) {
    return false;
  }
  ime.commitText({
    "contextID": contextID,
    "text": emit,
  });
  return true;
}

let altGr = false;
function mappingFn(engineID, keyData) {
  if (keyData.code == "AltRight") {
    altGr = (keyData.type == "keydown");
    return false;
  }

  let keys = layout[keyData.code];
  if (keyData.type != "keydown" || !keys) {
    return false;
  }

  let shifted = (keyData.shiftKey ^ keyData.capsLock);
  if (keys.length > 2 && altGr) {
    shifted += 2;
  }
  return emitKey(keys[shifted]);
}
ime.onKeyEvent.addListener(mappingFn);
