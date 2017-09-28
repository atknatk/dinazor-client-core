/**
 * Created by cabbar on 12.04.2017.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var DnSelect2ResultsComponent = /** @class */ (function () {
    function DnSelect2ResultsComponent() {
        this.itemSelectedEvent = new EventEmitter();
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
    DnSelect2ResultsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dn-select2-results',
                    templateUrl: 'dn-select2-results.component.html',
                    styles: ["\n        .select2-results-container {\n            border: 1px solid #ddd;\n            width: 100%;\n            max-height: 200px;\n            overflow-y: auto;\n            position: absolute;\n            background: #fff;\n            margin-top: -11px;\n            z-index: 3;\n        }\n\n        .select2-result {\n            padding: 5px;\n            position: relative;\n            width: 100%;\n        }\n\n        .select2-result:hover {\n            cursor: pointer;\n        }\n\n        .active {\n            background: #337ab7;\n            color: #fff;\n        }\n\n        .selected {\n            background: #EEE;\n            color: black;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    DnSelect2ResultsComponent.ctorParameters = function () { return []; };
    DnSelect2ResultsComponent.propDecorators = {
        'items': [{ type: Input },],
        'searchFocused': [{ type: Input },],
        'selectedItems': [{ type: Input },],
        'displaySelect': [{ type: Input },],
        'itemSelectedEvent': [{ type: Output },],
    };
    return DnSelect2ResultsComponent;
}());
export { DnSelect2ResultsComponent };
//# sourceMappingURL=dn-select2-results.component.js.map