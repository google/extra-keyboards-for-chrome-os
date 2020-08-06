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
let builtinSequences = {
"^A": "\u00c2", // LATIN CAPITAL LETTER A WITH CIRCUMFLEX
">A": "\u00c2", // LATIN CAPITAL LETTER A WITH CIRCUMFLEX
"A>": "\u00c2", // LATIN CAPITAL LETTER A WITH CIRCUMFLEX
"AE": "\u00c6", // AE # LATIN CAPITAL LETTER AE
"`E": "\u00c8", // LATIN CAPITAL LETTER E WITH GRAVE
"E`": "\u00c8", // LATIN CAPITAL LETTER E WITH GRAVE
"'E": "\u00c9", // LATIN CAPITAL LETTER E WITH ACUTE
"E'": "\u00c9", // LATIN CAPITAL LETTER E WITH ACUTE
"^E": "\u00ca", // LATIN CAPITAL LETTER E WITH CIRCUMFLEX
">E": "\u00ca", // LATIN CAPITAL LETTER E WITH CIRCUMFLEX
"E>": "\u00ca", // LATIN CAPITAL LETTER E WITH CIRCUMFLEX
"`I": "\u00cc", // LATIN CAPITAL LETTER I WITH GRAVE
"I`": "\u00cc", // LATIN CAPITAL LETTER I WITH GRAVE
"'I": "\u00cd", // LATIN CAPITAL LETTER I WITH ACUTE
"I'": "\u00cd", // LATIN CAPITAL LETTER I WITH ACUTE
"^I": "\u00ce", // LATIN CAPITAL LETTER I WITH CIRCUMFLEX
">I": "\u00ce", // LATIN CAPITAL LETTER I WITH CIRCUMFLEX
"I>": "\u00ce", // LATIN CAPITAL LETTER I WITH CIRCUMFLEX
"DH": "\u00d0", // LATIN CAPITAL LETTER ETH
"`O": "\u00d2", // LATIN CAPITAL LETTER O WITH GRAVE
"O`": "\u00d2", // LATIN CAPITAL LETTER O WITH GRAVE
"'O": "\u00d3", // LATIN CAPITAL LETTER O WITH ACUTE
"O'": "\u00d3", // LATIN CAPITAL LETTER O WITH ACUTE
"^O": "\u00d4", // LATIN CAPITAL LETTER O WITH CIRCUMFLEX
">O": "\u00d4", // LATIN CAPITAL LETTER O WITH CIRCUMFLEX
"O>": "\u00d4", // LATIN CAPITAL LETTER O WITH CIRCUMFLEX
"`U": "\u00d9", // LATIN CAPITAL LETTER U WITH GRAVE
"U`": "\u00d9", // LATIN CAPITAL LETTER U WITH GRAVE
"'U": "\u00da", // LATIN CAPITAL LETTER U WITH ACUTE
"U'": "\u00da", // LATIN CAPITAL LETTER U WITH ACUTE
"^U": "\u00db", // LATIN CAPITAL LETTER U WITH CIRCUMFLEX
">U": "\u00db", // LATIN CAPITAL LETTER U WITH CIRCUMFLEX
"U>": "\u00db", // LATIN CAPITAL LETTER U WITH CIRCUMFLEX
"'Y": "\u00dd", // LATIN CAPITAL LETTER Y WITH ACUTE
"Y'": "\u00dd", // LATIN CAPITAL LETTER Y WITH ACUTE
"ss": "\u00df", // ssharp # LATIN SMALL LETTER SHARP S
"`a": "\u00e0", // LATIN SMALL LETTER A WITH GRAVE
"a`": "\u00e0", // LATIN SMALL LETTER A WITH GRAVE
"'a": "\u00e1", // LATIN SMALL LETTER A WITH ACUTE
"a'": "\u00e1", // LATIN SMALL LETTER A WITH ACUTE
"^a": "\u00e2", // LATIN SMALL LETTER A WITH CIRCUMFLEX
">a": "\u00e2", // LATIN SMALL LETTER A WITH CIRCUMFLEX
"a>": "\u00e2", // LATIN SMALL LETTER A WITH CIRCUMFLEX
"ae": "\u00e6", // ae # LATIN SMALL LETTER AE
"`e": "\u00e8", // LATIN SMALL LETTER E WITH GRAVE
"e`": "\u00e8", // LATIN SMALL LETTER E WITH GRAVE
"'e": "\u00e9", // LATIN SMALL LETTER E WITH ACUTE
"e'": "\u00e9", // LATIN SMALL LETTER E WITH ACUTE
"^e": "\u00ea", // LATIN SMALL LETTER E WITH CIRCUMFLEX
">e": "\u00ea", // LATIN SMALL LETTER E WITH CIRCUMFLEX
"e>": "\u00ea", // LATIN SMALL LETTER E WITH CIRCUMFLEX
"`i": "\u00ec", // LATIN SMALL LETTER I WITH GRAVE
"i`": "\u00ec", // LATIN SMALL LETTER I WITH GRAVE
"'i": "\u00ed", // LATIN SMALL LETTER I WITH ACUTE
"i'": "\u00ed", // LATIN SMALL LETTER I WITH ACUTE
"^i": "\u00ee", // LATIN SMALL LETTER I WITH CIRCUMFLEX
">i": "\u00ee", // LATIN SMALL LETTER I WITH CIRCUMFLEX
"i>": "\u00ee", // LATIN SMALL LETTER I WITH CIRCUMFLEX
"dh": "\u00f0", // LATIN SMALL LETTER ETH
"`o": "\u00f2", // LATIN SMALL LETTER O WITH GRAVE
"o`": "\u00f2", // LATIN SMALL LETTER O WITH GRAVE
"'o": "\u00f3", // LATIN SMALL LETTER O WITH ACUTE
"o'": "\u00f3", // LATIN SMALL LETTER O WITH ACUTE
"^o": "\u00f4", // LATIN SMALL LETTER O WITH CIRCUMFLEX
">o": "\u00f4", // LATIN SMALL LETTER O WITH CIRCUMFLEX
"o>": "\u00f4", // LATIN SMALL LETTER O WITH CIRCUMFLEX
"`u": "\u00f9", // LATIN SMALL LETTER U WITH GRAVE
"u`": "\u00f9", // LATIN SMALL LETTER U WITH GRAVE
"'u": "\u00fa", // LATIN SMALL LETTER U WITH ACUTE
"u'": "\u00fa", // LATIN SMALL LETTER U WITH ACUTE
"^u": "\u00fb", // LATIN SMALL LETTER U WITH CIRCUMFLEX
">u": "\u00fb", // LATIN SMALL LETTER U WITH CIRCUMFLEX
"u>": "\u00fb", // LATIN SMALL LETTER U WITH CIRCUMFLEX
"'y": "\u00fd", // LATIN SMALL LETTER Y WITH ACUTE
"y'": "\u00fd", // LATIN SMALL LETTER Y WITH ACUTE
"'C": "\u0106", // LATIN CAPITAL LETTER C WITH ACUTE
"C'": "\u0106", // LATIN CAPITAL LETTER C WITH ACUTE
"'c": "\u0107", // LATIN SMALL LETTER C WITH ACUTE
"c'": "\u0107", // LATIN SMALL LETTER C WITH ACUTE
"^C": "\u0108", // LATIN CAPITAL LETTER C WITH CIRCUMFLEX
"^c": "\u0109", // LATIN SMALL LETTER C WITH CIRCUMFLEX
"^G": "\u011c", // LATIN CAPITAL LETTER G WITH CIRCUMFLEX
"^g": "\u011d", // LATIN SMALL LETTER G WITH CIRCUMFLEX
"^H": "\u0124", // LATIN CAPITAL LETTER H WITH CIRCUMFLEX
"^h": "\u0125", // LATIN SMALL LETTER H WITH CIRCUMFLEX
"^J": "\u0134", // LATIN CAPITAL LETTER J WITH CIRCUMFLEX
"^j": "\u0135", // LATIN SMALL LETTER J WITH CIRCUMFLEX
"kk": "\u0138", // LATIN SMALL LETTER KRA
"'L": "\u0139", // LATIN CAPITAL LETTER L WITH ACUTE
"L'": "\u0139", // LATIN CAPITAL LETTER L WITH ACUTE
"'l": "\u013a", // LATIN SMALL LETTER L WITH ACUTE
"l'": "\u013a", // LATIN SMALL LETTER L WITH ACUTE
"'N": "\u0143", // LATIN CAPITAL LETTER N WITH ACUTE
"N'": "\u0143", // LATIN CAPITAL LETTER N WITH ACUTE
"'n": "\u0144", // LATIN SMALL LETTER N WITH ACUTE
"n'": "\u0144", // LATIN SMALL LETTER N WITH ACUTE
"NG": "\u014a", // LATIN CAPITAL LETTER ENG
"ng": "\u014b", // LATIN SMALL LETTER ENG
"=O": "\u0150", // LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
"=o": "\u0151", // LATIN SMALL LETTER O WITH DOUBLE ACUTE
"OE": "\u0152", // OE # LATIN CAPITAL LIGATURE OE
"oe": "\u0153", // oe # LATIN SMALL LIGATURE OE
"'R": "\u0154", // LATIN CAPITAL LETTER R WITH ACUTE
"R'": "\u0154", // LATIN CAPITAL LETTER R WITH ACUTE
"'r": "\u0155", // LATIN SMALL LETTER R WITH ACUTE
"r'": "\u0155", // LATIN SMALL LETTER R WITH ACUTE
"'S": "\u015a", // LATIN CAPITAL LETTER S WITH ACUTE
"S'": "\u015a", // LATIN CAPITAL LETTER S WITH ACUTE
"'s": "\u015b", // LATIN SMALL LETTER S WITH ACUTE
"s'": "\u015b", // LATIN SMALL LETTER S WITH ACUTE
"^S": "\u015c", // LATIN CAPITAL LETTER S WITH CIRCUMFLEX
"^s": "\u015d", // LATIN SMALL LETTER S WITH CIRCUMFLEX
"=U": "\u0170", // LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
"=u": "\u0171", // LATIN SMALL LETTER U WITH DOUBLE ACUTE
"^W": "\u0174", // LATIN CAPITAL LETTER W WITH CIRCUMFLEX
"W^": "\u0174", // LATIN CAPITAL LETTER W WITH CIRCUMFLEX
"^w": "\u0175", // LATIN SMALL LETTER W WITH CIRCUMFLEX
"w^": "\u0175", // LATIN SMALL LETTER W WITH CIRCUMFLEX
"^Y": "\u0176", // LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
"Y^": "\u0176", // LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
"^y": "\u0177", // LATIN SMALL LETTER Y WITH CIRCUMFLEX
"y^": "\u0177", // LATIN SMALL LETTER Y WITH CIRCUMFLEX
"'Z": "\u0179", // LATIN CAPITAL LETTER Z WITH ACUTE
"Z'": "\u0179", // LATIN CAPITAL LETTER Z WITH ACUTE
"'z": "\u017a", // LATIN SMALL LETTER Z WITH ACUTE
"z'": "\u017a", // LATIN SMALL LETTER Z WITH ACUTE
"fs": "\u017f", // LATIN SMALL LETTER LONG S
"fS": "\u017f", // LATIN SMALL LETTER LONG S
"'G": "\u01f4", // LATIN CAPITAL LETTER G WITH ACUTE
"'g": "\u01f5", // LATIN SMALL LETTER G WITH ACUTE
"`N": "\u01f8", // LATIN CAPITAL LETTER N WITH GRAVE
"`n": "\u01f9", // LATIN SMALL LETTER N WITH GRAVE
"ee": "\u0259", // LATIN SMALL LETTER SCHWA
"'K": "\u1e30", // LATIN CAPITAL LETTER K WITH ACUTE
"'k": "\u1e31", // LATIN SMALL LETTER K WITH ACUTE
"'M": "\u1e3e", // LATIN CAPITAL LETTER M WITH ACUTE
"'m": "\u1e3f", // LATIN SMALL LETTER M WITH ACUTE
"'P": "\u1e54", // LATIN CAPITAL LETTER P WITH ACUTE
"'p": "\u1e55", // LATIN SMALL LETTER P WITH ACUTE
"`W": "\u1e80", // LATIN CAPITAL LETTER W WITH GRAVE
"`w": "\u1e81", // LATIN SMALL LETTER W WITH GRAVE
"'W": "\u1e82", // LATIN CAPITAL LETTER W WITH ACUTE
"'w": "\u1e83", // LATIN SMALL LETTER W WITH ACUTE
"^Z": "\u1e90", // LATIN CAPITAL LETTER Z WITH CIRCUMFLEX
"^z": "\u1e91", // LATIN SMALL LETTER Z WITH CIRCUMFLEX
"`Y": "\u1ef2", // LATIN CAPITAL LETTER Y WITH GRAVE
"`y": "\u1ef3", // LATIN SMALL LETTER Y WITH GRAVE

};
/**
/**
 * Map from X11 keysym names to key names (incomplete).
 * Keys with the same X11 keysym and Javascript name are omitted.
 *
 * This list is not comprehensive. Please add keysyms if you need them.
 *
 * @type {Object<string, string>}
 */
