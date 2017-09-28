import { Injectable } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { Observable, Subject } from 'rxjs/Rx';
import { config } from '../dinazor.config';
var store = {
    smartSkin: localStorage.getItem('sm-skin') || config.smartSkin,
    skin: config.skins.find(function (_skin) {
        return _skin.name == (localStorage.getItem('sm-skin') || config.smartSkin);
    }),
    skins: config.skins,
    fixedHeader: localStorage.getItem('sm-fixed-header') == 'true',
    fixedNavigation: localStorage.getItem('sm-fixed-navigation') == 'true',
    fixedRibbon: localStorage.getItem('sm-fixed-ribbon') == 'true',
    fixedPageFooter: localStorage.getItem('sm-fixed-page-footer') == 'true',
    insideContainer: localStorage.getItem('sm-inside-container') == 'true',
    rtl: localStorage.getItem('sm-rtl') == 'true',
    menuOnTop: true,
    colorblindFriendly: localStorage.getItem('sm-colorblind-friendly') == 'true',
    shortcutOpen: false,
    isMobile: (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())),
    device: '',
    mobileViewActivated: false,
    menuCollapsed: false,
    menuMinified: false,
};
var LayoutService = /** @class */ (function () {
    function LayoutService() {
        var _this = this;
        this.subject = new Subject();
        this.store = store;
        this.trigger();
        Observable.fromEvent(window, 'resize').debounceTime(100).map(function () {
            _this.trigger();
        }).subscribe();
    }
    LayoutService.prototype.dumpStorage = function () {
        localStorage.setItem('sm-skin', this.store.smartSkin);
        localStorage.setItem('sm-fixed-header', this.store.fixedHeader);
        localStorage.setItem('sm-fixed-navigation', this.store.fixedNavigation);
        localStorage.setItem('sm-fixed-ribbon', this.store.fixedRibbon);
        localStorage.setItem('sm-fixed-page-footer', this.store.fixedPageFooter);
        localStorage.setItem('sm-inside-container', this.store.insideContainer);
        localStorage.setItem('sm-rtl', this.store.rtl);
        localStorage.setItem('sm-menu-on-top', this.store.menuOnTop);
        localStorage.setItem('sm-colorblind-friendly', this.store.colorblindFriendly);
    };
    LayoutService.prototype.factoryReset = function () {
        localStorage.clear();
        location.reload();
    };
    LayoutService.prototype.onCollapseMenu = function (value) {
        if (typeof value !== 'undefined') {
            this.store.menuCollapsed = value;
        }
        else {
            this.store.menuCollapsed = !this.store.menuCollapsed;
        }
        this.trigger();
    };
    LayoutService.prototype.onColorblindFriendly = function () {
        this.store.colorblindFriendly = !this.store.colorblindFriendly;
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onFixedHeader = function () {
        this.store.fixedHeader = !this.store.fixedHeader;
        if (this.store.fixedHeader == false) {
            this.store.fixedRibbon = false;
            this.store.fixedNavigation = false;
        }
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onFixedNavigation = function () {
        this.store.fixedNavigation = !this.store.fixedNavigation;
        if (this.store.fixedNavigation) {
            this.store.insideContainer = false;
            this.store.fixedHeader = true;
        }
        else {
            this.store.fixedRibbon = false;
        }
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onFixedPageFooter = function () {
        this.store.fixedPageFooter = !this.store.fixedPageFooter;
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onFixedRibbon = function () {
        this.store.fixedRibbon = !this.store.fixedRibbon;
        if (this.store.fixedRibbon) {
            this.store.fixedHeader = true;
            this.store.fixedNavigation = true;
            this.store.insideContainer = false;
        }
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onInsideContainer = function () {
        this.store.insideContainer = !this.store.insideContainer;
        if (this.store.insideContainer) {
            this.store.fixedRibbon = false;
            this.store.fixedNavigation = false;
        }
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onMenuOnTop = function () {
        this.store.menuOnTop = !this.store.menuOnTop;
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onMinifyMenu = function () {
        this.store.menuMinified = !this.store.menuMinified;
        this.trigger();
    };
    LayoutService.prototype.onRtl = function () {
        this.store.rtl = !this.store.rtl;
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.onShortcutToggle = function (condition) {
        if (condition == null) {
            this.store.shortcutOpen = !this.store.shortcutOpen;
        }
        else {
            this.store.shortcutOpen = !!condition;
        }
        this.trigger();
    };
    LayoutService.prototype.onSmartSkin = function (skin) {
        this.store.skin = skin;
        this.store.smartSkin = skin.name;
        this.dumpStorage();
        this.trigger();
    };
    LayoutService.prototype.processBody = function (state) {
        var $body = $('body');
        var $html = $('html');
        $body.removeClass(state.skins.map(function (it) { return (it.name); }).join(' '));
        $body.addClass(state.skin.name);
        $('#logo img').attr('src', state.skin.logo);
        $body.toggleClass('fixed-header', state.fixedHeader);
        $body.toggleClass('fixed-navigation', state.fixedNavigation);
        $body.toggleClass('fixed-ribbon', state.fixedRibbon);
        $body.toggleClass('fixed-page-footer', state.fixedPageFooter);
        $body.toggleClass('container', state.insideContainer);
        $body.toggleClass('smart-rtl', state.rtl);
        $body.toggleClass('menu-on-top', state.menuOnTop);
        $body.toggleClass('colorblind-friendly', state.colorblindFriendly);
        $body.toggleClass('shortcut-on', state.shortcutOpen);
        state.mobileViewActivated = $(window).width() < 979;
        $body.toggleClass('mobile-view-activated', state.mobileViewActivated);
        if (state.mobileViewActivated) {
            $body.removeClass('minified');
        }
        if (state.isMobile) {
            $body.addClass('mobile-detected');
        }
        else {
            $body.addClass('desktop-detected');
        }
        if (state.menuOnTop)
            $body.removeClass('minified');
        if (!state.menuOnTop) {
            $html.toggleClass('hidden-menu-mobile-lock', state.menuCollapsed);
            $html.toggleClass('hidden-menu', state.menuCollapsed);
            $body.removeClass('minified');
        }
        else if (state.menuOnTop && state.mobileViewActivated) {
            $html.toggleClass('hidden-menu-mobile-lock', state.menuCollapsed);
            $body.toggleClass('hidden-menu', state.menuCollapsed);
            $body.removeClass('minified');
        }
        if (state.menuMinified && !state.menuOnTop && !state.mobileViewActivated) {
            $body.addClass('minified');
            $body.removeClass('hidden-menu');
            $html.removeClass('hidden-menu-mobile-lock');
        }
    };
    LayoutService.prototype.subscribe = function (next, err, complete) {
        return this.subject.subscribe(next, err, complete);
    };
    LayoutService.prototype.trigger = function () {
        this.processBody(this.store);
        this.subject.next(this.store);
    };
    LayoutService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LayoutService.ctorParameters = function () { return []; };
    return LayoutService;
}());
export { LayoutService };
//# sourceMappingURL=layout.service.js.map