/*
RuIntl latin keyboard layout
Based on the English standard keyboard layout
The AltGr key to be used as the Compose key
Denis Kaliberov <denis_kaliberov@mail.ru>
Updated 2024-09-05
Version 1.2
*/

var contextID = 0;

const keys = [
    "Backquote",
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
    "BracketLeft",
    "BracketRight",
    "Backslash",
    "Semicolon",
    "Quote",
    "Period",
    "Slash"
];

const lut = {
    "Backquote"       : [ "dead_grave", "dead_acute", "`", " ́" ],
    "Digit1"          : [ "1", "!", "¡", "¹" ],
    "Digit2"          : [ "2", "\"","@", "²" ],
    "Digit3"          : [ "3", "#", "¿", "³" ],
    "Digit4"          : [ "4", ";", "$", "¤" ],
    "Digit5"          : [ "5", "%", "€", "£" ],
    "Digit6"          : [ "6", ":", "^", "¼" ],
    "Digit7"          : [ "7", "?", "&", "½" ],
    "Digit8"          : [ "8", "*", "~", "¾" ],
    "Digit9"          : [ "9", "(", "«", "±" ],
    "Digit0"          : [ "0", ")", "»", "™" ],
    "Minus"           : [ "-", "_", "¥", "dead_abovering" ],
    "Equal"           : [ "=", "+", "×", "÷" ],
    "KeyQ"            : [ "q", "Q", "ä", "Ä" ],
    "KeyW"            : [ "w", "W", "å", "Å" ],
    "KeyE"            : [ "e", "E", "é", "É" ],
    "KeyR"            : [ "r", "R", "¶", "®" ],
    "KeyT"            : [ "t", "T", "þ", "Þ" ],
    "KeyY"            : [ "y", "Y", "ü", "Ü" ],
    "KeyU"            : [ "u", "U", "ú", "Ú" ],
    "KeyI"            : [ "i", "I", "í", "Í" ],
    "KeyO"            : [ "o", "O", "ó", "Ó" ],
    "KeyP"            : [ "p", "P", "ö", "Ö" ],
    "BracketLeft"     : [ "dead_circumflex", "dead_diaeresis", "{", "“" ],
    "BracketRight"    : [ "dead_tilde", "dead_macron", "}", "”" ],
    "Backslash"       : [ "/", "\\", "|", "¬" ],
    "KeyA"            : [ "a", "A", "á", "Á" ],
    "KeyS"            : [ "s", "S", "ß", "§" ],
    "KeyD"            : [ "d", "D", "ð", "Ð" ],
    "KeyF"            : [ "f", "F",  "", "ª" ],
    "KeyG"            : [ "g", "G", "Ω",  "" ],
    "KeyH"            : [ "h", "H", "ħ", "Ħ" ],
    "KeyJ"            : [ "j", "J", "ø", "Ø" ],
    "KeyK"            : [ "k", "K", "œ", "Œ" ],
    "KeyL"            : [ "l", "L", "ł", "Ł" ],
    "Semicolon"       : [ "dead_cedilla", "dead_ogonek", "[", "‘" ],
    "Quote"           : [ "dead_doubleacute", "dead_breve", "]", "’" ],
    "KeyZ"            : [ "z", "Z", "æ", "Æ" ],
    "KeyX"            : [ "x", "X",  "",  "" ],
    "KeyC"            : [ "c", "C", "¢", "©" ],
    "KeyV"            : [ "v", "V", "↓", "↑" ],
    "KeyB"            : [ "b", "B", "ĳ", "Ĳ" ],
    "KeyN"            : [ "n", "N", "ñ", "Ñ" ],
    "KeyM"            : [ "m", "M", "µ", "º" ],
    "Comma"           : [ "ç", "Ç", "<", "←" ],
    "Period"          : [ "dead_abovedot", "dead_caron", ">", "→" ],
    "Slash"           : [ ".", ",", "'", "°" ],
    "Space"           : [ " ", " ", "\u00a0", "\u00a0" ],
};

