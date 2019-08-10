// ==UserScript==
// @name         DarkReader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  turn reading articles in a monochrome pleasure for your eyes
// @author       Tim L. Greller
// @match        *://*/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function(){
    document.querySelectorAll("*").forEach(function(_){
        _.style.color = "#c3c0b8";
        _.style.backgroundColor = "#1d1511";
    });
});