const specialSymToKey = Object.freeze({
  grave: '`',
  asciitilde: '~',
  exclam: '!',
  at: '@',
  numbersign: '#',
  dollar: '$',
  percent: '%',
  asciicircum: '^',
  ampersand: '&',
  asterisk: '*',
  parenleft: '(',
  parenright: ')',
  minus: '-',
  underscore: '_',
  equal: '=',
  plus: '+',
  bracketleft: '[',
  braceleft: '{',
  bracketright: ']',
  braceright: '}',
  backslash: '\\',
  bar: '|',
  semicolon: ';',
  colon: ':',
  apostrophe: '\'',
  quotedbl: '"',
  comma: ',',
  less: '<',
  period: '.',
  greater: '>',
  slash: '/',
  question: '?',
  space: ' ',
  onesuperior: '¹',
  twosuperior: '²',
  threesuperior: '³',
  onequarter: '¼',
  onehalf: '½',
  threequarters: '¾',
  currency: '¤',
  EuroSign: '€',
  yen: '¥',
  sterling: '£',
  cent: '¢',
  multiply: '×',
  division: '÷',
  leftsinglequotemark: '‘',
  rightsinglequotemark: '’',
  leftdoublequotemark: '“',
  rightdoublequotemark: '”',
  guillemotleft: '«',
  guillemotright: '»',
  exclamdown: '¡',
  questiondown: '¿',
  notsign: '¬',
  brokenbar: '¦',
  paragraph: '¶',
  section: '§',
  degree: '°',
  registered: '®',
  copyright: '©',
  AE: 'Æ',
  Aacute: 'Á',
  Adiaeresis: 'Ä',
  Aring: 'Å',
  Ccedilla: 'Ç',
  ETH: 'Ð',
  Eacute: 'É',
  Ediaeresis: 'Ë',
  Iacute: 'Í',
  Idiaeresis: 'Ï',
  Ntilde: 'Ñ',
  OE: 'Œ',
  Oacute: 'Ó',
  Odiaeresis: 'Ö',
  Oslash: 'Ø',
  THORN: 'Þ',
  Uacute: 'Ú',
  Udiaeresis: 'Ü',
  aacute: 'á',
  adiaeresis: 'ä',
  ae: 'æ',
  aring: 'å',
  ccedilla: 'ç',
  eacute: 'é',
  ediaeresis: 'ë',
  eth: 'ð',
  iacute: 'í',
  idiaeresis: 'ï',
  mu: 'µ',
  ntilde: 'ñ',
  oacute: 'ó',
  odiaeresis: 'ö',
  oe: 'œ',
  oslash: 'ø',
  ssharp: 'ß',
  thorn: 'þ',
  uacute: 'ú',
  udiaeresis: 'ü',
  Down: 'ArrowDown',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Left: 'ArrowLeft',
  Next: 'PageDown',
  Prior: 'PageUp',
  BackSpace: 'Backspace',
  Menu: 'ContextMenu',
  Multi_key: 'Compose',
  Print: 'PrintScreen',
  Return: 'Enter',
  ISO_Level3_Shift: 'AltGraph',
})
/**
 * The inverse of specialSymToKey.
 * @type {Object<string, string>}
 */