const deadkeys = {
    "dead_acute"      : { "u": "ú", "U": "Ú", "y": "ý", "Y": "Ý", "o": "ó", "O": "Ó", "e": "é", "E": "É",
                          "a": "á", "A": "Á", "n": "ń", "N": "Ń", "i": "í", "I": "Í", "w": "ẃ", "W": "Ẃ",
                          " ": " ́", "z": "ź", "Z": "Ź", "r": "ŕ", "R": "Ŕ", "m": "ḿ", "M": "Ḿ", "p": "ṕ",
                          "P": "Ṕ", "s": "ś", "S": "Ś", "g": "ǵ", "G": "Ǵ", "k": "ḱ", "K": "Ḱ", "l": "ĺ",
                          "L": "Ĺ", "c": "ć", "C": "Ć", },
    "dead_grave"      : { "u": "ù", "U": "Ù", "y": "ỳ", "Y": "Ỳ", "o": "ò", "O": "Ò", "e": "è", "E": "È",
                          "a": "à", "A": "À", "n": "ǹ", "N": "Ǹ", "i": "ì", "I": "Ì", "w": "ẁ", "W": "Ẁ",
                          " ": "`", },
    "dead_diaeresis"  : { "u": "ü", "U": "Ü", "y": "ÿ", "Y": "Ÿ", "o": "ö", "O": "Ö", "e": "ë", "E": "Ë",
                          "a": "ä", "A": "Ä", "i": "ï", "I": "Ï", "w": "ẅ", "W": "Ẅ", " ": "¨", },
    "dead_tilde"      : { "u": "ũ", "U": "Ũ", "y": "ỹ", "Y": "Ỹ", "o": "õ", "O": "Õ", "e": "ẽ", "E": "Ẽ",
                          "a": "ã", "A": "Ã", "n": "ñ", "N": "Ñ", "i": "ĩ", "I": "Ĩ", " ": "~", },
    "dead_circumflex" : { "u": "û", "U": "Û", "y": "ŷ", "Y": "Ŷ", "o": "ô", "O": "Ô", "e": "ê", "E": "Ê",
                          "a": "â", "A": "Â", "i": "î", "I": "Î", "w": "ŵ", "W": "Ŵ", " ": "^",
                          "z": "ẑ", "Z": "Ẑ", "s": "ŝ", "S": "Ŝ", "g": "ĝ", "G": "Ĝ", "c": "ĉ", "C": "Ĉ", },
    "dead_breve"      : { "u": "ŭ", "U": "Ŭ", "o": "ŏ", "O": "Ŏ", "e": "ĕ", "E": "Ĕ", "a": "ă", "A": "Ă",
                          "g": "ğ", "G": "Ğ", "i": "ĭ", "I": "Ĭ", " ": "˘", },
    "dead_caron"      : { "u": "ǔ", "U": "Ǔ", "o": "ǒ", "O": "Ǒ", "e": "ě", "E": "Ě", "a": "ǎ", "A": "Ǎ",
                          "n": "ň", "N": "Ň", "i": "ǐ", "I": "Ǐ", " ": "ˇ", "z": "ž", "Z": "Ž", "r": "ř",
                          "R": "Ř", "s": "š", "S": "Š", "g": "ǧ", "G": "Ǧ", "k": "ǩ", "K": "Ǩ", "l": "ľ",
                          "L": "Ľ", "c": "č", "C": "Č", },    
    "dead_doubleacute": { "u": "ű", "U": "Ű", "o": "ő", "O": "Ő", " ": "˝", },
    "dead_ogonek"     : { "u": "ų", "U": "Ų", "o": "ǫ", "O": "Ǫ", "e": "ę", "E": "Ę", "a": "ą", "A": "Ą",
                          "i": "į", "I": "Į", " ": "˛", },
    "dead_macron"     : { "u": "ū", "U": "Ū", "y": "ȳ", "Y": "Ȳ", "o": "ō", "O": "Ō", "e": "ē", "E": "Ē",
                          "a": "ā", "A": "Ā", "i": "ī", "I": "Ī", " ": "¯", },
    "dead_abovedot"   : { "y": "ẏ", "Y": "Ẏ", "o": "ȯ", "O": "Ȯ", "e": "ė", "E": "Ė", "a": "ȧ", "A": "Ȧ",
                          "n": "ṅ", "N": "Ṅ", "i": "ı", "I": "İ", "w": "ẇ", "W": "Ẇ", " ": "˙",
                          "z": "ż", "Z": "Ż", "r": "ṙ", "R": "Ṙ", "m": "ṁ", "M": "Ṁ", "p": "ṗ", "P": "Ṗ",
                          "s": "ṡ", "S": "Ṡ", "g": "ġ", "G": "Ġ", "c": "ċ", "C": "Ċ", },
    "dead_abovering"  : { "u": "ů", "U": "Ů", "y": "ẙ", "a": "å", "A": "Å", "w": "ẘ", " ": "°", },
    "dead_cedilla"    : { "c": "ç", "C": "Ç", "s": "ş", "S": "Ş", "t": "ţ", "T": "Ţ", " ": "¸", },
};

var altstate = false;
var deadkey = null;

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
      var handled = false;

      if ((keyData.type == "keydown") && (keyData.code == "AltRight")) {
          if (altstate == false) {
              altstate = true;
          }
      }

      if (keyData.type == "keydown" && keyData.altKey == false && keyData.ctrlKey == false) {

          if (lut[keyData.code]) {
            let modified = keyData.shiftKey ^ keyData.capsLock + 2 * altstate;
            if (keys.includes(keyData.code)) {
              modified = keyData.shiftKey + 2 * altstate;
            }
              
            let emit = lut[keyData.code][modified];
            altstate = false;
            
            if (deadkey != null) {
                if (deadkeys[deadkey][emit]) {
                  emit = deadkeys[deadkey][emit];
                  deadkey = null;
                }
                else {
                  deadkey = null;
                }
            }
              
            if ((deadkey == null) && (deadkeys[emit])) {
                deadkey = emit;
                emit = null;
            }
              
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
