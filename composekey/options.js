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
    }, {passive: true});
}

function restore() {
  let key = document.getElementById('key');
  if (key.value != backgroundPage.composeKey) {
    key.value = backgroundPage.composeKey;
  }

  let keepModifier = document.getElementById('keepModifier');
  if (keepModifier.checked != backgroundPage.keepModifier) {
    keepModifier.checked = backgroundPage.keepModifier;
  }

  let composeFileElem = document.getElementById('composeFile');
  if (composeFileElem.value != backgroundPage.composeFile) {
    composeFileElem.value = backgroundPage.composeFile;
  }
}
document.addEventListener('DOMContentLoaded', restore);
backgroundPage.onComposeKeyLoaded = restore;
backgroundPage.onComposeFileLoaded = restore;

function keyChanged() {
  let key = document.getElementById('key').value;
  let keepModifierLabel = document.getElementById('keepModifierLabel');
  if (key == 'ContextMenu') {
    keepModifierLabel.style.display = 'none';
    keepModifier = false;
  } else {
    keepModifierLabel.style.display = 'unset';
    keepModifier = document.getElementById('keepModifier').checked;
  }
  backgroundPage.storeKey({
    key: key,
    keepModifier: keepModifier,
  });
}
document.getElementById('key')
  .addEventListener('change', keyChanged, {passive: true});
document.getElementById('keepModifier')
  .addEventListener('change', keyChanged, {passive: true});

function updateComposeFile() {
  let content = document.getElementById('composeFile').value;
  if (content != backgroundPage.composeFile) {
    backgroundPage.storeComposeFile(content);
  }
}

window.onunload = updateComposeFile;
document.getElementById('composeFile')
  .addEventListener('blur', updateComposeFile, {passive: true});

document.getElementById('loadComposeFileButton')
  .addEventListener('click', () => {
    document.getElementById('loadComposeFile').click();
  }, {passive: true});

document.getElementById('loadComposeFile')
  .addEventListener('change', (event) => {
    if (event.target.files.length == 0) return;

    let f = event.target.files[0];
    let r = new FileReader();
    r.onload = () => {
      document.getElementById('composeFile').value = r.result;
      updateComposeFile();
    };
    r.readAsText(f);
  }, {passive: true});

document.getElementById('saveComposeFile')
  .addEventListener('click', () => {
    let a = document.createElement("a");
    a.style = "display: none";
    a.href = window.URL.createObjectURL(
      new Blob([backgroundPage.composeFile],
               {type: "application/octet-stream"}));
    a.download = ".XCompose";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(a.href);
    a.remove();
  }, {passive: true});

document.getElementById('resetComposeFile')
  .addEventListener('click', () => {
    document.getElementById('confirmResetDialog').style.display = 'block';
  }, {passive: true});

document.getElementById('confirmResetComposeFile')
  .addEventListener('click', () => {
    backgroundPage.clearComposeFile();
    restore();
    document.getElementById('confirmResetDialog').style.display = 'none';
  }, {passive: true});

document.getElementById('cancelResetComposeFile')
  .addEventListener('click', () => {
    document.getElementById('confirmResetDialog').style.display = 'none';
  }, {passive: true});
