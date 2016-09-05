// Script
$(document).on('mouseover', 'a', function (e) {
    let target = $(e.target)[0];
    currentUrlElement = target.href;
});

var numberOfRightClicks = 0;
var currentUrlElement = undefined;

window.oncontextmenu = function () {
    numberOfRightClicks++;

    if (numberOfRightClicks >= 2) {
        numberOfRightClicks = 0;

        if (currentUrlElement !== undefined) {
            Clipboard.copy(currentUrlElement);
            displayMessage('Copied a link to ' + currentUrlElement);
            return false;
        }
    }
}

function displayMessage(msg) {
    let dialogCss = {
        "position": "fixed",
        "bottom": "25px",
        "left": "10px",
        "color": "white",
        "background": "#00a3e4",
        "border-radius": "10px",
        "border": "2px solid #EEE",
        "padding": "5px 10px",
        "z-index": 9999999999
    };

    $('body').append($('<div id="doubleRightClickDialog">')
        .css(dialogCss)
        .text(msg)
        .hide()
        .fadeIn(200)
        .delay(500)
        .fadeOut(1000, function () { $(this).remove(); })
    );
}

// Clipboard
var Clipboard, root;

Clipboard = {
    _createTextArea: function () {
        var textArea;
        textArea = document.createElement("textarea");
        textArea.style.position = "absolute";
        textArea.style.left = "-100%";
        return textArea;
    },
    copy: function (arg) {
        var data, textArea;
        data = arg;
        textArea = this._createTextArea();
        textArea.value = data;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        return document.body.removeChild(textArea);
    },
    paste: function () {
        var textArea, value;
        textArea = this._createTextArea();
        document.body.appendChild(textArea);
        textArea.focus();
        document.execCommand("Paste");
        value = textArea.value;
        document.body.removeChild(textArea);
        return value;
    }
};

root = typeof exports !== "undefined" && exports !== null ? exports : window;

root.Clipboard = Clipboard;