const specialKeyToSym = {};
{
  Object.entries(specialSymToKey)
    .forEach(([sym, key]) => specialKeyToSym[key] = sym);
  Object.freeze(specialKeyToSym);
}
/**
 * Parses an X11 keysym name for a raw Unicode codepoint to a string containing
 * that codepoint. Returns null if the keysym is not a raw codepoint.
 *
 * @param {string} sym
 * @return {?string}
 */
function parseUnicodeSym(sym) {
  let match = /^U([0-9A-F]+)$/.exec(sym);
  if (!match) return null;
  let codePoint = parseInt(match[1], 16);
  if (codePoint < 0 || codePoint >= 17<<16) return null;
  return String.fromCodePoint(codePoint);
}
/**
 * Translates an X11 keysym name to the corresponding properties of a
 * KeyboardEvent.
 *
 * @param {string} sym
 * @return {{key: string, location: number}}
 */
function symToEvent(sym) {
  let location = KeyboardEvent.DOM_KEY_LOCATION_STANDARD;
  let key = parseUnicodeSym(sym);
  if (key) {
    // ⚠ BUG: The spec requires key strings to be NFC-normalized strings
    // containing 0 or 1 non-control characters followed by 0 or more combining
    // characters, but we don't have an easy way to detect character properties
    // here.
    // See https://www.w3.org/TR/uievents-key/#keys-unicode.
    //
    // TODO(bcmills): Revisit this once Chrome supports regular expressions for
    // character classes. We may need to return multiple KeyboardEvents for a
    // given keysym.
    // https://developers.google.com/web/updates/2017/07/upcoming-regexp-features
    switch (key) {
    case '\u0008':
      return {key: 'Backspace', location: location};
    case '\u0009':
      return {key: 'Tab', location: location};
    case '\u000D':
      return {key: 'Enter', location: location};
    case '\u001B':
      return {key: 'Escape', location: location};
    case '\u007F':
      return {key: 'Delete', location: location};
    default:
      return {key: key.normalize('NFC'), location: location};
    }
  }
  key = sym
  if (key.startsWith('KP_')) {
    location = KeyboardEvent.DOM_KEY_LOCATION_NUMPAD;
    key = sym.substring(3);
  } else if (sym.endsWith('_L')) {
    location = KeyboardEvent.DOM_KEY_LOCATION_LEFT;
    key = sym.substring(0, sym.length-2);
  } else if (sym.endsWith('_R')) {
    location = KeyboardEvent.DOM_KEY_LOCATION_RIGHT;
    key = sym.substring(0, sym.length-2);
  } else if (sym.endsWith('_Lock')) {
    key = sym.substring(0, sym.length-5) + 'Lock';
  }
  // Note: We intentionally don't validate unrecognized keysyms, because it's
  // possible they will be added to the spec in the future, and esoteric keys
  // tend to have KeyboardEvent key names that match their X11 keysym names.
  // We don't want to have to update this code for each new named key.
  return {
    key: specialSymToKey[key] || key,
    location: location,
  };
}
/**
 * @param {string} str
 * @return {number} The number of codepoints in str.
 */
