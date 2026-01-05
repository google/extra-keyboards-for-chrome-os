#!/usr/bin/env ruby

# This script produces json mapping from ChromeOS IME key names to
# characters by taking the mapping from the output of xkbcomp.
#
# E.g. like this:
#
# $ setxkbmap -layout by -variant phonetic -model pc105 -print | xkbcomp -xkb -I/usr/share/X11/xkb - dumped_layout.xkb
# $ ruby ./convert.rb dumped_layout.xkb
#
# Initial version was produced by Gemini LLM, but I've mostly
# rewritten it (so nicer parts are mine; but having something to
# work with was helpful).

require 'json'

begin
  MAP = {
    # Symbols commonly found on these layouts
    'numero' => '№',
    'section' => '§',
    'EuroSign' => '€',
    'copyright' => '©',
    'registered' => '®',
    'trademark' => '™',
    'emdash' => '—',
    'endash' => '–',
    'guillemotleft' => '«',
    'guillemotright' => '»',
  }
  10.times {|num| MAP[num.to_s] = num.to_s}

  # So XKB has those elaborate character names and elaborate
  # pre-unicode character codes. Thankfully keysymdef.h has the
  # unicode values too in the comments. So we parse it out of there
  # (thanks goes to Gemini pointing this out).
  #
  # We only fetch potentially relevant symbols, and we're deliberatly
  # very strict on the format of the stuff we parse. And we crash on
  # anything unexpected.
  #
  # The lines we're parsing look like this:
  # #define XK_Byelorussian_shortu 0x06ae  /* U+045E CYRILLIC SMALL LETTER SHORT U */
  #
  File.open("/usr/include/X11/keysymdef.h", "r") do |f|
    f.each_line do |l|
      next unless l =~ /\A#define\s+XK_((Cyrillic|Ukrainian|Byelorussian)\S+)\s+(.*)$/
      sym, rest = $1, $3
      raise rest unless rest =~ /\A0x[0-9a-f]+\s*\/\*\s+U\+([0-9A-F]+)\s/
      MAP[sym] = [$1.to_i(16)].pack("U")
    end
  end
  MAP.freeze
end

# MappingParser extracts mapping from X key name to symbols. It only
# understands very specific format that I have in XKB layout I need.
module MappingParser
  # we deal with mappings like: key <AE05> {[5, Cyrillic_hardsign ] };
  GROUP_RE = /\[((\s*(\w|\d)+\s*,?)+)\]/m
  COMPLEX_RE = /\A(?:type=\s*".*?",\s*symbols\[Group1\]=\s*)?#{GROUP_RE}\z/m
  # or:
  # key <AE12> {
  #     type= "ALPHABETIC",
  #     symbols[Group1]= [    Cyrillic_che,    Cyrillic_CHE ]
  # };

  # we use this to detect symbols that are interesting to us (i.e. one
  # of cyrillic letters)
  LETTER_RE = /\A(?:Cyrillic|Ukrainian|Byelorussian)/

  def scan_mappings
    self.scan(/key\s*<(\w+)>\s*\{(.*?)\}\s*;/m) do |xkb_code, content|
      content = content.strip
      raise content unless content =~ COMPLEX_RE
      keys = $1.split(",").map(&:strip)
      has_letter = keys.any? {|k| k =~ LETTER_RE }
      yield xkb_code, keys, has_letter
    end
  end
end

# X to Chrome (or perhaps, indeed, DOM) key names.
XKB_TO_DOM = {
  'TLDE' => 'Backquote',
  'AE01' => 'Digit1', 'AE02' => 'Digit2', 'AE03' => 'Digit3', 'AE04' => 'Digit4',
  'AE05' => 'Digit5', 'AE06' => 'Digit6', 'AE07' => 'Digit7', 'AE08' => 'Digit8',
  'AE09' => 'Digit9', 'AE10' => 'Digit0', 'AE11' => 'Minus',  'AE12' => 'Equal',
  'AD01' => 'KeyQ', 'AD02' => 'KeyW', 'AD03' => 'KeyE', 'AD04' => 'KeyR',
  'AD05' => 'KeyT', 'AD06' => 'KeyY', 'AD07' => 'KeyU', 'AD08' => 'KeyI',
  'AD09' => 'KeyO', 'AD10' => 'KeyP', 'AD11' => 'BracketLeft', 'AD12' => 'BracketRight',
  'AC01' => 'KeyA', 'AC02' => 'KeyS', 'AC03' => 'KeyD', 'AC04' => 'KeyF',
  'AC05' => 'KeyG', 'AC06' => 'KeyH', 'AC07' => 'KeyJ', 'AC08' => 'KeyK',
  'AC09' => 'KeyL', 'AC10' => 'Semicolon', 'AC11' => 'Quote',
  'AB01' => 'KeyZ', 'AB02' => 'KeyX', 'AB03' => 'KeyC', 'AB04' => 'KeyV',
  'AB05' => 'KeyB', 'AB06' => 'KeyN', 'AB07' => 'KeyM', 'AB08' => 'Comma',
  'AB09' => 'Period', 'AB10' => 'Slash',
  'BKSL' => 'Backslash', 'SPCE' => 'Space', 'LSGT' => 'IntlBackslash'
}

REPORTED_UNKNOWNS = Set.new
def map_xkb_code(xkb_code)
  dom_code = XKB_TO_DOM[xkb_code]
  return dom_code if dom_code

  unless REPORTED_UNKNOWNS.include?(xkb_code)
    REPORTED_UNKNOWNS << xkb_code
    # puts "unknown xkb key code: #{xkb_code.inspect}"
  end
  nil
end

input = ARGF.read
input.extend(MappingParser)

puts "const layout = {"

input.scan_mappings do |xkb_code, chars, has_letter|
  dom_code = map_xkb_code(xkb_code)

  # we skip some "irrelevant" keys
  next unless dom_code
  # and we skip non-letter mappings (they are assumed to be close
  # enough to regular en-us layout)
  next unless has_letter

  chars = chars.map do |c|
    MAP[c] || raise
  end

  # Output: "Key": ["a", "B", "c", "D"],
  puts "  #{dom_code.to_json}: #{chars.to_json},"
end

puts "};"
