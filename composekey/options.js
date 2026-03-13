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

for (let eventType of ['keydown', 'keypress', 'keyup', 'textInput']) {
  document.getElementById('testArea').addEventListener(eventType, (event) => {
    console.log('testArea ', eventType, ': ', event);
  }, {passive: true});
}

/**
 * Restores the options from storage.
 */
async function restore() {
  const response = await chrome.runtime.sendMessage({command: 'getOptions'});
  let keyElem = document.getElementById('key');
  if (keyElem.value != response.composeKey) {
    keyElem.value = response.composeKey;
    document.getElementById('keepModifierLabel').style.display =
        (keyElem.value == 'ContextMenu') ? 'none' : 'unset';
  }

  let keepModifierElem = document.getElementById('keepModifier');
  if (keepModifierElem.checked != response.keepModifier) {
    keepModifierElem.checked = response.keepModifier;
  }

  let composeFileElem = document.getElementById('composeFile');
  if (composeFileElem.value != response.composeFile) {
    composeFileElem.value = response.composeFile;
    updateComposeFileStatus();
  }
}

document.addEventListener('DOMContentLoaded', restore);

// TODO: nkillewald - Make this update when/if sync changes.
// chrome.storage.sync.onChanged.addListener(restore);

// TODO: nkillewald - Also make this update when/if local changes, as that might
// happen if the compose file is too big to store in sync. We don't care about
// anything else in local storage, though, as that's effectively working RAM
// for the ServiceWorker.
/*
chrome.storage.local.onChanged.addListener((changed) => {
  if(!!changed.composeFile) {
    restore();
  }
});
*/

/**
 * Stores the key options in storage on changes.
 */
function keyChanged() {
  let key = document.getElementById('key');
  document.getElementById('keepModifierLabel').style.display =
      (key.value == 'ContextMenu') ? 'none' : 'unset';

  let keepModifier = document.getElementById('keepModifier');

  chrome.runtime.sendMessage({
    command: 'storeKeyOptions',
    data: {
      key: key.value,
      keepModifier: keepModifier.checked,
    }
  });
}
document.getElementById('key')
  .addEventListener('change', keyChanged, {passive: true});
document.getElementById('keepModifier')
  .addEventListener('change', keyChanged, {passive: true});


/**
 * Stores the compose file in storage on changes.
 */
async function updateComposeFile() {
  const content = document.getElementById('composeFile').value;
  const response = await chrome.runtime.sendMessage({command: 'getOptions'});

  if (content === response.composeFile) return;

  const storeStatus =
      await chrome.runtime.sendMessage({command: 'storeComposeFile',
         data: content});
  if (storeStatus.result === 'OK') {
    updateComposeFileStatus();
  }
}

window.onunload = updateComposeFile;
document.getElementById('composeFile')
  .addEventListener('blur', updateComposeFile, {passive: true});

document.getElementById('loadComposeFileButton')
  .addEventListener('click', () => {
    let elem = document.getElementById('loadComposeFile');
    elem.value = null;
    elem.click();
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
    .addEventListener('click', async () => {
      const response =
          await chrome.runtime.sendMessage({command: 'getOptions'});
      if (!response) return;

      let a = document.createElement('a');
      a.style = 'display: none';
      a.href = window.URL.createObjectURL(
          new Blob([response.composeFile], {type: 'application/octet-stream'}));
      a.download = '.XCompose';
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
    .addEventListener('click', async () => {
      const response =
          await chrome.runtime.sendMessage({command: 'clearComposeFile'});
      if (!response) return;

      restore();
      document.getElementById('confirmResetDialog').style.display = 'none';
    }, {passive: true});

document.getElementById('cancelResetComposeFile')
  .addEventListener('click', () => {
    document.getElementById('confirmResetDialog').style.display = 'none';
  }, {passive: true});

/**
 * Updates the compose file status.
 */
async function updateComposeFileStatus() {
  const status = await chrome.runtime.sendMessage({command: 'getFileStatus'});
  if (!status) return;

  const errors = document.getElementById('errors');
  const warnings = document.getElementById('warnings');
  for (let elem of [errors, warnings]) {
    elem.innerText = '';
    elem.style.display = 'none';
  }

  if (status.errors.length > 0) {
    errors.insertAdjacentText('beforeend', 'Errors:');
    for (let error of status.errors) {
      let div = document.createElement('div');
      div.classList.add('error');
      let code = document.createElement('code');
      code.insertAdjacentText('beforeend', error.line);
      div.appendChild(code);
      let p = document.createElement('p');
      p.insertAdjacentText('beforeend', error.message);
      div.appendChild(p);
      errors.appendChild(div);
    }
    errors.style.display = 'block';
  }

  if (status.warnings.length > 0) {
    warnings.insertAdjacentText('beforeend', 'Warnings:');
    for (let warning of status.warnings) {
      let div = document.createElement('div');
      div.classList.add('warning');
      let code = document.createElement('code');
      code.insertAdjacentText('beforeend', warning.line);
      div.appendChild(code);
      let p = document.createElement('p');
      p.insertAdjacentText('beforeend', warning.message);
      div.appendChild(p);
      warnings.appendChild(div);
    }
    warnings.style.display = 'block';
  }
}
