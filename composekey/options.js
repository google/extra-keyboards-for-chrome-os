function saveAndSync() {
  var key = document.getElementById('key').value;
  chrome.extension.getBackgroundPage().setKey(key);

  chrome.storage.sync.set({ key: key }, function() {
    console.log("sync'd key as " + key);
  })
}

function restore() {
  document.getElementById('key').value =
      chrome.extension.getBackgroundPage().composeKey;
  document.addEventListener('storage', function(event) {
    var old = document.getElementById('key').value;
    if (event.key == 'key' && event.newValue != old) {
      document.getElementById('key').value = event.newValue;
    }
  })
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('key').addEventListener('input', saveAndSync);