function lengthInCodepoints(str) {
  let n = 0;
  for (let _ of str) {
    n += 1;
  }
  return n;
}
/**
 * Translates properties of a KeyboardEvent to a list of corresponding X11
 * keysyms.
 *
 * @param {{key: string, location: int}} keyData
 * @return {Array<string>}
 */
function eventToSyms(keyData) {
  let key = keyData.key;
  switch (key) {
    case 'Ctrl':
      key = 'Control'; // https://crbug.com/826538
      break;
    case 'Esc':
      key = 'Escape'; // https://crbug.com/826538
      break;
    case '\u007f':
      key = 'Delete'; // https://crbug.com/830854
      break;
    case '\r':
      key = 'Enter';
      break;
    case '\u0000':
    case '':
      switch (keyData.code) {
        case 'ContextMenu':
        case 'End':
        case 'Home':
        case 'Insert':
        case 'MediaPlayPause':
        case 'MetaLeft':
        case 'MetaRight':
        case 'PageDown':
        case 'PageUp':
        case 'Pause':
        case 'PrintScreen':
        case 'ScrollLock':
          // https://crbug.com/830854
          key = keyData.code;
          break;
        default:
          // Probably a dead key (https://crbug.com/831194), but the
          // chrome.input.ime API does not give us its current mapping.
          key = 'Unidentified';
          break;
      }
  }
  if (/^F\d(?:\d?)$/.test(keyData.code)) {
    key = keyData.code; // https://crbug.com/831202
  }
  let location = keyData.location;
  if (location === undefined) {
    // As of M65, chrome.input.ime events are missing the standard location
    // field. Fill them in from the code, defaulting to STANDARD or LEFT if
    // they're remapped from someplace weird.
    // See https://www.w3.org/TR/uievents/#events-keyboard-key-location.
    switch (key) {
      case 'Shift':
      case 'Control':
      case 'Alt':
      case 'Meta':
        location = keyData.code.endsWith('Right')
          ? KeyboardEvent.DOM_KEY_LOCATION_RIGHT
          : KeyboardEvent.DOM_KEY_LOCATION_LEFT;
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
      case 'Enter':
      case '+':
      case '-':
      case '*':
      case '/':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'Home':
      case 'End':
      case 'PageDown':
      case 'PageUp':
        location = keyData.code.startsWith('Numpad')
          ? KeyboardEvent.DOM_KEY_LOCATION_NUMPAD
          : KeyboardEvent.DOM_KEY_LOCATION_STANDARD;
        break;
      default:
        location = KeyboardEvent.DOM_KEY_LOCATION_STANDARD;
    }
  }
  if (key == 'Enter'
      && location == KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
    // Numpad syms are usually the standard sym with a KP_ prefix, but numpad
    // Enter corresponds to KP_Enter, whereas standard Enter corresponds to
    // Return.
    return ['KP_Enter'];
  }
  let sym = specialKeyToSym[key];
  if (!sym) {
    if (!(/^\w+$/.test(key))) {
      let syms = [];
      for (const codePoint of key) {
        let hex = key.codePointAt(0).toString(16).toUpperCase();
        let pad = (hex.length < 4) ? '0'.repeat(4 - hex.length) : '';
        syms.push(['U' + pad + hex]);
      }
      if (syms.length == 0) {
        throw new Error('no syms for key name:', key)
      }
      return syms;
    }
    sym = key;
  }
  if (sym.endsWith('Lock')) {
    return [sym.substring(0, sym.length-4) + '_Lock'];
  }
  switch (location) {
  case KeyboardEvent.DOM_KEY_LOCATION_STANDARD:
    return [sym];
  case KeyboardEvent.DOM_KEY_LOCATION_RIGHT:
    return [sym + '_R'];
  case KeyboardEvent.DOM_KEY_LOCATION_LEFT:
    return [sym + '_L'];
  case KeyboardEvent.DOM_KEY_LOCATION_NUMPAD:
    return ['KP_' + sym];
  default:
    throw new Error('unexpected keyboard location: ' + location);
  }
}
class Modifiers {
  constructor() {
    /** @type {?boolean} */
    this.control = null;
    /** @type {?boolean} */
    this.shift = null;
    /** @type {?boolean} */
    this.alt = null;
    /** @type {?boolean} */
    this.meta = null;
    /** @type {?boolean} */
    this.capsLock = null;
  }
  /**
   * @param {KeyboardEvent} keyEvent
   * @return {bool}
   */
  match(keyEvent) {
    return (this.control === null || this.control == keyEvent.ctrlKey)
      && (this.shift === null || this.shift == keyEvent.shiftKey)
      && (this.alt === null || this.alt == keyEvent.altKey)
      && (this.meta === null || this.meta == keyEvent.metaKey)
      && (this.capsLock === null || this.capsLock == keyEvent.capsLock);
  }
  /**
   * @param {Modifiers} other
   * @return {bool}
   */
  equals(other) {
    return this.control === other.control
      && this.shift === other.shift
      && this.alt === other.alt
      && this.meta === other.meta
      && this.capsLock === other.capsLock;
  }
}
const modifiersAny = Object.freeze(new Modifiers());
const modifiersNone = Object.freeze(Object.assign(new Modifiers(), {
  control: false,
  shift: false,
  alt: false,
  meta: false,
  capsLock: false,
}));
let contextID = 0;
chrome.input.ime.onFocus.addListener((context) => {
  resetState();
  contextID = context.contextID;
});
chrome.input.ime.onBlur.addListener(() => {
  resetState();
  contextID = 0;
});
class Result {
  /**
   * At least one of {string, keysym} must be non-null.
   * @param {?string} string
   * @param {?string} keysym
   */
  constructor(string, keysym) {
    if (string == null) {
      const key = parseUnicodeSym(keysym) || symToEvent(keysym).key;
      if (!(/^\w{2,}$/.test(key))) {
        // The key is not plausible as a named key attribute value.
        // Treat it as a Unicode string.
        string = key;
        console.log('Treating key %s as Unicode string:', keysym, key);
      }
    }
    this.string = string;
    this.keysym = keysym;
    Object.freeze(this)
  }
  send(keyData) {
    if (this.string != null && contextID != 0) {
      chrome.input.ime.commitText({
        contextID: contextID,
        text: this.string,
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error committing text:', chrome.runtime.lastError);
        }
      });
      return;
    }
    if (this.keysym == null) return;
    // Work around https://crbug.com/829396: instead of constructing a real
    // KeyboardEvent, send an object that just vaguely resembles one.
    const eventPrototype = Object.assign({}, keyData);
    delete eventPrototype.extensionId;
    delete eventPrototype.keyCode;
    const symEvent = symToEvent(this.keysym);
    delete symEvent.location;
    Object.assign(eventPrototype, symEvent);
    const down = Object.assign({}, eventPrototype);
    down.type = 'keydown';
    const up = Object.assign({}, keyData);
    up.type = 'keyup';
    chrome.input.ime.sendKeyEvents({
      contextID: contextID,
      keyData: [down, up],
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error sending key events:', chrome.runtime.lastError);
      }
    });
  }
}
class EventState {
  /**
   * @param {Modifiers} mods
   * @param {boolean} builtin
   */
  constructor(mods, builtin) {
    this.mods = Object.freeze(mods);
    /** True if all sequences that pass through this state are built-in. */
    this.builtin = builtin;
    /** @type {?Result} */
    this.result = null;
    /**
     * Maps X11 keysyms to an array of events matching that keysym.
     * The events must be filtered by mods to obtain the final list of matches.
     *
     * @type {Object<string, Array<EventState>>}
     */
    this.nextKeys = {};
  }
  /**
   * @param {{mods: Modifiers, sym: string}} event
   * @param {boolean} builtin
   */
  addEvent(event, builtin) {
    if (!builtin) {
      this.builtin = false;
    }
    let states = this.nextKeys[event.sym];
    if (states) {
      let last = states[states.length-1];
      if (last.mods.equals(event.mods)) {
        if (!builtin) {
          last.builtin = false;
        }
        return last;
      }
    } else {
      states = [];
      this.nextKeys[event.sym] = states;
    }
    let state = new EventState(event.mods, builtin);
    states.push(state);
    return state;
  }
}
/**
 * Adds the given sequence to root, pruning out the results of any existing
 * sequences that are an exact prefix of the new sequence.
 * @param {EventState} root
 * @param {{
 *   events: Array<{mods: Modifiers, sym: string}>,
 *   result: Result,
 *   builtin: boolean,
 * }} sequence
 * @return {{warning: ?string}}
 */
