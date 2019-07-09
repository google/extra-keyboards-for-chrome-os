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

/** @type {Object<string, string>} */
let builtinSequences = {
"  ": "\u00a0", // nobreakspace # NO-BREAK SPACE
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
"^_a": "\u00aa", // ordfeminine # FEMININE ORDINAL INDICATOR
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
".-": "\u00b7", // MIDDLE DOT
".=": "\u2022", // BULLET
"..": "\u2026", // HORIZONTAL ELLIPSIS
", ": "\u00b8", // cedilla # CEDILLA
" ,": "\u00b8", // cedilla # CEDILLA
",,": "\u00b8", // cedilla # CEDILLA
"^1": "\u00b9", // SUPERSCRIPT ONE
"^_o": "\u00ba", // MASCULINE ORDINAL INDICATOR
">>": "\u00bb", // guillemotright # RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
"14": "\u00bc", // VULGAR FRACTION ONE QUARTER
"12": "\u00bd", // VULGAR FRACTION ONE HALF
"34": "\u00be", // VULGAR FRACTION THREE QUARTERS
"??": "\u00bf", // questiondown # INVERTED QUESTION MARK
"`A": "\u00c0", // LATIN CAPITAL LETTER A WITH GRAVE
"A`": "\u00c0", // LATIN CAPITAL LETTER A WITH GRAVE
"'A": "\u00c1", // LATIN CAPITAL LETTER A WITH ACUTE
"A'": "\u00c1", // LATIN CAPITAL LETTER A WITH ACUTE
"^A": "\u00c2", // LATIN CAPITAL LETTER A WITH CIRCUMFLEX
">A": "\u00c2", // LATIN CAPITAL LETTER A WITH CIRCUMFLEX
"A>": "\u00c2", // LATIN CAPITAL LETTER A WITH CIRCUMFLEX
"~A": "\u00c3", // LATIN CAPITAL LETTER A WITH TILDE
"A~": "\u00c3", // LATIN CAPITAL LETTER A WITH TILDE
"\"A": "\u00c4", // LATIN CAPITAL LETTER A WITH DIAERESIS
"A\"": "\u00c4", // LATIN CAPITAL LETTER A WITH DIAERESIS
"oA": "\u00c5", // LATIN CAPITAL LETTER A WITH RING ABOVE
"*A": "\u00c5", // LATIN CAPITAL LETTER A WITH RING ABOVE
"A*": "\u00c5", // LATIN CAPITAL LETTER A WITH RING ABOVE
"AA": "\u00c5", // LATIN CAPITAL LETTER A WITH RING ABOVE
"AE": "\u00c6", // AE # LATIN CAPITAL LETTER AE
",C": "\u00c7", // LATIN CAPITAL LETTER C WITH CEDILLA
"C,": "\u00c7", // LATIN CAPITAL LETTER C WITH CEDILLA
"`E": "\u00c8", // LATIN CAPITAL LETTER E WITH GRAVE
"E`": "\u00c8", // LATIN CAPITAL LETTER E WITH GRAVE
"'E": "\u00c9", // LATIN CAPITAL LETTER E WITH ACUTE
"E'": "\u00c9", // LATIN CAPITAL LETTER E WITH ACUTE
"^E": "\u00ca", // LATIN CAPITAL LETTER E WITH CIRCUMFLEX
">E": "\u00ca", // LATIN CAPITAL LETTER E WITH CIRCUMFLEX
"E>": "\u00ca", // LATIN CAPITAL LETTER E WITH CIRCUMFLEX
"\"E": "\u00cb", // LATIN CAPITAL LETTER E WITH DIAERESIS
"E\"": "\u00cb", // LATIN CAPITAL LETTER E WITH DIAERESIS
"`I": "\u00cc", // LATIN CAPITAL LETTER I WITH GRAVE
"I`": "\u00cc", // LATIN CAPITAL LETTER I WITH GRAVE
"'I": "\u00cd", // LATIN CAPITAL LETTER I WITH ACUTE
"I'": "\u00cd", // LATIN CAPITAL LETTER I WITH ACUTE
"^I": "\u00ce", // LATIN CAPITAL LETTER I WITH CIRCUMFLEX
">I": "\u00ce", // LATIN CAPITAL LETTER I WITH CIRCUMFLEX
"I>": "\u00ce", // LATIN CAPITAL LETTER I WITH CIRCUMFLEX
"\"I": "\u00cf", // LATIN CAPITAL LETTER I WITH DIAERESIS
"I\"": "\u00cf", // LATIN CAPITAL LETTER I WITH DIAERESIS
"DH": "\u00d0", // LATIN CAPITAL LETTER ETH
"~N": "\u00d1", // LATIN CAPITAL LETTER N WITH TILDE
"N~": "\u00d1", // LATIN CAPITAL LETTER N WITH TILDE
"`O": "\u00d2", // LATIN CAPITAL LETTER O WITH GRAVE
"O`": "\u00d2", // LATIN CAPITAL LETTER O WITH GRAVE
"'O": "\u00d3", // LATIN CAPITAL LETTER O WITH ACUTE
"O'": "\u00d3", // LATIN CAPITAL LETTER O WITH ACUTE
"^O": "\u00d4", // LATIN CAPITAL LETTER O WITH CIRCUMFLEX
">O": "\u00d4", // LATIN CAPITAL LETTER O WITH CIRCUMFLEX
"O>": "\u00d4", // LATIN CAPITAL LETTER O WITH CIRCUMFLEX
"~O": "\u00d5", // LATIN CAPITAL LETTER O WITH TILDE
"O~": "\u00d5", // LATIN CAPITAL LETTER O WITH TILDE
"\"O": "\u00d6", // LATIN CAPITAL LETTER O WITH DIAERESIS
"O\"": "\u00d6", // LATIN CAPITAL LETTER O WITH DIAERESIS
"xx": "\u00d7", // MULTIPLICATION SIGN
"/O": "\u00d8", // LATIN CAPITAL LETTER O WITH STROKE
"O/": "\u00d8", // LATIN CAPITAL LETTER O WITH STROKE
"`U": "\u00d9", // LATIN CAPITAL LETTER U WITH GRAVE
"U`": "\u00d9", // LATIN CAPITAL LETTER U WITH GRAVE
"'U": "\u00da", // LATIN CAPITAL LETTER U WITH ACUTE
"U'": "\u00da", // LATIN CAPITAL LETTER U WITH ACUTE
"^U": "\u00db", // LATIN CAPITAL LETTER U WITH CIRCUMFLEX
">U": "\u00db", // LATIN CAPITAL LETTER U WITH CIRCUMFLEX
"U>": "\u00db", // LATIN CAPITAL LETTER U WITH CIRCUMFLEX
"\"U": "\u00dc", // LATIN CAPITAL LETTER U WITH DIAERESIS
"U\"": "\u00dc", // LATIN CAPITAL LETTER U WITH DIAERESIS
"'Y": "\u00dd", // LATIN CAPITAL LETTER Y WITH ACUTE
"Y'": "\u00dd", // LATIN CAPITAL LETTER Y WITH ACUTE
"TH": "\u00de", // LATIN CAPITAL LETTER THORN
"ss": "\u00df", // ssharp # LATIN SMALL LETTER SHARP S
"`a": "\u00e0", // LATIN SMALL LETTER A WITH GRAVE
"a`": "\u00e0", // LATIN SMALL LETTER A WITH GRAVE
"'a": "\u00e1", // LATIN SMALL LETTER A WITH ACUTE
"a'": "\u00e1", // LATIN SMALL LETTER A WITH ACUTE
"^a": "\u00e2", // LATIN SMALL LETTER A WITH CIRCUMFLEX
">a": "\u00e2", // LATIN SMALL LETTER A WITH CIRCUMFLEX
"a>": "\u00e2", // LATIN SMALL LETTER A WITH CIRCUMFLEX
"~a": "\u00e3", // LATIN SMALL LETTER A WITH TILDE
"a~": "\u00e3", // LATIN SMALL LETTER A WITH TILDE
"\"a": "\u00e4", // LATIN SMALL LETTER A WITH DIAERESIS
"a\"": "\u00e4", // LATIN SMALL LETTER A WITH DIAERESIS
"oa": "\u00e5", // LATIN SMALL LETTER A WITH RING ABOVE
"*a": "\u00e5", // LATIN SMALL LETTER A WITH RING ABOVE
"a*": "\u00e5", // LATIN SMALL LETTER A WITH RING ABOVE
"ae": "\u00e6", // ae # LATIN SMALL LETTER AE
",c": "\u00e7", // LATIN SMALL LETTER C WITH CEDILLA
"c,": "\u00e7", // LATIN SMALL LETTER C WITH CEDILLA
"`e": "\u00e8", // LATIN SMALL LETTER E WITH GRAVE
"e`": "\u00e8", // LATIN SMALL LETTER E WITH GRAVE
"'e": "\u00e9", // LATIN SMALL LETTER E WITH ACUTE
"e'": "\u00e9", // LATIN SMALL LETTER E WITH ACUTE
"^e": "\u00ea", // LATIN SMALL LETTER E WITH CIRCUMFLEX
">e": "\u00ea", // LATIN SMALL LETTER E WITH CIRCUMFLEX
"e>": "\u00ea", // LATIN SMALL LETTER E WITH CIRCUMFLEX
"\"e": "\u00eb", // LATIN SMALL LETTER E WITH DIAERESIS
"e\"": "\u00eb", // LATIN SMALL LETTER E WITH DIAERESIS
"`i": "\u00ec", // LATIN SMALL LETTER I WITH GRAVE
"i`": "\u00ec", // LATIN SMALL LETTER I WITH GRAVE
"'i": "\u00ed", // LATIN SMALL LETTER I WITH ACUTE
"i'": "\u00ed", // LATIN SMALL LETTER I WITH ACUTE
"^i": "\u00ee", // LATIN SMALL LETTER I WITH CIRCUMFLEX
">i": "\u00ee", // LATIN SMALL LETTER I WITH CIRCUMFLEX
"i>": "\u00ee", // LATIN SMALL LETTER I WITH CIRCUMFLEX
"\"i": "\u00ef", // LATIN SMALL LETTER I WITH DIAERESIS
"i\"": "\u00ef", // LATIN SMALL LETTER I WITH DIAERESIS
"dh": "\u00f0", // LATIN SMALL LETTER ETH
"~n": "\u00f1", // LATIN SMALL LETTER N WITH TILDE
"n~": "\u00f1", // LATIN SMALL LETTER N WITH TILDE
"`o": "\u00f2", // LATIN SMALL LETTER O WITH GRAVE
"o`": "\u00f2", // LATIN SMALL LETTER O WITH GRAVE
"'o": "\u00f3", // LATIN SMALL LETTER O WITH ACUTE
"o'": "\u00f3", // LATIN SMALL LETTER O WITH ACUTE
"^o": "\u00f4", // LATIN SMALL LETTER O WITH CIRCUMFLEX
">o": "\u00f4", // LATIN SMALL LETTER O WITH CIRCUMFLEX
"o>": "\u00f4", // LATIN SMALL LETTER O WITH CIRCUMFLEX
"~o": "\u00f5", // LATIN SMALL LETTER O WITH TILDE
"o~": "\u00f5", // LATIN SMALL LETTER O WITH TILDE
"\"o": "\u00f6", // LATIN SMALL LETTER O WITH DIAERESIS
"o\"": "\u00f6", // LATIN SMALL LETTER O WITH DIAERESIS
":-": "\u00f7", // DIVISION SIGN
"-:": "\u00f7", // DIVISION SIGN
"/o": "\u00f8", // LATIN SMALL LETTER O WITH STROKE
"`u": "\u00f9", // LATIN SMALL LETTER U WITH GRAVE
"u`": "\u00f9", // LATIN SMALL LETTER U WITH GRAVE
"'u": "\u00fa", // LATIN SMALL LETTER U WITH ACUTE
"u'": "\u00fa", // LATIN SMALL LETTER U WITH ACUTE
"^u": "\u00fb", // LATIN SMALL LETTER U WITH CIRCUMFLEX
">u": "\u00fb", // LATIN SMALL LETTER U WITH CIRCUMFLEX
"u>": "\u00fb", // LATIN SMALL LETTER U WITH CIRCUMFLEX
"\"u": "\u00fc", // LATIN SMALL LETTER U WITH DIAERESIS
"u\"": "\u00fc", // LATIN SMALL LETTER U WITH DIAERESIS
"'y": "\u00fd", // LATIN SMALL LETTER Y WITH ACUTE
"y'": "\u00fd", // LATIN SMALL LETTER Y WITH ACUTE
"th": "\u00fe", // LATIN SMALL LETTER THORN
"\"y": "\u00ff", // LATIN SMALL LETTER Y WITH DIAERESIS
"y\"": "\u00ff", // LATIN SMALL LETTER Y WITH DIAERESIS
"_A": "\u0100", // LATIN CAPITAL LETTER A WITH MACRON
"A_": "\u0100", // LATIN CAPITAL LETTER A WITH MACRON
"-A": "\u0100", // LATIN CAPITAL LETTER A WITH MACRON
"A-": "\u0100", // LATIN CAPITAL LETTER A WITH MACRON
"_a": "\u0101", // LATIN SMALL LETTER A WITH MACRON
"a_": "\u0101", // LATIN SMALL LETTER A WITH MACRON
"-a": "\u0101", // LATIN SMALL LETTER A WITH MACRON
"a-": "\u0101", // LATIN SMALL LETTER A WITH MACRON
"UA": "\u0102", // LATIN CAPITAL LETTER A WITH BREVE
"bA": "\u0102", // LATIN CAPITAL LETTER A WITH BREVE
"Ua": "\u0103", // LATIN SMALL LETTER A WITH BREVE
"ba": "\u0103", // LATIN SMALL LETTER A WITH BREVE
";A": "\u0104", // LATIN CAPITAL LETTER A WITH OGONEK
",A": "\u0104", // LATIN CAPITAL LETTER A WITH OGONEK
"A,": "\u0104", // LATIN CAPITAL LETTER A WITH OGONEK
";a": "\u0105", // LATIN SMALL LETTER A WITH OGONEK
",a": "\u0105", // LATIN SMALL LETTER A WITH OGONEK
"a,": "\u0105", // LATIN SMALL LETTER A WITH OGONEK
"'C": "\u0106", // LATIN CAPITAL LETTER C WITH ACUTE
"C'": "\u0106", // LATIN CAPITAL LETTER C WITH ACUTE
"'c": "\u0107", // LATIN SMALL LETTER C WITH ACUTE
"c'": "\u0107", // LATIN SMALL LETTER C WITH ACUTE
"^C": "\u0108", // LATIN CAPITAL LETTER C WITH CIRCUMFLEX
"^c": "\u0109", // LATIN SMALL LETTER C WITH CIRCUMFLEX
"cC": "\u010c", // LATIN CAPITAL LETTER C WITH CARON
"<C": "\u010c", // LATIN CAPITAL LETTER C WITH CARON
"C<": "\u010c", // LATIN CAPITAL LETTER C WITH CARON
"cc": "\u010d", // LATIN SMALL LETTER C WITH CARON
"<c": "\u010d", // LATIN SMALL LETTER C WITH CARON
"c<": "\u010d", // LATIN SMALL LETTER C WITH CARON
"cD": "\u010e", // LATIN CAPITAL LETTER D WITH CARON
"<D": "\u010e", // LATIN CAPITAL LETTER D WITH CARON
"D<": "\u010e", // LATIN CAPITAL LETTER D WITH CARON
"cd": "\u010f", // LATIN SMALL LETTER D WITH CARON
"<d": "\u010f", // LATIN SMALL LETTER D WITH CARON
"d<": "\u010f", // LATIN SMALL LETTER D WITH CARON
"-D": "\u0110", // Dstroke # LATIN CAPITAL LETTER D WITH STROKE
"D-": "\u0110", // Dstroke # LATIN CAPITAL LETTER D WITH STROKE
"/D": "\u0110", // Dstroke # LATIN CAPITAL LETTER D WITH STROKE
"-d": "\u0111", // dstroke # LATIN SMALL LETTER D WITH STROKE
"d-": "\u0111", // dstroke # LATIN SMALL LETTER D WITH STROKE
"/d": "\u0111", // dstroke # LATIN SMALL LETTER D WITH STROKE
"_E": "\u0112", // LATIN CAPITAL LETTER E WITH MACRON
"E_": "\u0112", // LATIN CAPITAL LETTER E WITH MACRON
"-E": "\u0112", // LATIN CAPITAL LETTER E WITH MACRON
"E-": "\u0112", // LATIN CAPITAL LETTER E WITH MACRON
"_e": "\u0113", // LATIN SMALL LETTER E WITH MACRON
"e_": "\u0113", // LATIN SMALL LETTER E WITH MACRON
"-e": "\u0113", // LATIN SMALL LETTER E WITH MACRON
"e-": "\u0113", // LATIN SMALL LETTER E WITH MACRON
"UE": "\u0114", // LATIN CAPITAL LETTER E WITH BREVE
"bE": "\u0114", // LATIN CAPITAL LETTER E WITH BREVE
"Ue": "\u0115", // LATIN SMALL LETTER E WITH BREVE
"be": "\u0115", // LATIN SMALL LETTER E WITH BREVE
";E": "\u0118", // LATIN CAPITAL LETTER E WITH OGONEK
",E": "\u0118", // LATIN CAPITAL LETTER E WITH OGONEK
"E,": "\u0118", // LATIN CAPITAL LETTER E WITH OGONEK
";e": "\u0119", // LATIN SMALL LETTER E WITH OGONEK
",e": "\u0119", // LATIN SMALL LETTER E WITH OGONEK
"e,": "\u0119", // LATIN SMALL LETTER E WITH OGONEK
"cE": "\u011a", // LATIN CAPITAL LETTER E WITH CARON
"<E": "\u011a", // LATIN CAPITAL LETTER E WITH CARON
"E<": "\u011a", // LATIN CAPITAL LETTER E WITH CARON
"ce": "\u011b", // LATIN SMALL LETTER E WITH CARON
"<e": "\u011b", // LATIN SMALL LETTER E WITH CARON
"e<": "\u011b", // LATIN SMALL LETTER E WITH CARON
"^G": "\u011c", // LATIN CAPITAL LETTER G WITH CIRCUMFLEX
"^g": "\u011d", // LATIN SMALL LETTER G WITH CIRCUMFLEX
"UG": "\u011e", // LATIN CAPITAL LETTER G WITH BREVE
"GU": "\u011e", // LATIN CAPITAL LETTER G WITH BREVE
"bG": "\u011e", // LATIN CAPITAL LETTER G WITH BREVE
"Ug": "\u011f", // LATIN SMALL LETTER G WITH BREVE
"gU": "\u011f", // LATIN SMALL LETTER G WITH BREVE
"bg": "\u011f", // LATIN SMALL LETTER G WITH BREVE
",G": "\u0122", // LATIN CAPITAL LETTER G WITH CEDILLA
"G,": "\u0122", // LATIN CAPITAL LETTER G WITH CEDILLA
",g": "\u0123", // LATIN SMALL LETTER G WITH CEDILLA
"g,": "\u0123", // LATIN SMALL LETTER G WITH CEDILLA
"^H": "\u0124", // LATIN CAPITAL LETTER H WITH CIRCUMFLEX
"^h": "\u0125", // LATIN SMALL LETTER H WITH CIRCUMFLEX
"/H": "\u0126", // LATIN CAPITAL LETTER H WITH STROKE
"/h": "\u0127", // LATIN SMALL LETTER H WITH STROKE
"~I": "\u0128", // LATIN CAPITAL LETTER I WITH TILDE
"I~": "\u0128", // LATIN CAPITAL LETTER I WITH TILDE
"~i": "\u0129", // LATIN SMALL LETTER I WITH TILDE
"i~": "\u0129", // LATIN SMALL LETTER I WITH TILDE
"_I": "\u012a", // LATIN CAPITAL LETTER I WITH MACRON
"I_": "\u012a", // LATIN CAPITAL LETTER I WITH MACRON
"-I": "\u012a", // LATIN CAPITAL LETTER I WITH MACRON
"I-": "\u012a", // LATIN CAPITAL LETTER I WITH MACRON
"_i": "\u012b", // LATIN SMALL LETTER I WITH MACRON
"i_": "\u012b", // LATIN SMALL LETTER I WITH MACRON
"-i": "\u012b", // LATIN SMALL LETTER I WITH MACRON
"i-": "\u012b", // LATIN SMALL LETTER I WITH MACRON
"UI": "\u012c", // LATIN CAPITAL LETTER I WITH BREVE
"bI": "\u012c", // LATIN CAPITAL LETTER I WITH BREVE
"Ui": "\u012d", // LATIN SMALL LETTER I WITH BREVE
"bi": "\u012d", // LATIN SMALL LETTER I WITH BREVE
";I": "\u012e", // LATIN CAPITAL LETTER I WITH OGONEK
",I": "\u012e", // LATIN CAPITAL LETTER I WITH OGONEK
"I,": "\u012e", // LATIN CAPITAL LETTER I WITH OGONEK
";i": "\u012f", // LATIN SMALL LETTER I WITH OGONEK
",i": "\u012f", // LATIN SMALL LETTER I WITH OGONEK
"i,": "\u012f", // LATIN SMALL LETTER I WITH OGONEK
"i.": "\u0131", // LATIN SMALL LETTER DOTLESS I
".i": "\u0131", // LATIN SMALL LETTER DOTLESS I
"^J": "\u0134", // LATIN CAPITAL LETTER J WITH CIRCUMFLEX
"^j": "\u0135", // LATIN SMALL LETTER J WITH CIRCUMFLEX
",K": "\u0136", // LATIN CAPITAL LETTER K WITH CEDILLA
"K,": "\u0136", // LATIN CAPITAL LETTER K WITH CEDILLA
",k": "\u0137", // LATIN SMALL LETTER K WITH CEDILLA
"k,": "\u0137", // LATIN SMALL LETTER K WITH CEDILLA
"kk": "\u0138", // LATIN SMALL LETTER KRA
"'L": "\u0139", // LATIN CAPITAL LETTER L WITH ACUTE
"L'": "\u0139", // LATIN CAPITAL LETTER L WITH ACUTE
"'l": "\u013a", // LATIN SMALL LETTER L WITH ACUTE
"l'": "\u013a", // LATIN SMALL LETTER L WITH ACUTE
",L": "\u013b", // LATIN CAPITAL LETTER L WITH CEDILLA
"L,": "\u013b", // LATIN CAPITAL LETTER L WITH CEDILLA
",l": "\u013c", // LATIN SMALL LETTER L WITH CEDILLA
"l,": "\u013c", // LATIN SMALL LETTER L WITH CEDILLA
"cL": "\u013d", // LATIN CAPITAL LETTER L WITH CARON
"<L": "\u013d", // LATIN CAPITAL LETTER L WITH CARON
"L<": "\u013d", // LATIN CAPITAL LETTER L WITH CARON
"cl": "\u013e", // LATIN SMALL LETTER L WITH CARON
"<l": "\u013e", // LATIN SMALL LETTER L WITH CARON
"l<": "\u013e", // LATIN SMALL LETTER L WITH CARON
"/L": "\u0141", // LATIN CAPITAL LETTER L WITH STROKE
"L/": "\u0141", // LATIN CAPITAL LETTER L WITH STROKE
"/l": "\u0142", // LATIN SMALL LETTER L WITH STROKE
"l/": "\u0142", // LATIN SMALL LETTER L WITH STROKE
"'N": "\u0143", // LATIN CAPITAL LETTER N WITH ACUTE
"N'": "\u0143", // LATIN CAPITAL LETTER N WITH ACUTE
"'n": "\u0144", // LATIN SMALL LETTER N WITH ACUTE
"n'": "\u0144", // LATIN SMALL LETTER N WITH ACUTE
",N": "\u0145", // LATIN CAPITAL LETTER N WITH CEDILLA
"N,": "\u0145", // LATIN CAPITAL LETTER N WITH CEDILLA
",n": "\u0146", // LATIN SMALL LETTER N WITH CEDILLA
"n,": "\u0146", // LATIN SMALL LETTER N WITH CEDILLA
"cN": "\u0147", // LATIN CAPITAL LETTER N WITH CARON
"<N": "\u0147", // LATIN CAPITAL LETTER N WITH CARON
"N<": "\u0147", // LATIN CAPITAL LETTER N WITH CARON
"cn": "\u0148", // LATIN SMALL LETTER N WITH CARON
"<n": "\u0148", // LATIN SMALL LETTER N WITH CARON
"n<": "\u0148", // LATIN SMALL LETTER N WITH CARON
"NG": "\u014a", // LATIN CAPITAL LETTER ENG
"ng": "\u014b", // LATIN SMALL LETTER ENG
"_O": "\u014c", // LATIN CAPITAL LETTER O WITH MACRON
"O_": "\u014c", // LATIN CAPITAL LETTER O WITH MACRON
"-O": "\u014c", // LATIN CAPITAL LETTER O WITH MACRON
"O-": "\u014c", // LATIN CAPITAL LETTER O WITH MACRON
"_o": "\u014d", // LATIN SMALL LETTER O WITH MACRON
"o_": "\u014d", // LATIN SMALL LETTER O WITH MACRON
"-o": "\u014d", // LATIN SMALL LETTER O WITH MACRON
"o-": "\u014d", // LATIN SMALL LETTER O WITH MACRON
"UO": "\u014e", // LATIN CAPITAL LETTER O WITH BREVE
"bO": "\u014e", // LATIN CAPITAL LETTER O WITH BREVE
"Uo": "\u014f", // LATIN SMALL LETTER O WITH BREVE
"bo": "\u014f", // LATIN SMALL LETTER O WITH BREVE
"=O": "\u0150", // LATIN CAPITAL LETTER O WITH DOUBLE ACUTE
"=o": "\u0151", // LATIN SMALL LETTER O WITH DOUBLE ACUTE
"OE": "\u0152", // OE # LATIN CAPITAL LIGATURE OE
"oe": "\u0153", // oe # LATIN SMALL LIGATURE OE
"'R": "\u0154", // LATIN CAPITAL LETTER R WITH ACUTE
"R'": "\u0154", // LATIN CAPITAL LETTER R WITH ACUTE
"'r": "\u0155", // LATIN SMALL LETTER R WITH ACUTE
"r'": "\u0155", // LATIN SMALL LETTER R WITH ACUTE
",R": "\u0156", // LATIN CAPITAL LETTER R WITH CEDILLA
",r": "\u0157", // LATIN SMALL LETTER R WITH CEDILLA
"cR": "\u0158", // LATIN CAPITAL LETTER R WITH CARON
"<R": "\u0158", // LATIN CAPITAL LETTER R WITH CARON
"R<": "\u0158", // LATIN CAPITAL LETTER R WITH CARON
"cr": "\u0159", // LATIN SMALL LETTER R WITH CARON
"<r": "\u0159", // LATIN SMALL LETTER R WITH CARON
"r<": "\u0159", // LATIN SMALL LETTER R WITH CARON
"'S": "\u015a", // LATIN CAPITAL LETTER S WITH ACUTE
"S'": "\u015a", // LATIN CAPITAL LETTER S WITH ACUTE
"'s": "\u015b", // LATIN SMALL LETTER S WITH ACUTE
"s'": "\u015b", // LATIN SMALL LETTER S WITH ACUTE
"^S": "\u015c", // LATIN CAPITAL LETTER S WITH CIRCUMFLEX
"^s": "\u015d", // LATIN SMALL LETTER S WITH CIRCUMFLEX
",S": "\u015e", // LATIN CAPITAL LETTER S WITH CEDILLA
"S,": "\u015e", // LATIN CAPITAL LETTER S WITH CEDILLA
",s": "\u015f", // LATIN SMALL LETTER S WITH CEDILLA
"s,": "\u015f", // LATIN SMALL LETTER S WITH CEDILLA
"cS": "\u0160", // LATIN CAPITAL LETTER S WITH CARON
"<S": "\u0160", // LATIN CAPITAL LETTER S WITH CARON
"S<": "\u0160", // LATIN CAPITAL LETTER S WITH CARON
"cs": "\u0161", // LATIN SMALL LETTER S WITH CARON
"<s": "\u0161", // LATIN SMALL LETTER S WITH CARON
"s<": "\u0161", // LATIN SMALL LETTER S WITH CARON
",T": "\u0162", // LATIN CAPITAL LETTER T WITH CEDILLA
"T,": "\u0162", // LATIN CAPITAL LETTER T WITH CEDILLA
",t": "\u0163", // LATIN SMALL LETTER T WITH CEDILLA
"t,": "\u0163", // LATIN SMALL LETTER T WITH CEDILLA
"cT": "\u0164", // LATIN CAPITAL LETTER T WITH CARON
"<T": "\u0164", // LATIN CAPITAL LETTER T WITH CARON
"T<": "\u0164", // LATIN CAPITAL LETTER T WITH CARON
"ct": "\u0165", // LATIN SMALL LETTER T WITH CARON
"<t": "\u0165", // LATIN SMALL LETTER T WITH CARON
"t<": "\u0165", // LATIN SMALL LETTER T WITH CARON
"/T": "\u0166", // LATIN CAPITAL LETTER T WITH STROKE
"T/": "\u0166", // LATIN CAPITAL LETTER T WITH STROKE
"T-": "\u0166", // LATIN CAPITAL LETTER T WITH STROKE
"/t": "\u0167", // LATIN SMALL LETTER T WITH STROKE
"t/": "\u0167", // LATIN SMALL LETTER T WITH STROKE
"t-": "\u0167", // LATIN SMALL LETTER T WITH STROKE
"~U": "\u0168", // LATIN CAPITAL LETTER U WITH TILDE
"U~": "\u0168", // LATIN CAPITAL LETTER U WITH TILDE
"~u": "\u0169", // LATIN SMALL LETTER U WITH TILDE
"u~": "\u0169", // LATIN SMALL LETTER U WITH TILDE
"_U": "\u016a", // LATIN CAPITAL LETTER U WITH MACRON
"U_": "\u016a", // LATIN CAPITAL LETTER U WITH MACRON
"-U": "\u016a", // LATIN CAPITAL LETTER U WITH MACRON
"U-": "\u016a", // LATIN CAPITAL LETTER U WITH MACRON
"_u": "\u016b", // LATIN SMALL LETTER U WITH MACRON
"u_": "\u016b", // LATIN SMALL LETTER U WITH MACRON
"-u": "\u016b", // LATIN SMALL LETTER U WITH MACRON
"u-": "\u016b", // LATIN SMALL LETTER U WITH MACRON
"UU": "\u016c", // LATIN CAPITAL LETTER U WITH BREVE
"bU": "\u016c", // LATIN CAPITAL LETTER U WITH BREVE
"Uu": "\u016d", // LATIN SMALL LETTER U WITH BREVE
"bu": "\u016d", // LATIN SMALL LETTER U WITH BREVE
"oU": "\u016e", // LATIN CAPITAL LETTER U WITH RING ABOVE
"*U": "\u016e", // LATIN CAPITAL LETTER U WITH RING ABOVE
"U*": "\u016e", // LATIN CAPITAL LETTER U WITH RING ABOVE
"ou": "\u016f", // LATIN SMALL LETTER U WITH RING ABOVE
"*u": "\u016f", // LATIN SMALL LETTER U WITH RING ABOVE
"u*": "\u016f", // LATIN SMALL LETTER U WITH RING ABOVE
"=U": "\u0170", // LATIN CAPITAL LETTER U WITH DOUBLE ACUTE
"=u": "\u0171", // LATIN SMALL LETTER U WITH DOUBLE ACUTE
";U": "\u0172", // LATIN CAPITAL LETTER U WITH OGONEK
",U": "\u0172", // LATIN CAPITAL LETTER U WITH OGONEK
"U,": "\u0172", // LATIN CAPITAL LETTER U WITH OGONEK
";u": "\u0173", // LATIN SMALL LETTER U WITH OGONEK
",u": "\u0173", // LATIN SMALL LETTER U WITH OGONEK
"u,": "\u0173", // LATIN SMALL LETTER U WITH OGONEK
"^W": "\u0174", // LATIN CAPITAL LETTER W WITH CIRCUMFLEX
"W^": "\u0174", // LATIN CAPITAL LETTER W WITH CIRCUMFLEX
"^w": "\u0175", // LATIN SMALL LETTER W WITH CIRCUMFLEX
"w^": "\u0175", // LATIN SMALL LETTER W WITH CIRCUMFLEX
"^Y": "\u0176", // LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
"Y^": "\u0176", // LATIN CAPITAL LETTER Y WITH CIRCUMFLEX
"^y": "\u0177", // LATIN SMALL LETTER Y WITH CIRCUMFLEX
"y^": "\u0177", // LATIN SMALL LETTER Y WITH CIRCUMFLEX
"\"Y": "\u0178", // LATIN CAPITAL LETTER Y WITH DIAERESIS
"Y\"": "\u0178", // LATIN CAPITAL LETTER Y WITH DIAERESIS
"'Z": "\u0179", // LATIN CAPITAL LETTER Z WITH ACUTE
"Z'": "\u0179", // LATIN CAPITAL LETTER Z WITH ACUTE
"'z": "\u017a", // LATIN SMALL LETTER Z WITH ACUTE
"z'": "\u017a", // LATIN SMALL LETTER Z WITH ACUTE
"cZ": "\u017d", // LATIN CAPITAL LETTER Z WITH CARON
"vZ": "\u017d", // LATIN CAPITAL LETTER Z WITH CARON
"<Z": "\u017d", // LATIN CAPITAL LETTER Z WITH CARON
"Z<": "\u017d", // LATIN CAPITAL LETTER Z WITH CARON
"cz": "\u017e", // LATIN SMALL LETTER Z WITH CARON
"vz": "\u017e", // LATIN SMALL LETTER Z WITH CARON
"<z": "\u017e", // LATIN SMALL LETTER Z WITH CARON
"z<": "\u017e", // LATIN SMALL LETTER Z WITH CARON
"fs": "\u017f", // LATIN SMALL LETTER LONG S
"fS": "\u017f", // LATIN SMALL LETTER LONG S
"/b": "\u0180", // LATIN SMALL LETTER B WITH STROKE
"/I": "\u0197", // LATIN CAPITAL LETTER I WITH STROKE
"+O": "\u01a0", // LATIN CAPITAL LETTER O WITH HORN
"+o": "\u01a1", // LATIN SMALL LETTER O WITH HORN
"+U": "\u01af", // LATIN CAPITAL LETTER U WITH HORN
"+u": "\u01b0", // LATIN SMALL LETTER U WITH HORN
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
"D,": "\u1e10", // LATIN CAPITAL LETTER D WITH CEDILLA
",d": "\u1e11", // LATIN SMALL LETTER D WITH CEDILLA
"d,": "\u1e11", // LATIN SMALL LETTER D WITH CEDILLA
"_G": "\u1e20", // LATIN CAPITAL LETTER G WITH MACRON
"_g": "\u1e21", // LATIN SMALL LETTER G WITH MACRON
"\"H": "\u1e26", // LATIN CAPITAL LETTER H WITH DIAERESIS
"\"h": "\u1e27", // LATIN SMALL LETTER H WITH DIAERESIS
",H": "\u1e28", // LATIN CAPITAL LETTER H WITH CEDILLA
"H,": "\u1e28", // LATIN CAPITAL LETTER H WITH CEDILLA
",h": "\u1e29", // LATIN SMALL LETTER H WITH CEDILLA
"h,": "\u1e29", // LATIN SMALL LETTER H WITH CEDILLA
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
".>": "\u203a", // SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
".<": "\u2039", // SINGLE LEFT-POINTING ANGLE QUOTATION MARK
"!?": "\u203d", // INTERROBANG
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
"SM": "\u2120", // SERVICE MARK
"sM": "\u2120", // SERVICE MARK
"Sm": "\u2120", // SERVICE MARK
"sm": "\u2120", // SERVICE MARK
"TM": "\u2122", // TRADE MARK SIGN
"tM": "\u2122", // TRADE MARK SIGN
"Tm": "\u2122", // TRADE MARK SIGN
"tm": "\u2122", // TRADE MARK SIGN
"<-": "\u2190", // LEFTWARDS ARROW
"->": "\u2192", // RIGHTWARDS ARROW
"<=": "\u2264", // LESS-THAN OR EQUAL TO
">=": "\u2265", // GREATER-THAN OR EQUAL TO
"=<": "\u21d0", // LEFTWARDS DOUBLE ARROW
"=>": "\u21d2", // RIGHWARDS DOUBLE ARROW
"/=": "\u2260", // NOT EQUAL TO
"=/": "\u2260", // NOT EQUAL TO
"?!": "\u2e18", // INVERTED INTERROBANG
"\\\\": "\u301d", // REVERSED DOUBLE PRIME QUOTATION MARK
"//": "\u301e", // DOUBLE PRIME QUOTATION MARK
};

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
