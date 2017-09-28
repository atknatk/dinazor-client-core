/**
 * Created by cabbar on 09.05.2017.
 */
export interface IDictionary {
    get(key: string): any;

    add(key: string, value: any): void;

    addOrUpdate(key: string, value: any): void;

    remove(key: string): void;

    containsKey(key: string): boolean;

    keys(): string[];

    values(): any[];

}

export class Dictionary implements IDictionary {

    _keys: string[] = [];
    _values: any[] = [];

    constructor(init?: { key: string; value: any; }[]) {
        if (init) {
            for (let x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
    }

    add(key: string, value: any) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }


    addOrUpdate(key: string, value: any) {
        let index = this._keys.indexOf(key, 0);
        if (index === -1) {
            this.add(key, value);
        } else {
            this[key] = value;
            this._values[index] = value;
        }
    }

    get(key: string): any {
        let index = this._keys.indexOf(key, 0);
        return this._values[index];
    }

    remove(key: string) {
        let index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys;
    }

    values(): any[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === 'undefined') {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary {
        return this;
    }

    getUsableKey() {
        this._keys.forEach(key => {
            for (let index = 1; index < Number.MAX_VALUE; index++) {
                if (isNaN(Number(key))) {
                    return null;
                }
                if (+key != index) {
                    return index;
                } else {
                    break;
                }
            }
        });
    }

}
