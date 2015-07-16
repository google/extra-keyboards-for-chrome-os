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

var States = { WAITING_FOR_COMPOSE_KEY: 0, COMPOSING : 1};

var state = States.WAITING_FOR_COMPOSE_KEY;
var contextID = -1;
var keysMemory = [];
var sequenceMaxLength = 3;

var lut = {
" ": "\u00a0", // nobreakspace # NO-BREAK SPACE
"!!": "\u00a1", // exclamdown # INVERTED EXCLAMATION MARK
"|c": "\u00a2", // CENT SIGN
"c|": "\u00a2", // CENT SIGN
"c/": "\u00a2", // CENT SIGN
"/c": "\u00a2", // CENT SIGN
"L-": "\u00a3", // POUND SIGN
"-L": "\u00a3", // POUND SIGN
"ox": "\u00a4", // currency # CURRENCY SIGN
"xo": "\u00a4", // currency # CURRENCY SIGN
"Y=": "\u00a5", // yen # YEN SIGN
"=Y": "\u00a5", // yen # YEN SIGN
"!^": "\u00a6", // brokenbar # BROKEN BAR
"so": "\u00a7", // section # SECTION SIGN
"os": "\u00a7", // section # SECTION SIGN
"oc": "\u00a9", // copyright # COPYRIGHT SIGN
"oC": "\u00a9", // copyright # COPYRIGHT SIGN
"Oc": "\u00a9", // copyright # COPYRIGHT SIGN
"OC": "\u00a9", // copyright # COPYRIGHT SIGN
"^_a": "\u00aa", // FEMININE ORDINAL INDICATOR
"<<": "\u00ab", // guillemotleft # LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
",-": "\u00ac", // NOT SIGN
"-,": "\u00ac", // NOT SIGN
"or": "\u00ae", // registered # REGISTERED SIGN
"oR": "\u00ae", // registered # REGISTERED SIGN
"Or": "\u00ae", // registered # REGISTERED SIGN
"OR": "\u00ae", // registered # REGISTERED SIGN
"oo": "\u00b0", // degree # DEGREE SIGN
"+-": "\u00b1", // plusminus # PLUS-MINUS SIGN
"^2": "\u00b2", // SUPERSCRIPT TWO
"^3": "\u00b3", // SUPERSCRIPT THREE
"mu": "\u00b5", // MICRO SIGN
"p!": "\u00b6", // paragraph # PILCROW SIGN
"P!": "\u00b6", // paragraph # PILCROW SIGN
"PP": "\u00b6", // paragraph # PILCROW SIGN
"..": "\u00b7", // MIDDLE DOT
", ": "\u00b8", // cedilla # CEDILLA
" ,": "\u00b8", // cedilla # CEDILLA
"^1": "\u00b9", // SUPERSCRIPT ONE
"^_o": "\u00ba", // MASCULINE ORDINAL INDICATOR
">>": "\u00bb", // guillemotright # RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
"14": "\u00bc", // VULGAR FRACTION ONE QUARTER
"12": "\u00bd", // VULGAR FRACTION ONE HALF
"34": "\u00be", // VULGAR FRACTION THREE QUARTERS
"??": "\u00bf", // questiondown # INVERTED QUESTION MARK
"`A": "\u00c0", // LATIN CAPITAL LETTER A WITH GRAVE
"'A": "\u00c1", // LATIN CAPITAL LETTER A WITH ACUTE
"^A": "\u00c2", // LATIN CAPITAL LETTER A WITH CIRCUMFLEX
"~A": "\u00c3", // LATIN CAPITAL LETTER A WITH TILDE
"\"A": "\u00c4", // LATIN CAPITAL LETTER A WITH DIAERESIS
"oA": "\u00c5", // LATIN CAPITAL LETTER A WITH RING ABOVE
"AE": "\u00c6", // AE # LATIN CAPITAL LETTER AE
",C": "\u00c7", // LATIN CAPITAL LETTER C WITH CEDILLA
"`E": "\u00c8", // LATIN CAPITAL LETTER E WITH GRAVE
"'E": "\u00c9", // LATIN CAPITAL LETTER E WITH ACUTE
"^E": "\u00ca", // LATIN CAPITAL LETTER E WITH CIRCUMFLEX
"\"E": "\u00cb", // LATIN CAPITAL LETTER E WITH DIAERESIS
"`I": "\u00cc", // LATIN CAPITAL LETTER I WITH GRAVE
"'I": "\u00cd", // LATIN CAPITAL LETTER I WITH ACUTE
"^I": "\u00ce", // LATIN CAPITAL LETTER I WITH CIRCUMFLEX
"\"I": "\u00cf", // LATIN CAPITAL LETTER I WITH DIAERESIS
"DH": "\u00d0", // LATIN CAPITAL LETTER ETH
"~N": "\u00d1", // LATIN CAPITAL LETTER N WITH TILDE
"`O": "\u00d2", // LATIN CAPITAL LETTER O WITH GRAVE
"'O": "\u00d3", // LATIN CAPITAL LETTER O WITH ACUTE
"^O": "\u00d4", // LATIN CAPITAL LETTER O WITH CIRCUMFLEX
"~O": "\u00d5", // LATIN CAPITAL LETTER O WITH TILDE
"\"O": "\u00d6", // LATIN CAPITAL LETTER O WITH DIAERESIS
"xx": "\u00d7", // MULTIPLICATION SIGN
"/O": "\u00d8", // LATIN CAPITAL LETTER O WITH STROKE
"`U": "\u00d9", // LATIN CAPITAL LETTER U WITH GRAVE
"'U": "\u00da", // LATIN CAPITAL LETTER U WITH ACUTE
"^U": "\u00db", // LATIN CAPITAL LETTER U WITH CIRCUMFLEX
"\"U": "\u00dc", // LATIN CAPITAL LETTER U WITH DIAERESIS
"'Y": "\u00dd", // LATIN CAPITAL LETTER Y WITH ACUTE
"TH": "\u00de", // LATIN CAPITAL LETTER THORN
"ss": "\u00df", // ssharp # LATIN SMALL LETTER SHARP S
"`a": "\u00e0", // LATIN SMALL LETTER A WITH GRAVE
"'a": "\u00e1", // LATIN SMALL LETTER A WITH ACUTE
"^a": "\u00e2", // LATIN SMALL LETTER A WITH CIRCUMFLEX
"~a": "\u00e3", // LATIN SMALL LETTER A WITH TILDE
"\"a": "\u00e4", // LATIN SMALL LETTER A WITH DIAERESIS
"oa": "\u00e5", // LATIN SMALL LETTER A WITH RING ABOVE
"ae": "\u00e6", // ae # LATIN SMALL LETTER AE
",c": "\u00e7", // LATIN SMALL LETTER C WITH CEDILLA
"`e": "\u00e8", // LATIN SMALL LETTER E WITH GRAVE
"'e": "\u00e9", // LATIN SMALL LETTER E WITH ACUTE
"^e": "\u00ea", // LATIN SMALL LETTER E WITH CIRCUMFLEX
"\"e": "\u00eb", // LATIN SMALL LETTER E WITH DIAERESIS
"`i": "\u00ec", // LATIN SMALL LETTER I WITH GRAVE
"'i": "\u00ed", // LATIN SMALL LETTER I WITH ACUTE
"^i": "\u00ee", // LATIN SMALL LETTER I WITH CIRCUMFLEX
"\"i": "\u00ef", // LATIN SMALL LETTER I WITH DIAERESIS
"dh": "\u00f0", // LATIN SMALL LETTER ETH
"~n": "\u00f1", // LATIN SMALL LETTER N WITH TILDE
"`o": "\u00f2", // LATIN SMALL LETTER O WITH GRAVE
"'o": "\u00f3", // LATIN SMALL LETTER O WITH ACUTE
"^o": "\u00f4", // LATIN SMALL LETTER O WITH CIRCUMFLEX
"~o": "\u00f5", // LATIN SMALL LETTER O WITH TILDE
"\"o": "\u00f6", // LATIN SMALL LETTER O WITH DIAERESIS
":-": "\u00f7", // DIVISION SIGN
"-:": "\u00f7", // DIVISION SIGN
"/o": "\u00f8", // LATIN SMALL LETTER O WITH STROKE
"`u": "\u00f9", // LATIN SMALL LETTER U WITH GRAVE
"'u": "\u00fa", // LATIN SMALL LETTER U WITH ACUTE
"^u": "\u00fb", // LATIN SMALL LETTER U WITH CIRCUMFLEX
"\"u": "\u00fc", // LATIN SMALL LETTER U WITH DIAERESIS
"'y": "\u00fd", // LATIN SMALL LETTER Y WITH ACUTE
"th": "\u00fe", // LATIN SMALL LETTER THORN
"\"y": "\u00ff", // LATIN SMALL LETTER Y WITH DIAERESIS
"_A": "\u0100", // LATIN CAPITAL LETTER A WITH MACRON
"_a": "\u0101", // LATIN SMALL LETTER A WITH MACRON
"UA": "\u0102", // LATIN CAPITAL LETTER A WITH BREVE
"bA": "\u0102", // LATIN CAPITAL LETTER A WITH BREVE
"Ua": "\u0103", // LATIN SMALL LETTER A WITH BREVE
"ba": "\u0103", // LATIN SMALL LETTER A WITH BREVE
";A": "\u0104", // LATIN CAPITAL LETTER A WITH OGONEK
";a": "\u0105", // LATIN SMALL LETTER A WITH OGONEK
"'C": "\u0106", // LATIN CAPITAL LETTER C WITH ACUTE
"'c": "\u0107", // LATIN SMALL LETTER C WITH ACUTE
"^C": "\u0108", // LATIN CAPITAL LETTER C WITH CIRCUMFLEX
"^c": "\u0109", // LATIN SMALL LETTER C WITH CIRCUMFLEX
"cC": "\u010c", // LATIN CAPITAL LETTER C WITH CARON
"cc": "\u010d", // LATIN SMALL LETTER C WITH CARON
"cD": "\u010e", // LATIN CAPITAL LETTER D WITH CARON
"cd": "\u010f", // LATIN SMALL LETTER D WITH CARON
"-D": "\u0110", // Dstroke # LATIN CAPITAL LETTER D WITH STROKE
"/D": "\u0110", // Dstroke # LATIN CAPITAL LETTER D WITH STROKE
"-d": "\u0111", // dstroke # LATIN SMALL LETTER D WITH STROKE
"/d": "\u0111", // dstroke # LATIN SMALL LETTER D WITH STROKE
"_E": "\u0112", // LATIN CAPITAL LETTER E WITH MACRON
"_e": "\u0113", // LATIN SMALL LETTER E WITH MACRON
"UE": "\u0114", // LATIN CAPITAL LETTER E WITH BREVE
"bE": "\u0114", // LATIN CAPITAL LETTER E WITH BREVE
"Ue": "\u0115", // LATIN SMALL LETTER E WITH BREVE
"be": "\u0115", // LATIN SMALL LETTER E WITH BREVE
";E": "\u0118", // LATIN CAPITAL LETTER E WITH OGONEK
";e": "\u0119", // LATIN SMALL LETTER E WITH OGONEK
"cE": "\u011a", // LATIN CAPITAL LETTER E WITH CARON
"ce": "\u011b", // LATIN SMALL LETTER E WITH CARON
"^G": "\u011c", // LATIN CAPITAL LETTER G WITH CIRCUMFLEX
"^g": "\u011d", // LATIN SMALL LETTER G WITH CIRCUMFLEX
"UG": "\u011e", // LATIN CAPITAL LETTER G WITH BREVE
"bG": "\u011e", // LATIN CAPITAL LETTER G WITH BREVE
"Ug": "\u011f", // LATIN SMALL LETTER G WITH BREVE
"bg": "\u011f", // LATIN SMALL LETTER G WITH BREVE
",G": "\u0122", // LATIN CAPITAL LETTER G WITH CEDILLA
",g": "\u0123", // LATIN SMALL LETTER G WITH CEDILLA
"^H": "\u0124", // LATIN CAPITAL LETTER H WITH CIRCUMFLEX
"^h": "\u0125", // LATIN SMALL LETTER H WITH CIRCUMFLEX
"/H": "\u0126", // LATIN CAPITAL LETTER H WITH STROKE
"/h": "\u0127", // LATIN SMALL LETTER H WITH STROKE
"~I": "\u0128", // LATIN CAPITAL LETTER I WITH TILDE
"~i": "\u0129", // LATIN SMALL LETTER I WITH TILDE
"_I": "\u012a", // LATIN CAPITAL LETTER I WITH MACRON
"_i": "\u012b", // LATIN SMALL LETTER I WITH MACRON
"UI": "\u012c", // LATIN CAPITAL LETTER I WITH BREVE
"bI": "\u012c", // LATIN CAPITAL LETTER I WITH BREVE
"Ui": "\u012d", // LATIN SMALL LETTER I WITH BREVE
"bi": "\u012d", // LATIN SMALL LETTER I WITH BREVE
";I": "\u012e", // LATIN CAPITAL LETTER I WITH OGONEK
";i": "\u012f", // LATIN SMALL LETTER I WITH OGONEK
"i.": "\u0131", // LATIN SMALL LETTER DOTLESS I
"^J": "\u0134", // LATIN CAPITAL LETTER J WITH CIRCUMFLEX
"^j": "\u0135", // LATIN SMALL LETTER J WITH CIRCUMFLEX
",K": "\u0136", // LATIN CAPITAL LETTER K WITH CEDILLA
",k": "\u0137", // LATIN SMALL LETTER K WITH CEDILLA
"kk": "\u0138", // LATIN SMALL LETTER KRA
"'L": "\u0139", // LATIN CAPITAL LETTER L WITH ACUTE
"'l": "\u013a", // LATIN SMALL LETTER L WITH ACUTE
",L": "\u013b", // LATIN CAPITAL LETTER L WITH CEDILLA
",l": "\u013c", // LATIN SMALL LETTER L WITH CEDILLA
"cL": "\u013d", // LATIN CAPITAL LETTER L WITH CARON
"cl": "\u013e", // LATIN SMALL LETTER L WITH CARON
"/L": "\u0141", // LATIN CAPITAL LETTER L WITH STROKE
"/l": "\u0142", // LATIN SMALL LETTER L WITH STROKE
"'N": "\u0143", // LATIN CAPITAL LETTER N WITH ACUTE
"'n": "\u0144", // LATIN SMALL LETTER N WITH ACUTE
",N": "\u0145", // LATIN CAPITAL LETTER N WITH CEDILLA
",n": "\u0146", // LATIN SMALL LETTER N WITH CEDILLA
"cN": "\u0147", // LATIN CAPITAL LETTER N WITH CARON
"cn": "\u0148", // LATIN SMALL LETTER N WITH CARON
"NG": "\u014a", // LATIN CAPITAL LETTER ENG
"ng": "\u014b", // LATIN SMALL LETTER ENG
"_O": "\u014c", // LATIN CAPITAL LETTER O WITH MACRON
"_o": "\u014d", // LATIN SMALL LETTER O WITH MACRON
"UO": "\u014e", // LATIN CAPITAL LETTER O WITH BREVE
"bO": "\u014e", // LATIN CAPITAL LETTER O WITH BREVE
"Uo": "\u014f", // LATIN SMALL LETTER O WITH BREVE
"bo": "\u014f", // LATIN SMALL LETTER O WITH BREVE
"=O": "\u0150", // LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
"=o": "\u0151", // LATIN SMALL LETTER O WITH DOUBLE ACUTE
"OE": "\u0152", // OE # LATIN CAPITAL LIGATURE OE
"oe": "\u0153", // oe # LATIN SMALL LIGATURE OE
"'R": "\u0154", // LATIN CAPITAL LETTER R WITH ACUTE
"'r": "\u0155", // LATIN SMALL LETTER R WITH ACUTE
",R": "\u0156", // LATIN CAPITAL LETTER R WITH CEDILLA
",r": "\u0157", // LATIN SMALL LETTER R WITH CEDILLA
"cR": "\u0158", // LATIN CAPITAL LETTER R WITH CARON
"cr": "\u0159", // LATIN SMALL LETTER R WITH CARON
"'S": "\u015a", // LATIN CAPITAL LETTER S WITH ACUTE
"'s": "\u015b", // LATIN SMALL LETTER S WITH ACUTE
"^S": "\u015c", // LATIN CAPITAL LETTER S WITH CIRCUMFLEX
"^s": "\u015d", // LATIN SMALL LETTER S WITH CIRCUMFLEX
",S": "\u015e", // LATIN CAPITAL LETTER S WITH CEDILLA
",s": "\u015f", // LATIN SMALL LETTER S WITH CEDILLA
"cS": "\u0160", // LATIN CAPITAL LETTER S WITH CARON
"cs": "\u0161", // LATIN SMALL LETTER S WITH CARON
",T": "\u0162", // LATIN CAPITAL LETTER T WITH CEDILLA
",t": "\u0163", // LATIN SMALL LETTER T WITH CEDILLA
"cT": "\u0164", // LATIN CAPITAL LETTER T WITH CARON
"ct": "\u0165", // LATIN SMALL LETTER T WITH CARON
"/T": "\u0166", // LATIN CAPITAL LETTER T WITH STROKE
"/t": "\u0167", // LATIN SMALL LETTER T WITH STROKE
"~U": "\u0168", // LATIN CAPITAL LETTER U WITH TILDE
"~u": "\u0169", // LATIN SMALL LETTER U WITH TILDE
"_U": "\u016a", // LATIN CAPITAL LETTER U WITH MACRON
"_u": "\u016b", // LATIN SMALL LETTER U WITH MACRON
"UU": "\u016c", // LATIN CAPITAL LETTER U WITH BREVE
"bU": "\u016c", // LATIN CAPITAL LETTER U WITH BREVE
"Uu": "\u016d", // LATIN SMALL LETTER U WITH BREVE
"bu": "\u016d", // LATIN SMALL LETTER U WITH BREVE
"oU": "\u016e", // LATIN CAPITAL LETTER U WITH RING ABOVE
"ou": "\u016f", // LATIN SMALL LETTER U WITH RING ABOVE
"=U": "\u0170", // LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
"=u": "\u0171", // LATIN SMALL LETTER U WITH DOUBLE ACUTE
";U": "\u0172", // LATIN CAPITAL LETTER U WITH OGONEK
";u": "\u0173", // LATIN SMALL LETTER U WITH OGONEK
"^W": "\u0174", // LATIN CAPITAL LETTER W WITH CIRCUMFLEX
"^w": "\u0175", // LATIN SMALL LETTER W WITH CIRCUMFLEX
"^Y": "\u0176", // LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
"^y": "\u0177", // LATIN SMALL LETTER Y WITH CIRCUMFLEX
"\"Y": "\u0178", // LATIN CAPITAL LETTER Y WITH DIAERESIS
"'Z": "\u0179", // LATIN CAPITAL LETTER Z WITH ACUTE
"'z": "\u017a", // LATIN SMALL LETTER Z WITH ACUTE
"cZ": "\u017d", // LATIN CAPITAL LETTER Z WITH CARON
"cz": "\u017e", // LATIN SMALL LETTER Z WITH CARON
"fs": "\u017f", // LATIN SMALL LETTER LONG S
"fS": "\u017f", // LATIN SMALL LETTER LONG S
"/b": "\u0180", // LATIN SMALL LETTER B WITH STROKE
"/I": "\u0197", // LATIN CAPITAL LETTER I WITH STROKE
"/Z": "\u01b5", // LATIN CAPITAL LETTER Z WITH STROKE
"/z": "\u01b6", // LATIN SMALL LETTER Z WITH STROKE
"cA": "\u01cd", // LATIN CAPITAL LETTER A WITH CARON
"ca": "\u01ce", // LATIN SMALL LETTER A WITH CARON
"cI": "\u01cf", // LATIN CAPITAL LETTER I WITH CARON
"ci": "\u01d0", // LATIN SMALL LETTER I WITH CARON
"cO": "\u01d1", // LATIN CAPITAL LETTER O WITH CARON
"co": "\u01d2", // LATIN SMALL LETTER O WITH CARON
"cU": "\u01d3", // LATIN CAPITAL LETTER U WITH CARON
"cu": "\u01d4", // LATIN SMALL LETTER U WITH CARON
"/G": "\u01e4", // LATIN CAPITAL LETTER G WITH STROKE
"/g": "\u01e5", // LATIN SMALL LETTER G WITH STROKE
"cG": "\u01e6", // LATIN CAPITAL LETTER G WITH CARON
"cg": "\u01e7", // LATIN SMALL LETTER G WITH CARON
"cK": "\u01e8", // LATIN CAPITAL LETTER K WITH CARON
"ck": "\u01e9", // LATIN SMALL LETTER K WITH CARON
";O": "\u01ea", // LATIN CAPITAL LETTER O WITH OGONEK
";o": "\u01eb", // LATIN SMALL LETTER O WITH OGONEK
"cj": "\u01f0", // LATIN SMALL LETTER J WITH CARON
"'G": "\u01f4", // LATIN CAPITAL LETTER G WITH ACUTE
"'g": "\u01f5", // LATIN SMALL LETTER G WITH ACUTE
"`N": "\u01f8", // LATIN CAPITAL LETTER N WITH GRAVE
"`n": "\u01f9", // LATIN SMALL LETTER N WITH GRAVE
"cH": "\u021e", // LATIN CAPITAL LETTER H WITH CARON
"ch": "\u021f", // LATIN SMALL LETTER H WITH CARON
",E": "\u0228", // LATIN CAPITAL LETTER E WITH CEDILLA
",e": "\u0229", // LATIN SMALL LETTER E WITH CEDILLA
"_Y": "\u0232", // LATIN CAPITAL LETTER Y WITH MACRON
"_y": "\u0233", // LATIN SMALL LETTER Y WITH MACRON
"ee": "\u0259", // LATIN SMALL LETTER SCHWA
"/i": "\u0268", // LATIN SMALL LETTER I WITH STROKE
",D": "\u1e10", // LATIN CAPITAL LETTER D WITH CEDILLA
",d": "\u1e11", // LATIN SMALL LETTER D WITH CEDILLA
"_G": "\u1e20", // LATIN CAPITAL LETTER G WITH MACRON
"_g": "\u1e21", // LATIN SMALL LETTER G WITH MACRON
"\"H": "\u1e26", // LATIN CAPITAL LETTER H WITH DIAERESIS
"\"h": "\u1e27", // LATIN SMALL LETTER H WITH DIAERESIS
",H": "\u1e28", // LATIN CAPITAL LETTER H WITH CEDILLA
",h": "\u1e29", // LATIN SMALL LETTER H WITH CEDILLA
"'K": "\u1e30", // LATIN CAPITAL LETTER K WITH ACUTE
"'k": "\u1e31", // LATIN SMALL LETTER K WITH ACUTE
"'M": "\u1e3e", // LATIN CAPITAL LETTER M WITH ACUTE
"'m": "\u1e3f", // LATIN SMALL LETTER M WITH ACUTE
"'P": "\u1e54", // LATIN CAPITAL LETTER P WITH ACUTE
"'p": "\u1e55", // LATIN SMALL LETTER P WITH ACUTE
"~V": "\u1e7c", // LATIN CAPITAL LETTER V WITH TILDE
"~v": "\u1e7d", // LATIN SMALL LETTER V WITH TILDE
"`W": "\u1e80", // LATIN CAPITAL LETTER W WITH GRAVE
"`w": "\u1e81", // LATIN SMALL LETTER W WITH GRAVE
"'W": "\u1e82", // LATIN CAPITAL LETTER W WITH ACUTE
"'w": "\u1e83", // LATIN SMALL LETTER W WITH ACUTE
"\"W": "\u1e84", // LATIN CAPITAL LETTER W WITH DIAERESIS
"\"w": "\u1e85", // LATIN SMALL LETTER W WITH DIAERESIS
"\"X": "\u1e8c", // LATIN CAPITAL LETTER X WITH DIAERESIS
"\"x": "\u1e8d", // LATIN SMALL LETTER X WITH DIAERESIS
"^Z": "\u1e90", // LATIN CAPITAL LETTER Z WITH CIRCUMFLEX
"^z": "\u1e91", // LATIN SMALL LETTER Z WITH CIRCUMFLEX
"\"t": "\u1e97", // LATIN SMALL LETTER T WITH DIAERESIS
"ow": "\u1e98", // LATIN SMALL LETTER W WITH RING ABOVE
"oy": "\u1e99", // LATIN SMALL LETTER Y WITH RING ABOVE
"~E": "\u1ebc", // LATIN CAPITAL LETTER E WITH TILDE
"~e": "\u1ebd", // LATIN SMALL LETTER E WITH TILDE
"`Y": "\u1ef2", // LATIN CAPITAL LETTER Y WITH GRAVE
"`y": "\u1ef3", // LATIN SMALL LETTER Y WITH GRAVE
"~Y": "\u1ef8", // LATIN CAPITAL LETTER Y WITH TILDE
"~y": "\u1ef9", // LATIN SMALL LETTER Y WITH TILDE
" .": "\u2008", // PUNCTUATION SPACE
"--.": "\u2013", // EN DASH
"---": "\u2014", // EM DASH
"<'": "\u2018", // LEFT SINGLE QUOTATION MARK
"'<": "\u2018", // LEFT SINGLE QUOTATION MARK
">'": "\u2019", // RIGHT SINGLE QUOTATION MARK
"'>": "\u2019", // RIGHT SINGLE QUOTATION MARK
",'": "\u201a", // SINGLE LOW-9 QUOTATION MARK
"',": "\u201a", // SINGLE LOW-9 QUOTATION MARK
"<\"": "\u201c", // LEFT DOUBLE QUOTATION MARK
"\"<": "\u201c", // LEFT DOUBLE QUOTATION MARK
">\"": "\u201d", // RIGHT DOUBLE QUOTATION MARK
"\">": "\u201d", // RIGHT DOUBLE QUOTATION MARK
",\"": "\u201e", // DOUBLE LOW-9 QUOTATION MARK
"\",": "\u201e", // DOUBLE LOW-9 QUOTATION MARK
"%o": "\u2030", // PER MILLE SIGN
".<": "\u2039", // SINGLE LEFT-POINTING ANGLE QUOTATION MARK
".>": "\u203a", // SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
"^0": "\u2070", // SUPERSCRIPT ZERO
"^_i": "\u2071", // SUPERSCRIPT LATIN SMALL LETTER I
"^4": "\u2074", // SUPERSCRIPT FOUR
"^5": "\u2075", // SUPERSCRIPT FIVE
"^6": "\u2076", // SUPERSCRIPT SIX
"^7": "\u2077", // SUPERSCRIPT SEVEN
"^8": "\u2078", // SUPERSCRIPT EIGHT
"^9": "\u2079", // SUPERSCRIPT NINE
"^+": "\u207a", // SUPERSCRIPT PLUS SIGN
"^=": "\u207c", // SUPERSCRIPT EQUALS SIGN
"^(": "\u207d", // SUPERSCRIPT LEFT PARENTHESIS
"^)": "\u207e", // SUPERSCRIPT RIGHT PARENTHESIS
"^_n": "\u207f", // SUPERSCRIPT LATIN SMALL LETTER N
"_0": "\u2080", // SUBSCRIPT ZERO
"_1": "\u2081", // SUBSCRIPT ONE
"_2": "\u2082", // SUBSCRIPT TWO
"_3": "\u2083", // SUBSCRIPT THREE
"_4": "\u2084", // SUBSCRIPT FOUR
"_5": "\u2085", // SUBSCRIPT FIVE
"_6": "\u2086", // SUBSCRIPT SIX
"_7": "\u2087", // SUBSCRIPT SEVEN
"_8": "\u2088", // SUBSCRIPT EIGHT
"_9": "\u2089", // SUBSCRIPT NINE
"_+": "\u208a", // SUBSCRIPT PLUS SIGN
"_=": "\u208c", // SUBSCRIPT EQUALS SIGN
"_(": "\u208d", // SUBSCRIPT LEFT PARENTHESIS
"_)": "\u208e", // SUBSCRIPT RIGHT PARENTHESIS
"CE": "\u20a0", // EURO-CURRENCY SIGN
"C/": "\u20a1", // COLON SIGN
"/C": "\u20a1", // COLON SIGN
"Cr": "\u20a2", // CRUZEIRO SIGN
"Fr": "\u20a3", // FRENCH FRANC SIGN
"L=": "\u20a4", // LIRA SIGN
"=L": "\u20a4", // LIRA SIGN
"m/": "\u20a5", // MILL SIGN
"/m": "\u20a5", // MILL SIGN
"N=": "\u20a6", // NAIRA SIGN
"=N": "\u20a6", // NAIRA SIGN
"Pt": "\u20a7", // PESETA SIGN
"Rs": "\u20a8", // RUPEE SIGN
"W=": "\u20a9", // WON SIGN
"=W": "\u20a9", // WON SIGN
"d-": "\u20ab", // DONG SIGN
"C=": "\u20ac", // EuroSign # EURO SIGN
"=C": "\u20ac", // EuroSign # EURO SIGN
"c=": "\u20ac", // EuroSign # EURO SIGN
"=c": "\u20ac", // EuroSign # EURO SIGN
"E=": "\u20ac", // EuroSign # EURO SIGN
"=E": "\u20ac", // EuroSign # EURO SIGN
"^SM": "\u2120", // SERVICE MARK
"^TM": "\u2122", // TRADE MARK SIGN
"<-": "\u2190", // LEFTWARDS ARROW
"->": "\u2192", // RIGHTWARDS ARROW
"\\\\": "\u301d", // REVERSED DOUBLE PRIME QUOTATION MARK
"//": "\u301e", // DOUBLE PRIME QUOTATION MARK
};
    
