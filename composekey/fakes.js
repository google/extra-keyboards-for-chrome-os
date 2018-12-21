/*
Copyright 2018 Google Inc. All rights reserved.

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

/**
 * @fileoverview This file provides fake non-extension implementations of Chrome
 * extension APIs to facilitate local (non-ChromeOS / non-extension) testing.
 */

if (chrome == undefined) {
  var chrome = {};
}

if (!chrome.runtime) {
  chrome.runtime = {};
}

/**
 * @param {function()} callback
 * @param {*} message
 */
function callWithRuntimeError(callback, message) {
  if (message !== undefined && message !== null) {
    chrome.runtime.lastError = {
      message: '' + message,
    };
  }

  try {
    callback();
  } finally {
    delete chrome.runtime.lastError;
  }
}

/**
 * @param {*} parameters Ignored.
 * @param {function()} callback
 */
function reportUnimplemented(parameters, callback) {
  if (!callback) return;

  callWithRuntimeError(callback, 'chrome.storage is not available');
};


if (!chrome.storage) {
  let unimplementedStorageArea = Object.freeze({
    get: reportUnimplemented,
    getBytesInUse: reportUnimplemented,
    set: reportUnimplemented,
    remove: reportUnimplemented,
    clear: (callback) => { reportUnimplemented(null, callback); },
  });

  let localStorageArea = Object.freeze({
    get: (keys, callback) => {
      let items = {};
      try {
        if (keys instanceof String) {
          items[keys] = localStorage.getItem(keys);
        } else if (keys instanceof Array) {
          for (let key of keys) {
            items[key] = localStorage.getItem(key);
          }
        } else {
          for (let [key, defaultItem] in Object.entries(keys)) {
            let item = localStorage.getItem(key);
            if (item === null) item = defaultItem;
            items[key] = item;
          }
        }
      } catch(error) {
        if (callback) {
          callWithRuntimeError(() => { callback(items); }, {
            message: '' + error,
          });
        }
        return;
      }

      if (callback) callback(items);
    },

    getBytesInUse: reportUnimplemented,

    set: (items, callback) => {
      try {
        for (let [key, item] in items) {
          localStorage.setItem(key, item);
        }
      } catch(error) {
        if (callback)
          callWithRuntimeError(callback, { message: '' + error });
        return;
      }

      if (callback) callback();
    },

    remove: (keys, callback) => {
      try {
        if (keys instanceof String) {
          localStorage.removeItem(keys);
        } else {
          for (let key of keys) {
            localStorage.removeItem(key);
          }
        }
      } catch(error) {
        if (callback)
          callWithRuntimeError(callback, { message: '' + error });
        return;
      }

      if (callback) callback();
    },

    clear: (callback) => {
      try {
        localStorage.clear();
      } catch(error) {
        if (callback)
          callWithRuntimeError(callback, { message: '' + error });
        return;
      }

      if (callback) callback();
    },
  });

  chrome.storage = Object.freeze({
    sync: unimplementedStorageArea,
    local: localStorageArea,
    managed: unimplementedStorageArea
  });
}

if (!chrome.input) chrome.input = {};

if (!chrome.input.ime) {
  const engineID = -1;

  chrome.input.ime = {
    onFocus: {
      addListener: (callback) => {
        chrome.input.ime.onFocus.listener = callback;
      },
    },
    onBlur: {
      addListener: (callback) => {
        chrome.input.ime.onBlur.listener = callback;
      },
    },

    keyEvents: [],

    keyEventHandled: (requestId, handled) => {
      if (!handled) return;

      const event = chrome.input.ime.keyEvents[parseInt(requestId, 10)];
      if (!event) {
        console.error('missing event for requestId:', requestId);
        return;
      }
      if (event.defaultPrevented) return;

      console.log('keyEventHandled: suppressed', event);
      event.preventDefault();
      event.stopPropagation();
    },

    onKeyEvent: {
      addListener: (callback) => {
        for (const eventName of ['keydown', 'keyup']) {
          window.addEventListener(eventName, (event) => {
            const keyEvents = chrome.input.ime.keyEvents;
            event.type = eventName;
            event.requestId = '' + keyEvents.length;
            keyEvents.push(event);

            if (callback(engineID, event) && !event.defaultPrevented) {
              console.log('onKeyEvent: suppressed', event);
              event.preventDefault();
              event.stopPropagation();
            }

            keyEvents.pop();
          });
        }
      },
    },

    commitText: (parameters, callback) => {
      const text = parameters.text;
      console.debug('commitText:', JSON.stringify(text));

      var textEvent = document.createEvent('TextEvent');
      textEvent.initTextEvent('textInput',
                              /*bubbles=*/true,
                              /*cancelable=*/true,
                              /*view=*/window,
                              /*data=*/text,
                              /*inputMethod=*/0,
                              /*locale=*/"en-US");
      document.activeElement.dispatchEvent(textEvent);
      if (textEvent.defaultPrevented) {
        console.debug('commitText: Event handler consumed text.');
        return;
      }

      let element = document.activeElement;

      if (element.selectionStart != null) {
        let scrollTop = element.scrollTop;
        let prefix = element.value.substring(0, element.selectionStart);
        let suffix = element.value.substring(element.selectionEnd, element.value.length);
        element.value = prefix + text + suffix;
        element.selectionStart = prefix.length + text.length;
        element.selectionEnd = element.selectionStart;
        element.focus();
        element.scrollTop = scrollTop;
        return;
      }

      if (element.contentEditable == "true") {
        let scrollTop = element.scrollTop;

        let selection = document.getSelection();
        if (selection.anchorNode.nodeType != Node.TEXT_NODE) {
          console.error('commitText: Selection is not a text node.');
          return;
        }
        if (selection.anchorNode !== selection.focusNode) {
          console.error('commitText: Selection spans multiple nodes.');
          return;
        }
        let content = selection.anchorNode.textContent;
        let prefix = content.substring(0, selection.anchorOffset);
        let suffix = content.substring(selection.focusOffset,
                                       content.length);
        selection.anchorNode.textContent = prefix + text + suffix;

        // When we update textContent, the selection resets to the beginning of
        // the node. Move the cursor to the end of the inserted text.
        element.scrollTop = scrollTop;
        selection = document.getSelection();
        for (let n = lengthInCodepoints(prefix) + lengthInCodepoints(text);
             n > 0;
             n -= 1) {
          selection.modify('move', 'forward', 'character');
        }
      }

      console.debug('commitText: No editable selection to commit to.');
    },

    sendKeyEvents: (parameters, callback) => {
      console.debug('sendKeyEvents: ', parameters.keyData);
      for (let event of parameters.keyData) {
        let realEvent = new KeyboardEvent(event.type, event);
        document.activeElement.dispatchEvent(realEvent);
      }
    },

    keyEventHandled: () => {},
  };
}
