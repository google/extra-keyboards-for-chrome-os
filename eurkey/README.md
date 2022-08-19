# EurKEY Keyboard Layout for Chrome OS

## Overview

This extension makes available the EurKEY keyboard layout on Chrome OS. EurKEY
is a layout based on the US keyboard layout which is handy for many special
characters such as `[, ], /, \`, which is convenient for coding. At the same
time, EurKEY facilitates typing special characters found in many European
languages. EurKEY was developed by Steffen Brüntjen, please visit [his
homepage](https://eurkey.steffen.bruentjen.eu/) for more information on EurKEY.

## Installation

For most users, this extension should be installed through Chrome Web Store.
Please refer to the instructions found in the [repository's
README.md](https://github.com/google/extra-keyboards-for-chrome-os/blob/master/README.md)
for more information on how to add a keyboard layout to Chrome OS.

For development purposes, you can install this extension directly as well. The
above-mentioned
[README.md](https://github.com/google/extra-keyboards-for-chrome-os/blob/master/README.md)
has information on that as well.

## Technical Details

This extension builds on the keyboard layouts contained in `xkeyboard-config`,
i.e., it only makes available the EurKEY keyboard layout that's already
installed through Chrome OS. As a consequence, this extension can't influence
any specifics of the layout such as key mappings.

A separate profile was created for each of the [languages supported by
EurKEY](https://eurkey.steffen.bruentjen.eu/download.html). The only practical
difference between these individual profiles is the language indicator in the
Chrome OS shelf.
