# Extra Keyboards for Chrome OS

A collection of extra keyboard layouts and input methods for Chrome OS.

## Installation

### GitHub

1. Open a new tab and go to chrome://extensions.
1. Toggle "Developer mode" on (it is in the top right corner of the extensions
   page).
1. Click "Load unpacked extensions...".
1. Pick the directory containing the manifest for the extension you want to
   enable and click "Open".
1. Go to chrome://settings/languages.
1. Add the relevant language, e.g. French for the bepo keyboard layout.
1. Select the relevant keyboard layout and input method.
1. Optionally, remove any keyboard layouts or input methods that are no longer
   required.

### Chrome Web Store

Several of the extensions are available on the [Chrome Web Store](http://chrome.google.com/webstore/).

- [ComposeKey](https://chrome.google.com/webstore/detail/composekey/iijdllfdmhbmlmnbcohgbfagfibpbgba)
- [UK Extended](https://chrome.google.com/webstore/detail/uk-extended/pkbdliadhfopgfdhbldifaakplenbpnd)
- [Programmer Dvorak](https://chrome.google.com/webstore/detail/programmer-dvorak/mogcmmflienoigckdgnkkkafbgkaecbj)
- [Polish Dvorak](https://chrome.google.com/webstore/detail/polish-dvorak/gikieikejljogkfjbijjplfhbmhbmfkf)
- [Swedish Dvorak](https://chrome.google.com/webstore/detail/svorak/ijimhcgeahpgfdcgaheadagkjkiibcnj)
- [Dvorak left-handed](https://chrome.google.com/webstore/detail/dvorak-left/daedidciajfkjpjfmailopfppehmdlkn)
- [Dvorak right-handed](https://chrome.google.com/webstore/detail/dvorak-right/ibmblmkjihglholefminaiddohamopnn)
- [BÉPO](https://chrome.google.com/webstore/detail/b%C3%A9po/pgiknkjjcfcalehnoedjngelcgopgkgc)
- [Lushootseed](https://chrome.google.com/webstore/detail/lushootseed/bdcecklhaeiniooomgajkefmnghopnpk)
- [UK Colemak](https://chrome.google.com/webstore/detail/nionfllpgckhdmcecikpfkonedlmlnop) (published by third party)

## For development

1. Go to chrome://extensions.
2. Click on "Load unpacked extensions...".
3. Pick the directory containing the manifest for the extension you want to
enable.

## How to Use

After enabling multiple keyboard layouts an icon will appear in the system tray
with an abbreviation for the *language* of the currently enabled layout. If
your default layout is the standard US keyboard with the English layout, the
text will read "US". Any other layout also using the English language will read
"EN". This can lead to confusion if there are multiple layouts enabled for the
same language.

Once you have loaded and enabled the extension you can select a specific layout
or cycle through the available layouts in a few ways.

### Selecting

- Click the time on the menu bar.
- Click the button labeled "Keyboard" and select the desired layout.

### Cycling

1. Press `Ctrl+Shift+Space` to cycle through the enabled keyboard layouts.
1. Press `Ctrl+Space` to toggle between the most recently used keyboard layouts.

## Known Limitations

- These extensions are **not** allowed on the login/lock screen.
- These extensions are **not** allowed on password fields.

## Contributing

If you would like to create a new layout or modify an existing one, please see
the [Contributing](CONTRIBUTING.md) documentation.