function addSequence(root, sequence) {
  let warning = null;
  let finalState = root;
  let prefixStates = [root];
  for (let event of sequence.events) {
    let nextPrefixStates = [];
    for (let state of prefixStates) {
      for (let candidate of (state.nextKeys[event.sym] || [])) {
        if (!candidate.mods.equals(event.mods)) continue;
        nextPrefixStates.push(candidate);
        if (candidate.builtin || !candidate.result) continue;
        let str = candidate.result.keysym;
        if (candidate.result.string != null) {
          str = '“' + candidate.result.string + '”';
        }
        warning = 'Suppressed existing sequence with result (' + str + ').';
        candidate.result = null;
      }
    }
    prefixStates = nextPrefixStates;
    finalState = finalState.addEvent(event, sequence.builtin);
  }
  for (let suffixStates of Object.values(finalState.nextKeys)) {
    if (warning != null) break;
    for (let state of suffixStates) {
      if (state != finalState && !state.builtin) {
        console.warn('New sequence is a prefix of existing sequence(s):', state);
        warning = 'New sequence is a prefix of existing sequence(s).';
        break;
      }
    }
  }
  finalState.result = sequence.result;
  return {warning: warning};
}
/**
 * Adds the built-in sequence definitions to root.
 * @param {EventState} root
 */
