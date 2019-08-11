// ==UserScript==
// @name         Darksite
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  browse the dark side
// @author       Tim L. Greller
// @match        *://*/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function(){
    document.body.style.backgroundColor = "#1d1511";
    document.querySelectorAll("*").forEach(adjustColor);
});


function adjustColor(element) {
    var style = window.getComputedStyle(element);
    var background = new Color(style['background-color']);
    var text = new Color(style['color']);
    if (background.luma > 100 || text.luma < 200) {
        element.style.color = text.inverted.toString();
        element.style.backgroundColor = background.inverted.toString();
    }
}


var Color = (function () {
    function toHex(num, padding) { return num.toString(16).padStart(padding || 2); }
    function parsePart(value) {
        var perc = value.lastIndexOf('%');
        return perc < 0 ? value : value.substr(0, perc);
    }
    function Color(data) {
        if (arguments.length > 1) {
            this[0] = arguments[0];
            this[1] = arguments[1];
            this[2] = arguments[2];
            if (arguments.length > 3) { this[3] = arguments[3]; }
        } else if (data instanceof Color || Array.isArray(data)) {
            this[0] = data[0];
            this[1] = data[1];
            this[2] = data[2];
            this[3] = data[3];
        } else if (typeof data === 'string') {
            data = data.trim();
            if (data[0] === "#") {
                switch (data.length) {
                    case 4:
                        this[0] = parseInt(data[1], 16); this[0] = (this[0] << 4) | this[0];
                        this[1] = parseInt(data[2], 16); this[1] = (this[1] << 4) | this[1];
                        this[2] = parseInt(data[3], 16); this[2] = (this[2] << 4) | this[2];
                        break;
                    case 9:
                        this[3] = parseInt(data.substr(7, 2), 16);
                    //Fall Through
                    case 7:
                        this[0] = parseInt(data.substr(1, 2), 16);
                        this[1] = parseInt(data.substr(3, 2), 16);
                        this[2] = parseInt(data.substr(5, 2), 16);
                        break;
                }
            } else if (data.startsWith("rgb")) {
                var parts = data.substr(data[3] === "a" ? 5 : 4, data.length - (data[3] === "a" ? 6 : 5)).split(',');
                this.r = parsePart(parts[0]);
                this.g = parsePart(parts[1]);
                this.b = parsePart(parts[2]);
                if (parts.length > 3) { this.a = parsePart(parts[3]); }
            }
        }
    }
    Color.prototype = {
        constructor: Color,
        0: 255,
        1: 255,
        2: 255,
        3: 255,
        get r() { return this[0]; },
        set r(value) { this[0] = value == null ? 0 : Math.max(Math.min(parseInt(value), 255), 0); },
        get g() { return this[1]; },
        set g(value) { this[1] = value == null ? 0 : Math.max(Math.min(parseInt(value), 255), 0); },
        get b() { return this[2]; },
        set b(value) { this[2] = value == null ? 0 : Math.max(Math.min(parseInt(value), 255), 0); },
        get a() { return this[3] / 255; },
        set a(value) { this[3] = value == null ? 255 : Math.max(Math.min(value > 1 ? value : parseFloat(value) * 255, 255), 0); },
        get luma() { return .299 * this.r + .587 * this.g + .114 * this.b; },
        get inverted() { return new Color(255 - this[0], 255 - this[1], 255 - this[2], this[3]); },
        toString: function (option) {
            if (option === 16) {
                return '#' + toHex(this.r) + toHex(this.g) + toHex(this.b) + (this[3] === 255 ? '' : toHex(this[3]));
            } else if (option === '%') {
                if (this.a !== 1) {
                    return `rgba(${this.r / 255 * 100}%, ${this.b / 255 * 100}%, ${this.g / 255 * 100}%, ${this.a / 255})`;
                } else {
                    return `rgb(${this.r / 255 * 100}%, ${this.b / 255 * 100}%, ${this.g / 255 * 100})%`;
                }
            } else {
                if (this.a !== 1) {
                    return `rgba(${this.r}, ${this.b}, ${this.g}, ${this.a})`;
                } else {
                    return `rgb(${this.r}, ${this.b}, ${this.g})`;
                }
            }
        }
    };

    return Color;
}());
