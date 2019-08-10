// ==UserScript==
// @name         Darksite
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  browse the dark side
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