function addBuiltinSequences(root) {
  let added = 0;
  for (let [seq, string] of Object.entries(builtinSequences)) {
    let events = [{mods: modifiersAny, sym: 'Multi_key'}];
    for (const key of seq) {
      let syms = eventToSyms({
        key: key,
        location: KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
      });
      for (const sym of syms) {
        events.push({mods: modifiersAny, sym: sym});
      }
    }
    addSequence(root, {
      events: events,
      result: new Result(string, null),
      builtin: true,
    });
    added += 1;
  }
  console.log('Added %d built-in sequences.', added);
}
/**
 * Parses a leading event from an XCompose sequence definition line.
 *
 * @param {string} line
 * @return {{mods: Modifiers, sym: string, rest: string}}
 * @throws {Error} if the line does not start with a syntactically-valid event.
 */
function parseEvent(line) {
  let rest = line;
  let match;
  let mods;
  if ((match = /^\s*None\s*/.exec(rest))) {
    rest = rest.substring(match[0].length);
    mods = modifiersNone;
  } else {
    mods = new Modifiers();
    if ((match = /^\s*[!]/.exec(rest))) {
      rest = rest.substring(match[0].length);
      Object.assign(mods, modifiersNone);
    }
    while ((match = /^\s*([~]\s*)?(Ctrl|Lock|Caps|Shift|Alt|Meta)\b/.exec(rest))) {
      rest = rest.substring(match[0].length);
      let val = match[1] ? false : true;
      switch (match[2]) {
      case 'Ctrl':
        mods.control = val;
        break;
      case 'Lock':
        // Fall through: Lock is a synonym for Caps.
      case 'Caps':
        mods.capsLock = val;
        break;
      case 'Shift':
        mods.shift = val;
        break;
      case 'Alt':
        mods.alt = val;
        break;
      case 'Meta':
        mods.meta = val;
        break;
      default:
        throw new Error('unreachable default case');
      }
    }
    mods = mods.equals(modifiersAny) ? modifiersAny : Object.freeze(mods);
  }
  if (!(match = /\s*<(\w+)>/.exec(rest))) {
    throw new Error('missing or invalid keysym in event');
  }
  rest = rest.substring(match[0].length);
  const sym = match[1];
  return {
    mods: mods,
    sym: sym,
    rest: rest,
  };
}
/**
 * Parses an XCompose sequence definition line.
 *
 * @param {string} line
 * @return {{events: Array<{mods: Modifiers, sym: string}>, result: Result}}
 * @throws {Error} if the line is not a syntatically valid sequence.
 */
