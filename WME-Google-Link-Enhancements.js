// ==UserScript==
// @name         WME Google Link Enhancements
// @namespace    WazeDev
// @version      2018.03.06.001
// @description  Shows Google places on the map when hovering over links.  Highlights links that are already linked.
// @author       MapOMatic
// @include      /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor\/?.*$/
// @require      https://greasyfork.org/scripts/39208-wme-utils-google-link-enhancer/code/WME%20Utils%20-%20Google%20Link%20Enhancer.js
// @license      GNU GPLv3
// ==/UserScript==

let SETTINGS_STORE_NAME = '_wme_gle_settings';
let WARNING_TEXT = 'GOOGLE LINK ENHANCEMENTS\n\nInformation displayed by this script should only be used as a reference.\n\nDO NOT delete Waze places without verifying the place is actually closed.  Some may only be closed seasonally, for instance.' +
    '\n\nReview Wazeopedia for the proper way to handle closed places.  If in doubt, ask in your community forum.';
let _glEnhancer;
let _settings = {};

function loadSettings() {
    var loadedSettings = $.parseJSON(localStorage.getItem(SETTINGS_STORE_NAME));
    var defaultSettings = {
        warningDisplayed: false
    };
    _settings = loadedSettings ? loadedSettings : defaultSettings;
    for (var prop in defaultSettings) {
        if (!_settings.hasOwnProperty(prop)) {
            _settings[prop] = defaultSettings[prop];
        }
    }
}

function saveSettings() {
    if (localStorage) {
        localStorage.setItem(SETTINGS_STORE_NAME, JSON.stringify(_settings));
    }
}

function init() {
    loadSettings();
    _glEnhancer = new GoogleLinkEnhancer();
    _glEnhancer.enable();
    if (!_settings.warningDisplayed) {
        alert(WARNING_TEXT);
        _settings.warningDisplayed = true;
        saveSettings();
    }
}

function bootstrap() {
    if (W && W.loginManager && W.loginManager.isLoggedIn()) {
        init();
    } else {
        setTimeout(() => bootstrap(), 500);
    }
}

bootstrap();
