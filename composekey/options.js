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

let backgroundPage = chrome.extension
    ? chrome.extension.getBackgroundPage()
    : this;

if (!chrome.extension) {
  // We've loaded options.html without actually being in an extension,
  // presumably in order to test it.
  // Fake an extension environment by loading background.js explicitly.
  for (let src of ['fakes.js', 'background.js']) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = restore;
    document.body.appendChild(script);
  }
}

for (let eventType of ['keydown', 'keypress', 'keyup', 'textInput']) {
  document.getElementById('testArea')
    .addEventListener(eventType, (event) => {
      console.log('testArea ', eventType, ": ", event)
    }, {passive: true})
}

function restore() {
  let key = document.getElementById('key');
  if (key.value != backgroundPage.composeKey) {
    key.value = backgroundPage.composeKey;
    document.getElementById('keepModifierLabel').style.display =
        (key.value == 'ContextMenu') ? 'none' : 'unset';
  }

  let keepModifier = document.getElementById('keepModifier');
  if (keepModifier.checked != backgroundPage.keepModifier) {
    keepModifier.checked = backgroundPage.keepModifier;
  }
}
document.addEventListener('DOMContentLoaded', restore);
backgroundPage.onComposeKeyLoaded = restore;

function keyChanged() {
  let key = document.getElementById('key');
  document.getElementById('keepModifierLabel').style.display =
      (key.value == 'ContextMenu') ? 'none' : 'unset';

  let keepModifier = document.getElementById('keepModifier');

  backgroundPage.storeKey({
    key: key.value,
    keepModifier: keepModifier.checked,
  });
}
document.getElementById('key')
  .addEventListener('change', keyChanged, {passive: true});
document.getElementById('keepModifier')
  .addEventListener('change', keyChanged, {passive: true});