function parseSequence(line) {
  let event = parseEvent(line);
  let rest = event.rest;
  let events = [{mods: event.mods, sym: event.sym}];
  let match;
  while (!(match =
           /^\s*:\s*(?:"([^"]*)"\s*)?(\w+)?\s*(?:#\s*.*)?$/.exec(rest))) {
    event = parseEvent(rest);
    rest = event.rest;
    events.push({mods: event.mods, sym: event.sym});
  }
  let string = match[1];
  const sym = match[2];
  if (string == null && sym == null) {
    throw new Error('missing or invalid result in sequence definition');
  }
  if (string) {
    // Convert octal and hex escapes to the corresponding Unicode strings.
    string = string.replace(
        /\\(?:(?:0x([0-9a-fA-F]+))|([0-7]+))/g, (match, hex, octal) => {
          return String.fromCodePoint(
            octal ? parseInt(octal, 8) : parseInt(hex, 16));
        });
  }
  return {events: events, result: new Result(string, sym)};
}
/**
 * @type {{
 *   warnings: Array<{line: string, message: string}>,
 *   errors: Array<{line: string, message: string}>,
 * }} */
var fileStatus = {
  warnings: [],
  errors: [],
};
/**
 * Parses a file in XCompose format to an EventState tree.
 *
 * @param {string} composeFile
 * @return {{
 *   root: EventState,
 *   warnings: Array<{line: string, message: string}>,
 *   errors: Array<{line: string, message: string}>,
 * }}
 */
