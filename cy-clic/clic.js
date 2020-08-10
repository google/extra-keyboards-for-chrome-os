var lliw1 = ' key-pressed';
var lliw2 = ' shift-pressed';
var shift = false;

var clic = function (e) {
    e = e || window.event;
    var k = e.keyCode || e.which;

    if (k === 13) {
        document.getElementById('enter').className += (lliw1);
    } else if (k === 8) {
        document.getElementById('backspace').className += (lliw1);
    } else if (k === 16) {
        document.getElementById('shift-right').className += (lliw2);
        document.getElementById('shift-left').className += (lliw2);
        shift = true;
    }
};

var allwedd = function (e) {
    e = e || window.event;
    var b = String.fromCharCode(e.which).toLowerCase();

    if (b) {
        if (shift === true) {
            document.getElementById(b).className += (lliw2);
        } else {
            document.getElementById(b).className += (lliw1);
        }
    }
};


var rhyddhau = function (e) {
    e = e || window.event;
    var k = e.keyCode || e.which;
    var b = String.fromCharCode(e.which).toLowerCase();

    //document.getElementById('enter').className = ("");
    //document.getElementById('backspace').className = ("");
    
    if (k !== 16) {
        document.getElementById(b).className = ("");
    }
    if (k === 16) {
        console.log('here')
        document.getElementById('shift-left').className = ("");
        document.getElementById('shift-right').className = ("");
        shift = false;
    }
};

document.onkeypress = allwedd;
document.onkeydown = clic;
document.onkeyup = rhyddhau;