function initialize(currentContextID) {
    state = States.WAITING_FOR_COMPOSE_KEY;
    contextID = currentContextID;
    keysMemory = [];
 
}


chrome.input.ime.onFocus.addListener(function(context) {
  initialize(context.contextID);
});

chrome.input.ime.onBlur.addListener(function(context) {
  initialize(-1);
});

function isPrintableKey(key) {
  var charCode = key.charCodeAt(0);
  return charCode >= 32 && charCode <= 126;
}

function memorizeKey(keyData) {
 if (keyData.type == "keyup" || isPureModifier(keyData)) return false;
 
  if (isPrintableKey(keyData.key)) {
    keysMemory.push(keyData.key);
    return true;
  }
  
  return false;
}

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
}

function resetComposition() {
  state = States.WAITING_FOR_COMPOSE_KEY;
  keysMemory = [];
}

function getComposition() {
  return keysMemory.join("");
}

function compositionDone() {
  var composition = getComposition();
  return (lut[composition] != undefined) || composition.length > sequenceMaxLength;
}
  
function unravelComposition() {
  var handled = false;
  var composition = getComposition();
  
  if (lut[composition]) {
        chrome.input.ime.commitText({"contextID": contextID, "text": lut[composition]});   
  }
  
  resetComposition();
}


chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      var isComposeKeyDownEvent = (keyData.code == "AltRight" && keyData.type == "keydown");
      if (isComposeKeyDownEvent) {
        switch (state) {
          case States.WAITING_FOR_COMPOSE_KEY:
            state = States.COMPOSING;
            handled = true;
            break;
          case States.COMPOSING:
            // Break out of Compose mode on extra Compose key press.
            resetComposition();
            handled = true;
            break;
          default:
            break;
        }
        return handled;
      }

      if (state == States.COMPOSING) {
        if (memorizeKey(keyData)) {
         handled = true;
         if (compositionDone()) {
            unravelComposition();
         }
        }
      }
      
      return handled;
});