function parseComposeFile(composeFile) {
  let root = new EventState(modifiersAny);
  let warnings = [];
  let errors = [];
  let lines = composeFile.split('\n');
  let lineNumber = 0;
  let numCustom = 0;
  for (let line of lines) {
    lineNumber += 1;
    line = line.trim();
    if (line.length == 0 || /^(#.*)?$/.test(line)) {
      // Empty or comment-only line.
      continue;
    }
    if (/^include\s+"%L"\s*$/.test(line)) {
      addBuiltinSequences(root);
      continue;
    }
    let sequence;
    try {
      sequence = parseSequence(line);
    } catch (error) {
      errors.push({line: line, message: error.message});
      continue;
    }
    sequence.builtin = false;
    let result = addSequence(root, sequence);
    if (result.warning) {
      warnings.push({line: line, message: result.warning});
    }
    numCustom += 1;
  }
  if (numCustom > 0) {
    console.log('Added %d custom sequences.', numCustom);
  }
  return {
    root: root,
    warnings: warnings,
    errors: errors,
  };
}
/**
 * The JavaScript key code to use for the Compose key.
 * @type {?string}
 */
var composeKey = localStorage.getItem('key');
/**
 * If true (the default) and composeKey is set to a modifier, retain the
 * modifier's original behavior.
 * @type {?boolean}
 */
var keepModifier = localStorage.getItem('keepModifier') == "true";
function setKey(settings) {
  composeKey = settings.key;
  keepModifier = settings.keepModifier;
  localStorage.setItem('key', settings.key);
  if (settings.keepModifier) {
    localStorage.setItem('keepModifier', "true");
  } else {
    localStorage.removeItem('keepModifier');
  }
  resetState();
  console.log('set key to ', settings);
}
/**
 * @param {{key: string, keepModifier: boolean}} settings
 */
function storeKey(settings) {
  setKey(settings);
  chrome.storage.sync.set(settings, () => {
    if (chrome.runtime.lastError) {
      console.warn('Failed to store key to Chrome sync:',
                   chrome.runtime.lastError);
      return;
    }
    console.log('Stored key settings as ', settings);
  });
}
/** @type {function(string)} */
var onComposeKeyLoaded = null;
if (!composeKey) {
  chrome.storage.sync.get({
    key: 'AltRight',
    // Default to keeping the modifier: otherwise, the default AltRight compose
    // key conflicts with AltGr in international layouts.
    keepModifier: true,
  }, (stored) => {
    if (chrome.runtime.lastError) {
      console.warn('Failed to load compose key from Chrome sync:',
                   chrome.runtime.lastError);
      return
    }
    if (!composeKey) {
      setKey(stored);
      if (onComposeKeyLoaded !== null) {
        onComposeKeyLoaded(composeKey);
      }
    }
  });
}
const defaultComposeFile = 'include "%L"\n';
/**
 * The current compose file in XCompose format.
 * @type {string}
 */
var composeFile = defaultComposeFile;
/**
 * The initial state at the root of all sequences.
 * @type {EventState}
 */
let rootState = new EventState(modifiersAny);
function setComposeFile(content) {
  fileStatus = {
    warnings: [],
    errors: [],
  };
  composeFile = content;
  let parsed = parseComposeFile(composeFile);
  rootState = parsed.root;
  fileStatus = {
    warnings: parsed.warnings,
    errors: parsed.errors,
  };
  resetState();
}
function storeComposeFile(content) {
  setComposeFile(content);
  chrome.storage.sync.set({composeFile: content}, () => {
    if (!chrome.runtime.lastError) {
      console.log('Stored compose file to Chrome sync (%d characters).',
                  lengthInCodepoints(content));
      return;
    }
    console.warn('Failed to store compose file to Chrome sync:',
                  chrome.runtime.lastError);
    localStorage.setItem('composeFile', content);
    console.log('Stored compose file to local storage (%d characters).',
                lengthInCodepoints(content));
    // Remove the previous compose file, if any, from storage. If the new
    // compose file is too large to sync, we want to fall back to local copies
    // instead of loading an outdated configuration from sync.
    chrome.storage.sync.remove('composeFile', () => {
      if (chrome.runtime.lastError) {
        console.warn('Failed to remove stored compose file from Chrome sync:',
                      chrome.runtime.lastError);
      }
    });
  });
}
function clearComposeFile() {
  localStorage.removeItem('composeFile');
  chrome.storage.sync.remove('composeFile');
  setComposeFile(defaultComposeFile);
  console.log('Compose file reset to default.');
}
/** @type {function(string)} */
var onComposeFileLoaded = null;
function loadLocalComposeFile() {
  let content = localStorage.getItem('composeFile');
  if (content == null) {
    setComposeFile(defaultComposeFile);
  } else {
    console.log('Loaded compose file from local storage (%d characters).',
                lengthInCodepoints(content));
    setComposeFile(content);
  }
  if (onComposeFileLoaded) {
    onComposeFileLoaded(composeFile);
  }
}
chrome.storage.sync.get('composeFile', (stored) => {
  if (chrome.runtime.lastError) {
    console.warn('Failed to load compose file from Chrome sync:',
                  chrome.runtime.lastError);
    loadLocalComposeFile();
    return;
  }
  if (!stored.composeFile) {
    loadLocalComposeFile();
    return;
  }
  setComposeFile(stored.composeFile);
  console.log('Loaded compose file from Chrome sync (%d characters).',
              lengthInCodepoints(composeFile));
  if (onComposeFileLoaded) {
    onComposeFileLoaded(composeFile);
  }
});
/**
 * A list of sequences matching the current input, in the order in which those
 * sequences were defined in the compose file. In case of collision, the last
 * sequence definition wins.
 * @type {?Array<EventState>}
 */
var states = [rootState];
/**
 * If true, we have consumed one or more key events since the last reset.
 * @type {boolean}
 */
var composing = false;
/** @type {Set<string>} */
var keyDownSuppressed = new Set();
/**
 * If true, trigger a compose event if we receive a keyup for the compose key.
 * @type {boolean}
 */
var composeOnKeyUp = false;
function resetState() {
  states = [rootState];
  composing = false;
  keyDownSuppressed = new Set();
  composeOnKeyUp = false;
}
/**
 * The set of Javascript key events that correspond to modifier keys.
 * @type {Set<string>}
 */
const modifierKeys = Object.freeze(new Set([
  'Alt',
  'AltGraph',
  'CapsLock',
  'Control',
  'Ctrl', // https://crbug.com/826538
  'Fn',
  'FnLock',
  'Hyper',
  'Meta',
  'NumLock',
  'ScrollLock',
  'Shift',
  'Super',
  'Symbol',
  'SymbolLock',
]));
chrome.input.ime.onKeyEvent.addListener((engineID, keyData) => {
  const suppress = true;
  const propagate = false;
  const key = keyData.key;
  // If the compose key is a non-locking modifier, fire the compose event on
  // keyup so that it still works as a modifier. (Pressing some other key while
  // holding the compose key cancels the compose-on-key-up action.)
  //
  // Otherwise, fire the compose event on keydown so that we correctly suppress
  // its regular action.
  //
  // On ChromeOS, the Meta key by itself is an accelerator, so don't treat it as
  // a transient modifier.
  let isModifier = modifierKeys.has(key);
  const isLock = isModifier && key.endsWith('Lock');
  let isComposeEvent = false;
  if (keyData.code == composeKey) {
    if (keyData.type == 'keyup') {
      isComposeEvent = composeOnKeyUp;
    } else {
      if (isModifier && keepModifier) {
        composeOnKeyUp = true;
        // Propagate the modifier event so that the key will correctly modify
        // other keystrokes.
        return propagate;
      }
      isComposeEvent = true;
      isModifier = false;
    }
  } else if (keyData.type == 'keydown') {
    composeOnKeyUp = false;
  }
  if (keyData.type == 'keyup' && !isComposeEvent) {
    if (keyDownSuppressed.has(key)) {
      keyDownSuppressed.delete(key);
      return suppress;
    }
    return propagate;
  }
  const syms = isComposeEvent ? ['Multi_key'] : eventToSyms(keyData);
  for (let sym of syms) {
    let nextStates = [];
    let finalResult = null;
    for (let state of states) {
      for (let candidate of (state.nextKeys[sym] || [])) {
        if (!candidate.mods.match(keyData)) continue;
        nextStates.push(candidate);
        finalResult = candidate.result;
      }
    }
    if (nextStates.length == 0) {
      // The key does not extend any candidate sequence. If we haven't consumed
      // any keystrokes yet, or the key is a modifier for the next keystroke,
      // propagate it; otherwise, suppress it as normal.
      if (!composing || isModifier) return propagate;
      states = [rootState];
      composing = false;
      break;
    }
    if (finalResult != null) {
      // Work around https://crbug.com/826884: suppress the keystroke
      // before calling commitText instead of waiting until we return.
      if (!isModifier || isLock) {
        chrome.input.ime.keyEventHandled(keyData.requestId, true);
      }
      finalResult.send(keyData);
      states = [rootState];
      composing = false;
      continue;
    }
    states = nextStates;
    composing = true;
  }
  if (isModifier && !isLock) return propagate;
  if (keyData.type == 'keydown') {
    keyDownSuppressed.add(key);
  }
  return suppress;
})
