let ime = chrome.input.ime;

// Basic stuff required for ChromeOS input method extension to
// work. We need to track contextID and we need to deal with ChromeOS
// deactivating extensions.

// This is a common and simplest way of preventing ChromeOS from
// deactivating our background worker.
setInterval(() => {
  chrome.runtime.getPlatformInfo(() => {});
}, 15000);

let contextID = 0;
// We do try to recover contextID if extension is reloaded. This is
// partially controversial, because contextID values are
// ephemeral. But it looks like lesser evil then alternatives.
chrome.storage.local.get(['contextID'], (result) => {
  if (result.contextID) {
    contextID = result.contextID;
    console.log("Restored Context ID:", contextID);
  }
});

function saveContextID(newValue) {
  contextID = newValue;
  chrome.storage.local.set({
    contextID: newValue
  });
}
// Focus and Blur events is how contextID is given to us.
ime.onFocus.addListener(function (context) {
  saveContextID(context.contextID);
});
ime.onBlur.addListener(function () {
  saveContextID(0);
});

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

function emitChar(emit) {
  if (contextID == 0) {
    return false;
  }
  ime.commitText({
    "contextID": contextID,
    "text": emit,
  }).catch(function (error) {
    console.error("commit", error);
  });
  return true;
}

function mappingFn(engineID, keyData) {
  // Note, we use us(algr-intl) as base layout in manifest. This
  // "converts" right-alt into altGr and lets us use it as compose key
  // with minimal surprises.
  let altGr = keyData.altgrKey;

  let keys = layout[keyData.code];
  if (keyData.type != "keydown" || !keys) {
    return false;
  }

  let shifted = keyData.shiftKey ^ 0;

  // caps lock negates shift key as usual. But only for "letter" keys.
  if (keyData.capsLock && keys[0].toUpperCase() == keys[1]) {
    shifted = shifted ^ 1;
  }

  // For some keys we have 4 levels. E.g. cyrillic е becomes ё when
  // typed with compose key (altgr, aka right-alt). So we check if we
  // have 4 levels and if we have altgr pressed.
  if (keys.length > 2 && altGr) {
    shifted += 2;
  }

  return emitChar(keys[shifted]);
}
ime.onKeyEvent.addListener(mappingFn);
