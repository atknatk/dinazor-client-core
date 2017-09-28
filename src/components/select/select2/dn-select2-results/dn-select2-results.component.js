"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by cabbar on 12.04.2017.
 */
var core_1 = require("@angular/core");
var DnSelect2ResultsComponent = /** @class */ (function () {
    function DnSelect2ResultsComponent() {
        this.itemSelectedEvent = new core_1.EventEmitter();
        this.activeIndex = 0;
        this.ussingKeys = false;
    }
    DnSelect2ResultsComponent.prototype.activeNext = function () {
        if (this.activeIndex >= this.items.length - 1) {
            this.activeIndex = this.items.length - 1;
        }
        else {
            this.activeIndex++;
        }
        this.scrollToElement();
        this.ussingKeys = true;
    };
    DnSelect2ResultsComponent.prototype.activePrevious = function () {
        if (this.activeIndex - 1 < 0) {
            this.activeIndex = 0;
        }
        else {
            this.activeIndex--;
        }
        this.scrollToElement();
        this.ussingKeys = true;
    };
    DnSelect2ResultsComponent.prototype.getDisplaySelect = function (item) {
        if (this.displaySelect === undefined) {
            return item.name;
        }
        return this.displaySelect(item);
    };
    DnSelect2ResultsComponent.prototype.isSelected = function (currentItem) {
        var result = false;
        this.selectedItems.forEach(function (item) {
            if (item === currentItem) {
                result = true;
            }
        });
        return result;
    };
    DnSelect2ResultsComponent.prototype.ngOnInit = function () {
    };
    DnSelect2ResultsComponent.prototype.onHovering = function (event) {
        this.ussingKeys = false;
    };
    DnSelect2ResultsComponent.prototype.onItemSelected = function (item) {
        this.itemSelectedEvent.emit(item);
    };
    DnSelect2ResultsComponent.prototype.onMouseOver = function (index) {
        if (!this.ussingKeys) {
            this.activeIndex = index;
        }
    };
    DnSelect2ResultsComponent.prototype.scrollToElement = function () {
        var element = document.getElementById('item_' + this.activeIndex);
        var container = document.getElementById('resultsContainer');
        if (element) {
            container.scrollTop = element.offsetTop;
        }
    };
    DnSelect2ResultsComponent.prototype.selectCurrentItem = function () {
        if (this.items[this.activeIndex]) {
            this.onItemSelected(this.items[this.activeIndex]);
            this.activeIndex = 0;
        }
    };
    __decorate([
        core_1.Input()
    ], DnSelect2ResultsComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ResultsComponent.prototype, "searchFocused", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ResultsComponent.prototype, "selectedItems", void 0);
    __decorate([
        core_1.Input()
    ], DnSelect2ResultsComponent.prototype, "displaySelect", void 0);
    __decorate([
        core_1.Output()
    ], DnSelect2ResultsComponent.prototype, "itemSelectedEvent", void 0);
    DnSelect2ResultsComponent = __decorate([
        core_1.Component({
            selector: 'dn-select2-results',
            templateUrl: 'dn-select2-results.component.html',
            styleUrls: ['dn-select2-results.component.scss']
        })
    ], DnSelect2ResultsComponent);
    return DnSelect2ResultsComponent;
}());
exports.DnSelect2ResultsComponent = DnSelect2ResultsComponent;
