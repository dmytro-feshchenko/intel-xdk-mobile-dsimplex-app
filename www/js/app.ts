/// <reference path="./jquery.d.ts"/>

declare module Backbone {
    export class Model {
        constructor (attr? , opts? );
        get(name: string): any;
        set(name: string, val: any): void;
        set(obj: any): void;
        fetch(opts?: any): void;
        save(attr? , opts? ): void;
        destroy(): void;
        bind(ev: string, f: Function, ctx?: any): void;
        toJSON(): any;
    }
    export class Collection<T> {
        constructor (models? , opts? );
        bind(ev: string, f: Function, ctx?: any): void;
        length: number;
        create(attrs, opts? ): any;
        each(f: (elem: T) => void ): void;
        fetch(opts?: any): void;
        last(): T;
        last(n: number): T[];
        filter(f: (elem: T) => boolean): T[];
        without(...values: T[]): T[];
    }
    export class View {
        constructor (options? );
        $(selector: string): JQuery;
        el: HTMLElement;
        $el: JQuery;
        model: Model;
        remove(): void;
        delegateEvents: any;
        make(tagName: string, attrs? , opts? ): View;
        setElement(element: HTMLElement, delegate?: boolean): void;
        setElement(element: JQuery, delegate?: boolean): void;
        tagName: string;
        events: any;

        static extend: any;
    }
}

interface JQuery {
    fadeIn(): JQuery;
    fadeOut(): JQuery;
    focus(): JQuery;
    html(): string;
    html(val: string): JQuery;
    show(): JQuery;
    addClass(className: string): JQuery;
    removeClass(className: string): JQuery;
    append(el: HTMLElement): JQuery;
    val(): string;
    val(value: string): JQuery;
    attr(attrName: string): string;
}
//declare var $: {
//    (el: HTMLElement): JQuery;
//    (selector: string): JQuery;
//    (readyCallback: () => void ): JQuery;
//};
declare var _: {
    each<T, U>(arr: T[], f: (elem: T) => U): U[];
    delay(f: Function, wait: number, ...arguments: any[]): number;
    template(template: string): (model: any) => string;
    template(template: string, data: any): (model: any) => string;
    bindAll(object: any, ...methodNames: string[]): void;
};
declare var Store: any;

class Fraction
{
    public numerator: number;
    public denominator : number;

    constructor(_numerator?, _denominator?)
    {
        if(_denominator == undefined)
            _denominator = 1;
        if(_numerator == undefined)
            _numerator = 0;

        if(_denominator == 0)
            throw Error('divide by zero');
        if(typeof _numerator == "number")
            this.numerator = _numerator;
        else this.numerator = 0;
        if(typeof _denominator == "number")
            this.denominator = _denominator;
        else this.denominator = 1;
        this.normalize();
    }

    /**
     * operator '+' *
     */
    static addition(a, b) {
        return new Fraction(
            a.numerator * b.denominator + b.numerator * a.denominator,
            a.denominator * b.denominator
        );
    };

    /**
     * operator '-' *
     */
    static subtraction(a, b) {
        return new Fraction(
            a.numerator * b.denominator - b.numerator * a.denominator,
            a.denominator * b.denominator
        );
    };
    /**
     * operator 'x' *
     */
    static multiplication(a, b) {
        return new Fraction(
            a.numerator * b.numerator,
            a.denominator * b.denominator
        );
    };
    /**
     * operator ':' *
     */
    static division(a, b) {
        return new Fraction(
            a.numerator * b.denominator,
            a.denominator * b.numerator
        );
    };
    /**
     * operator '==' *
     */
    static isEqual(a, b) {
        //if (typeof a.numerator == "undefined" ||
        //    typeof a.denominator == "undefined" ||
        //    typeof b != "number" &&
        //    (typeof b.numerator == "undefined" || typeof b.denominator == "undefined")) {
        //    throw new Error("incorrect input data");
        //}

        if (typeof b == "number")
            return (a.numerator / a.denominator == b);
        return (a.numerator / a.denominator == b.numerator / b.denominator);
    };

    /**
     * operator '!=' *
     */
    static isNotEqual(a, b) {
        return !Fraction.isEqual(a, b);
    };
    /**
     * operator '>' *
     */
    static more(a, b) {
        if (typeof a.numerator == "undefined" ||
            typeof a.denominator == "undefined" ||
            typeof b != "number" &&
            (typeof b.numerator == "undefined" || typeof b.denominator == "undefined"))
            throw new Error("incorrect input data");
        if (typeof b == "number")
            return (a.numerator / a.denominator > b);
        return (a.numerator / a.denominator > b.numerator / b.denominator);
    };
    /**
     * operator '<' *
     */
    static less(a, b) {
        if(Fraction.isEqual(a, b)) return false;
        return !Fraction.more(a, b);
    };
    /**
     * operator '>=' *
     */
    static moreOrEqual(a, b) {
        return !Fraction.less(a, b);
    };
    /**
     * operator '<=' *
     */
    static lessOrEqual(a, b) {
        return !Fraction.more(a, b);
    };

    static parse(str) {
        if(str=="")
            return new Fraction();
        var strs = str.split('/');
        var a = 0;
        var b = 1;
        a = parseInt(strs[0]);
        if (strs.length == 2)
            b = parseInt(strs[1]);
        if (typeof a != 'number' || isNaN(a) || typeof b != 'number' || isNaN(b) || strs.length > 2)
            throw Error("Неможливо зчитати дані");
        else return new Fraction(a, b);
    };

    integerPart() {
        var value = this.numerator/this.denominator;
        return parseInt(value.toString());
    };
    fractionalPart() {
        var t = this.numerator % this.denominator;
        return new Fraction(t >= 0 ? t : this.denominator + t, this.denominator);
    };
    module(){

    };
    isNull() {
        return (this.numerator == 0);
    };
    toString() {
        return this.numerator + (this.denominator == 1 ? "" : "/" + this.denominator);
    };
    contraction() {
        if(this.numerator == -0) this.numerator = 0;
        if (this.numerator == 0) {
            this.denominator = 1;
            return this;
        }
        var _gcd = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
        this.numerator /= _gcd;
        this.denominator /= _gcd;
        return this;
    };
    normalize = function() {
        if (this.denominator < 0) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        this.contraction();
    };

    gcd(a, b) {
        while (a != b)
        {
            if (a > b) a -= b;
            else b -= a;
        }
        return a;
    };

}




class Expression
{
    public c: Fraction;
    public M: Fraction;

    constructor (_c?, _M?) {
        this.c = new Fraction(0, 1);
        this.M = new Fraction(0, 1);

        if(typeof _c != "undefined") {
            if (typeof _c == "number")
                this.c = new Fraction(_c, 1);
            else this.c = _c;
        }
        if(typeof _M != "undefined") {
            if (typeof _M == "number")
                this.M = new Fraction(_M, 1);
            else this.M = _M;
        }
    }

    /**
     * operator '+' *
     */
    static addition(a, b) {
        return new Expression(
            Fraction.addition(a.c, b.c),
            Fraction.addition(a.M, b.M)
        );
    };
    /**
     * operator '-' *
     */
    static subtraction(a, b) {
        return new Expression(
            Fraction.subtraction(a.c, b.c),
            Fraction.subtraction(a.M, b.M)
        );
    };
    /**
     * operator 'x' *
     */
    static multiplication(a, b) {
        return new Expression(
            Fraction.multiplication(a.c, b),
            Fraction.multiplication(a.M, b)
        );
    };
    /**
     * operator ':' *
     */
    static division(a, b) {
        return new Expression(
            Fraction.division(a.c, b),
            Fraction.division(a.M, b)
        );
    };
    /**
     * operator '==' *
     */
    static isEqual(a, b) {

        if (typeof b == "number") {
            if (Fraction.isNotEqual(a.M, 0))
                return false;
            if (Fraction.isEqual(a.c, b))
                return true;
            return false;
        }
        if (Fraction.isNotEqual(a.M, b.M))
            return false;
        if (Fraction.isEqual(a.M, b.M))
            if (Fraction.isNotEqual(a.c, b.c))
                return false;
        return true;
    };
    /**
     * operator '!=' *
     */
    static isNotEqual(a, b) {
        return !Expression.isEqual(a, b);
    };
    /**
     * operator '>' *
     */
    static more(a, b) {

        if (typeof b == "number")
            return !(Fraction.isEqual(a.M, 0) && Fraction.less(a.c, b));

        if (Fraction.more(a.M, b.M))
            return true;

        if (Fraction.isEqual(a.M, b.M)) if (Fraction.more(a.c, b.c)) return true;
        return false;
    };
    /**
     * operator '<' *
     */
    static less(a, b) {
        return !Expression.moreOrEqual(a, b);
    };
    /**
     * operator '>=' *
     */
    static moreOrEqual(a, b) {

        if(Expression.isEqual(a, b)) return true;
        if (typeof b == "number")
            return !(Fraction.isEqual(a.M, 0) && Fraction.less(a.c, b));
        if (Fraction.more(a.M, b.M))
            return true;

        if (Fraction.isEqual(a.M, b.M)) if (Fraction.more(a.c, b.c))
            return true;

        return false;
    };
    /**
     * operator '<=' *
     */
    static lessOrEqual(a, b) {
        return !Expression.more(a, b);
    };

    static parse(str) {
        if(str == 'M' || str == 'm' || str == 'М' || str == 'м')
            return new Expression(0,1);
        else return new Expression(Fraction.parse(str),0);
    };

    toString() {
        var str = "";
        if (!this.M.isNull()) {
            if (Fraction.isNotEqual(this.M, 1)) str += this.M.toString() + "*";
            str+= "M";
        }
        if(!this.c.isNull()) {
            if (Fraction.more(this.c, 0) && Fraction.isNotEqual(this.M, 0)) str += "+";
            str += this.c.toString();
        }
        if(str.length == 0) str = "0";

        return str;
    };
}








class DSimplexTable
{
    public koefs;     // Fraction[,]
    public freeKoefs; // Fraction[]
    public fxKoefs ;   // Expression[]
    public grades;    // Expression[]
    public fx;        // Expression
    public basic;     // int[]
    public x;         // string[] // x-names
    public m;    // size
    public n;    //
    public _i;        // basis-in
    public _j;        // basis-out
    public hop;   //number of table
    public result;    //is ended ?
    public str;

    constructor(m?, n?) {
        if(typeof m !== 'undefined')
            this.m = m;
        if(typeof n !== 'undefined')
            this.n = n;
        this.hop = 0;
    }

    setData(data) {
        this.m = data.m;
        this.n = data.n;
        this.koefs = [];
        this.freeKoefs = [];
        this.basic = [];
        this.fxKoefs = [];
        this.x = [];

        for (var i = 0; i < this.m; i++) {
            this.freeKoefs[i] = data[i][this.n];
            this.koefs[i] = [];
            for (j = 0; j < this.n; j++)
                this.koefs[i][j] = data[i][j];
        }
        for (var j = 0; j < this.n; j++)
        {
            this.fxKoefs[j] = data[this.m][j];
            this.x[j] = "x" + (j + 1);
        }
        if(!this.getBasic()) {
            throw Error("Неможливо побудувати базис");
        }
    };

    btnClick() {
        switch (this.hop) {
            case 0:  this.buildTable();             break;
            case -1: this.doneMessage(this.result); break;
            default: this.nextTable();              break;
        }
    };

    buildTable() {
        this.grades = [];
        for (var i = 0; i < this.n; i++) {
            //console.log(new Expression().toString() + "new");
            this.grades[i] = Expression.subtraction(new Expression(), this.fxKoefs[i]);
            //console.log(this.grades[i].toString() +" gr " + i);
            for (var j = 0; j < this.m; j++) {
                this.grades[i] = Expression.addition(this.grades[i], Expression.multiplication(this.fxKoefs[this.basic[j]], this.koefs[j][i]));
            }
        }
        this.fx = new Expression();
        for (j = 0; j < this.m; j++) {
            this.fx = Expression.addition(this.fx, Expression.multiplication(this.fxKoefs[this.basic[j]], this.freeKoefs[j]));
        }

        if (this.doneMessage(this.result = this.isEnd()))
            this.hop = -1;
        else this.hop++;
    };

    nextTable() {
        var tmpF;
        var tmpE = new Expression();
        this.basic[this._i] = this._j;
        if (Fraction.isNotEqual((tmpF = this.koefs[this._i][this._j]), 1)) {
            for (var j = 0; j < this.n; j++)
                this.koefs[this._i][j] = Fraction.division(this.koefs[this._i][j], tmpF);
            this.freeKoefs[this._i] = Fraction.division(this.freeKoefs[this._i], tmpF);
        }

        for (var i = 0; i < this.m; i++) {
            if (i == this._i) tmpE = Expression.subtraction(new Expression(), this.grades[this._j]);
            else              tmpF = Fraction.subtraction(new Fraction(), this.koefs[i][this._j]);

            for (j = 0; j < this.n; j++)
                if (i == this._i)
                    this.grades[j] = Expression.addition(this.grades[j], Expression.multiplication(tmpE, this.koefs[this._i][j]));
                else
                    this.koefs[i][j] = Fraction.addition(this.koefs[i][j], Fraction.multiplication(tmpF, this.koefs[this._i][j]));

            if (i == this._i)
                this.fx = Expression.addition(this.fx, Expression.multiplication(tmpE, this.freeKoefs[this._i]));
            else
                this.freeKoefs[i] = Fraction.addition(this.freeKoefs[i], Fraction.multiplication(tmpF, this.freeKoefs[this._i]));
        }

        if (this.doneMessage(this.result = this.isEnd()))
            this.hop = -1;
        else this.hop++;
    };

    isEnd() {
        var minF = new Fraction(0);
        for(var i = 0; i < this.m; i++)
            if(Fraction.less(this.freeKoefs[i], minF)){
                minF = this.freeKoefs[i];
                this._i = i;
            }
        var check = new Fraction(0);
        if(Fraction.isEqual(minF, check))
            return 1;

        var min = new Expression(10000000, 1);
        var tmp1;
        for(var j = 0; j < this.n; j++) {
            if (Fraction.more(this.koefs[this._i][j], 0) || Fraction.isEqual(this.koefs[this._i][j], 0)) {
                continue;
            }
            tmp1 = Expression.division(this.grades[j], this.koefs[this._i][j]);
            if (Expression.isEqual(tmp1, min))
                continue;
            if (Expression.less(tmp1, min)) {

                min = tmp1;
                console.log(min);
                this._j = j;
            }
        }
        var check1 = new Expression(10000000, 1);
        if (Expression.isEqual(min, check1)){
            return -1;
        }
        return 0;
    };

    getBasic() {
        var t = 0;
        this.basic = [];
        for (var i = 0; i < this.n; i++) {
            if (Expression.less(this.fxKoefs[i], 0))
                throw Error('koef f(x) менше 0');
        }
        for (var j = 0; j < this.n; j++)
        {
            var counter = 0;
            for (var i = 0; i < this.m; i++) {
                if (counter == 0 && Fraction.isEqual(this.koefs[i][j], 1)) counter++;
                else if (Fraction.isEqual(this.koefs[i][j], 0)) continue;
                else {
                    counter = 2;
                    break;
                }
            }
            if (counter == 1) this.basic[t++] = j;
        }

        return (t == this.m);
    };

    doneMessage(res) {
        this.str="";
        switch (res)
        {
            case -1: this.str = "МПР порожня"; break;
            case 1:  this.str = "Отриманий оптимальний розв`язок"; break;
            case 0:  this.str = "Pадача потребує подальшої оптимізації"; return false;
        }
        return true;
    };
}

class GomoriSimplexTable
{
    public koefs;      // Fraction[,]
    public freeKoefs;  // Fraction[]
    public fxKoefs;    // Expression[]
    public grades;     // Expression[]
    public fx;         // Expression
    public signs;      // int[]
    public isInteger;  // int[]
    //this.isPositive; // int[]
    public basic;      // int[]
    public x;          // string[] // x-names
    public m;     // size
    public n;     //
    public _i;         // basis-in
    public _j;         // basis-out
    public hop;    // number of table
    public result;     // is ended ?
    public mm;         // ->min/max ?
    public xcount;     // sizeof(x*)
    public isend;

    constructor(_m, _n) {
        this.m = _m;
        this.n = _n;
        this.isend = false;
        this.hop = 0;
    }

    setData(data) {
        this.m = data.m;
        this.n = data.n;
        this.mm = data.mm;
        this.xcount = this.n;
        this.koefs = new Array();
        this.freeKoefs = new Array();
        this.basic = new Array();
        this.fxKoefs = new Array();
        this.signs = new Array();
        this.isInteger = new Array();
        //this.isPositive = new Array();
        this.x = new Array();
        this.basic = new Array();

        for (var i = 0; i < this.m; i++) {
            this.freeKoefs[i] = data[i][this.n];

            this.signs[i] = data[this.m + 1][i];

            this.koefs[i] = new Array();
            for (j = 0; j < this.n; j++)
                this.koefs[i][j] = data[i][j];
        }
        for (var j = 0; j < this.n; j++)
        {
            this.fxKoefs[j] = data[this.m][j];
            //this.isPositive[j] = data[this.m + 2][j];
            this.isInteger[j] = data[this.m + 3][j];
            this.x[j] = "x" + (j + 1);
        }
        console.log("lell");
        this.xChange();
    };

    /*GomoriSimplexTable.prototype.test = function() {
     this.m = 3;
     this.n = 5;
     this.koefs = new Array();
     this.freeKoefs = new Array();
     this.basic = new Array();
     this.fxKoefs = new Array();
     this.x = new Array();
     var tmp = [
     [-1, -1, 1, 0, 0],
     [-3, 0, -2, -1, 0],
     [-1, 0, -3, 0, -1]
     ];
     var tmp2 = [ 2, 3, 12 ];
     var tmp3 = [ 2, 1, 0, 0, 0 ];

     for (var i = 0; i < 3; i++) {
     this.freeKoefs[i] = new Fraction(tmp2[i]);
     this.koefs[i] = new Array();
     for (j = 0; j < 5; j++)
     this.koefs[i][j] = new Fraction(tmp[i][j]);
     }
     for (var j = 0; j < 5; j++)
     {
     this.fxKoefs[j] = new Expression(tmp3[j]);
     this.x[j] = "x" + (j + 1);
     }
     };*/

    btnClick() {
        //while (this.hop != 4) {
        switch (this.hop) {
            case 0:
                this.buildTable();
                break;
            //case 4: this.doneMessage(this.result); break;
            case 2:
                this.buildCut();
                break;
            case 3:
                this.calcCut();
                break;
            case 1:
                this.nextTable();
                break;
        }
        this.hop = this.isEnd();
        //}
    };

    buildTable() {
        this.grades = new Array();
        for (var i = 0; i < this.n; i++) {
            this.grades[i] = Expression.subtraction(new Expression(), this.fxKoefs[i]);
            for (var j = 0; j < this.m; j++) {
                this.grades[i] = Expression.addition(this.grades[i], Expression.multiplication(this.fxKoefs[this.basic[j]], this.koefs[j][i]));
            }
        }
        this.fx = new Expression();
        for (j = 0; j < this.m; j++) {
            this.fx = Expression.addition(this.fx, Expression.multiplication(this.fxKoefs[this.basic[j]], this.freeKoefs[j]));
        }
    };

    nextTable() {
        var tmpF;
        var tmpE = new Expression();
        this.basic[this._i] = this._j;
        if (Fraction.isNotEqual((tmpF = this.koefs[this._i][this._j]), 1)) {
            for (var j = 0; j < this.n; j++)
                this.koefs[this._i][j] = Fraction.division(this.koefs[this._i][j], tmpF);
            this.freeKoefs[this._i] = Fraction.division(this.freeKoefs[this._i], tmpF);
        }

        for (var i = 0; i < this.m; i++) {
            if (i == this._i) tmpE = Expression.subtraction(new Expression(), this.grades[this._j]);
            else              tmpF = Fraction.subtraction(new Fraction(), this.koefs[i][this._j]);

            for (j = 0; j < this.n; j++)
                if (i == this._i)
                    this.grades[j] = Expression.addition(this.grades[j], Expression.multiplication(tmpE, this.koefs[this._i][j]));
                else
                    this.koefs[i][j] = Fraction.addition(this.koefs[i][j], Fraction.multiplication(tmpF, this.koefs[this._i][j]));

            if (i == this._i)
                this.fx = Expression.addition(this.fx, Expression.multiplication(tmpE, this.freeKoefs[this._i]));
            else
                this.freeKoefs[i] = Fraction.addition(this.freeKoefs[i], Fraction.multiplication(tmpF, this.freeKoefs[this._i]));
        }
    };

    buildCut() {
        //there should be cutoff
        var max = new Fraction();
        var min = new Expression(0, 9999999);
        var numberOfRow;
        for (var i = 0; i < this.m; i++) {
            if (this.isInteger[this.basic[i]] == true) {
                if (Fraction.moreOrEqual(this.freeKoefs[i].fractionalPart(), max)) {
                    max = this.freeKoefs[i].fractionalPart();
                    numberOfRow = i;
                }
            }
        }
        //add cutoff
        for (var i = 0; i < this.m; i++) {
            this.koefs[i][this.n] = new Fraction(0);
        }
        this.koefs[this.m] = new Array();
        for (var j = 0; j < this.n; j++) {
            //gamma j //strange big formula
            if (this.isInteger[j] == true) {
                if (Fraction.lessOrEqual(this.koefs[numberOfRow][j].fractionalPart(), this.freeKoefs[numberOfRow].fractionalPart()))
                    this.koefs[this.m][j] = Fraction.subtraction(new Fraction(0), this.koefs[numberOfRow][j].fractionalPart());
                else {
                    var sub = Fraction.subtraction(new Fraction(1), this.freeKoefs[numberOfRow].fractionalPart());
                    var div = Fraction.division(this.freeKoefs[numberOfRow].fractionalPart(), sub);
                    var sub = Fraction.subtraction(new Fraction(1), this.koefs[numberOfRow][j].fractionalPart());
                    var multi = Fraction.multiplication(div, sub);
                    this.koefs[this.m][j] = Fraction.subtraction(new Fraction(0), multi);
                }
            }
            else {
                if (Fraction.moreOrEqual(this.koefs[numberOfRow][j], new Fraction(0)))
                    this.koefs[this.m][j] = Fraction.subtraction(new Fraction(0), this.koefs[numberOfRow][j]);
                else {
                    var sub = Fraction.subtraction(new Fraction(1), this.freeKoefs[numberOfRow].fractionalPart());
                    var div = Fraction.division(this.freeKoefs[numberOfRow].fractionalPart(), sub);
                    var sub = Fraction.subtraction(new Fraction(0), this.koefs[numberOfRow][j]);
                    var multi = Fraction.multiplication(div, sub);
                    this.koefs[this.m][j] = Fraction.subtraction(new Fraction(0), multi);
                }
            }
            //this._j
            if (Fraction.less(this.koefs[this.m][j], new Fraction(0))) {
                var tmp = Expression.division(this.grades[j], this.koefs[this.m][j]);
                if (Expression.less(tmp, min)) {
                    min = tmp;
                    this._j = j;
                }
            }
        }
        this.koefs[this.m][this.n] = new Fraction(1);
        this.freeKoefs[this.m] = Fraction.subtraction(new Fraction(), this.freeKoefs[numberOfRow].fractionalPart());
        this.basic[this.m] = this.n;
        this.grades[this.n] = new Expression(0);
        this.x[this.n] = "S" + (1 + this.m - this.isInteger.length);
        this._i = this.m;
        this.n++;
        this.m++;
    };

    calcCut() {
        var tmpF;
        var tmpE = new Expression();
        console.log("lell");
        this.basic[this._i] = this._j;
        if (Fraction.isNotEqual((tmpF = this.koefs[this._i][this._j]), 1)) {
            for (var j = 0; j < this.n; j++)
                this.koefs[this._i][j] = Fraction.division(this.koefs[this._i][j], tmpF);
            this.freeKoefs[this._i] = Fraction.division(this.freeKoefs[this._i], tmpF);
        }

        for (var i = 0; i < this.m; i++) {
            if (i == this._i) tmpE = Expression.subtraction(new Expression(), this.grades[this._j]);
            else              tmpF = Fraction.subtraction(new Fraction(), this.koefs[i][this._j]);

            for (j = 0; j < this.n; j++)
                if (i == this._i)
                    this.grades[j] = Expression.addition(this.grades[j], Expression.multiplication(tmpE, this.koefs[this._i][j]));
                else
                    this.koefs[i][j] = Fraction.addition(this.koefs[i][j], Fraction.multiplication(tmpF, this.koefs[this._i][j]));

            if (i == this._i)
                this.fx = Expression.addition(this.fx, Expression.multiplication(tmpE, this.freeKoefs[this._i]));
            else
                this.freeKoefs[i] = Fraction.addition(this.freeKoefs[i], Fraction.multiplication(tmpF, this.freeKoefs[this._i]));
        }
    };

    isEnd2ST() {
        var minF = new Fraction(0);
        for (var i = 0; i < this.m; i++)
            if (Fraction.less(this.freeKoefs[i], minF)) {
                minF = this.freeKoefs[i];
                this._i = i;
            }
        var check = new Fraction(0);
        if (Fraction.isEqual(minF, check))
            return this.isAllInt();//2or4

        var min = new Expression(10000000, 1);
        var tmp1;
        for (var j = 0; j < this.n; j++) {
            if (Fraction.more(this.koefs[this._i][j], 0) || Fraction.isEqual(this.koefs[this._i][j], 0)) {
                continue;
            }
            tmp1 = Expression.division(this.grades[j], this.koefs[this._i][j]);
            if (Expression.isEqual(tmp1, min))
                continue;
            if (Expression.less(tmp1, min)) {

                min = tmp1;
                //console.log(min);
                this._j = j;
            }
        }
        var check1 = new Expression(10000000, 1);
        if (Expression.isEqual(min, check1)) {
            return -1;
        }
        return 3;//this.isAllInt();
    };

    isAllInt() {
        var flag = true;
        for (var i = 0; i < this.m; i++) {
            if (this.isInteger[this.basic[i]] == true) {
                console.log(this.freeKoefs[i].fractionalPart());
                if (Fraction.isEqual(this.freeKoefs[i].fractionalPart(), new Fraction()))
                    continue;
                else return 2;
            }
        }
        this.isend = true;
        return 4;
    };

    isEnd() {
        if(this.hop < 2) return this.isEndST();
        else return this.isEnd2ST();
    };

    isEndST() {
        var max = new Expression();
        for (var j = 0; j < this.n; j++)
            if (Expression.more(this.grades[j], max)) {
                max = this.grades[j];
                this._j = j;
            }
        var check = new Expression();
        if (Expression.isEqual(max, check)) { // all grades <= 0
            return this.isAllInt();
        }

        for (j = 0; j < this.n; j++) {
            if (Expression.more(this.grades[j], new Expression())) {
                var min = new Fraction(10000000, 1);
                for (var i = 0; i < this.m; i++) {

                    if (Fraction.less(this.koefs[i][j], 0) || Fraction.isEqual(this.koefs[i][j], 0)) {
                        continue;
                    }
                    var tmp1 = Fraction.division(this.freeKoefs[i], this.koefs[i][j]);
                    if (Fraction.less(tmp1, 0))
                        continue;
                    if (Fraction.less(tmp1, min)) {
                        min = tmp1;
                        if (j == this._j)
                            this._i = i;
                    }
                }

                var check1 = new Fraction(10000000, 1);
                if (Fraction.isEqual(min, check1))
                    return -1;  // hasnt elemnts > 0 over positive grade
            }
        }
        return 1; // optimization isnt end
    };

    xChange() {
        var counter = 0;
        if(this.mm == -1) {
            for (var i = 0; i < this.n; i++)
                this.fxKoefs[i] = Expression.multiplication(this.fxKoefs[i], new Fraction(-1));
        }
        console.log("lell");
        for(var i = 0; i < this.m; i++) {
            if (Fraction.less(this.freeKoefs[i], 0)) {
                for (var j = 0; j < this.n; j++) {
                    this.koefs[i][j] = Fraction.multiplication(this.koefs[i][j], new Fraction(-1));
                }
                this.freeKoefs[i] = Fraction.multiplication(this.freeKoefs[i], new Fraction(-1));
                this.signs[i] *= -1;
            }
            for (var k = 0; k < this.m; k++) {
                this.koefs[k][this.n] = new Fraction(0);
                this.x[this.n] = "x" + (this.n + 1);
            }
            this.koefs[i][this.n] = new Fraction(this.signs[i]);
            this.fxKoefs[this.n] = new Expression(0);
            this.n++;
            if(this.signs[i] < 0) counter++;
        }

        if(!this.getBasic()) {
            if(counter == 1){
                for (var i = 0; i < this.m; i++) {
                    if (this.signs[i] < 0) {
                        for (var k = 0; k < this.m; k++) {
                            this.koefs[k][this.n] = new Fraction(0);
                            this.x[this.n] = "x" + (this.n + 1);
                        }
                        this.koefs[i][this.n] = new Fraction(1);
                        this.fxKoefs[this.n] = new Expression(0, 1);
                        this.n++;
                    }
                }
            }
            else {
                var max = new Fraction(0);
                var numberOfRow;
                for (var i = 0; i < this.m; i++)
                    if (Fraction.more(this.freeKoefs[i], max)) {
                        max = this.freeKoefs[i];
                        numberOfRow = i;
                    }
                for (var i = 0; i < this.m; i++) {
                    if (i == numberOfRow) continue;
                    if (this.signs[i] < 0) {
                        for (var j = 0; j < this.n; j++) {
                            this.koefs[i][j] = Fraction.subtraction(this.koefs[numberOfRow][j], this.koefs[i][j]);
                        }
                        this.freeKoefs[i] = Fraction.subtraction(this.freeKoefs[numberOfRow], this.freeKoefs[i]);
                    }
                }

                for (var k = 0; k < this.m; k++) {
                    this.koefs[k][this.n] = new Fraction(0);
                    this.x[this.n] = "x" + (this.n + 1);
                }
                this.koefs[numberOfRow][this.n] = new Fraction(1);
                this.fxKoefs[this.n] = new Expression(0, 1);
                this.n++;
            }
            this.getBasic();
        }
    };

    getBasic() {
        var t;
        var count = 0;
        for (var j = 0; j < this.n; j++)
        {
            var counter = 0;
            for (var i = 0; i < this.m; i++) {
                if (counter == 0 && Fraction.isEqual(this.koefs[i][j], 1)){
                    counter++;
                    t = i;
                }
                else if (Fraction.isEqual(this.koefs[i][j], 0)) continue;
                else {
                    counter = 2;
                    break;
                }
            }
            if (counter == 1) {
                this.basic[t] = j;
                count++;
            }
        }
        if (count == this.m) return true;
        return false;
    };

    doneMessage() {
        var str = "";
        switch (this.hop) {
            case 3:
                str += "<p>Розв'язуємо ЗЛП двоїстим с-м</p>";
                break;
            case 2:
                str += "<p>Будуємо відсічення</p>";
                break;
            case -1:
                str += "<p>Хоча б над однією додатньою оцінкою немає додатніх елементів</p>";
                break;
            //case 1:  str += "Немає додатніх оцінок"; break;
            case 4:
                str += "<p>Задача вирiшена</p>";
                break;
            default:
                str += "<p>Задача потребує подальшої оптимізації</p>";
                break;
        }
        str += "<p>x(" + this.getX() + ")</p>";
        if (this.hop == 4)
            str += "<p>" + this.getResult() + "</p>";
        console.log(str);
        return str;
    };
    getX() {
        var tmp = new Array();
        for(var j = 0; j< this.n;j++)
            tmp[j] = new Fraction();
        for(var i =0;i<this.m;i++)
            tmp[this.basic[i]] = this.freeKoefs[i];
        var str = tmp.join(', ');
        return str;
    };
    getResult() {
        var tmp = new Array();
        for (var j = 0; j < this.n; j++)
            tmp[j] = new Fraction();
        for (var i = 0; i < this.m; i++)
            tmp[this.basic[i]] = this.freeKoefs[i];
        var str = tmp.slice(0, this.xcount).join(', ');
        str = "x*(" + str + ") f(x)=" + Expression.multiplication(this.fx, new Fraction(this.mm));
        return str;
    };
}







class Rational {
    private numerator: number;
    private denominator: number;

    /**
     * Constructor: Sets up the rational number by ensuring a nonzero
     * denominator and making only the numerator signed.
     * @param numerator numerator for new Rational number
     * @param denominator denominator for new Rational number
     */
    constructor(numerator: number, denominator?: number)
    {
        if(denominator) {
            if (denominator === 0)
                denominator = 1;
            this.denominator = denominator;
        }
        else {
            this.denominator = 1;
        }

        this.numerator = numerator;

        this.normalize();
    }

    /**
     * Returns the numerator of this rational number
     * @return number numerator
     */
    getNumerator(): number { return this.numerator; }

    /**
     * Returns the denominator of this rational number
     * @return number denominator
     */
    getDenominator(): number { return this.denominator; }


    /**
     * Set the numerator of this rational number
     * @param numerator number new value of the numerator
     */
    setNumerator(numerator: number) { this.numerator = numerator; }

    /**
     * Set the denominator of this rational number
     * @param denominator number new value of the denominator
     */
    setDenominator(denominator: number) { this.denominator = denominator; }

    /**
     * Clone rational number
     * @method dup
     * @returns {Rational}
     */
    dup() : Rational
    {
        return new Rational(this.numerator, this.denominator);
    }

    /**
     * Convert current rational number to string value
     * @method toString
     * @returns {string}
     */
    toString() : string {
        if (this.denominator == 1) {
            return this.numerator.toString();
        } else {
            // implicit conversion of numbers to strings
            return this.numerator + '/' + this.denominator;
        }
    }

    /**
     * Convert current rational number to float value
     * @returns {float}
     */
    toFloat(): number { return eval(this.toString()) }
    /**
     * Convert current rational number to integer value
     * @returns {int}
     */
    toInt() : number {return Math.floor(this.toFloat())}

    /**
     * Reduce ration number (find greatest common divisor and divide numerator and denominator)
     * @returns {Rational}
     */
    normalize() {
        // Find greatest common divisor (GCD)
        var gsd = Math.abs(this.numerator), b=Math.abs(this.denominator);
        while (b != 0) {
            var tmp = gsd;
            gsd = b;
            b = tmp % b;
        }
        // Divide numerator by GCD
        this.numerator /= gsd;
        // Divide denominator by GCD
        this.denominator /= gsd;

        // Denominator must be positive
        if (this.denominator < 0) { // If denominator has negative value
            // Multiply numerator and denominator by -1
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    }
    /**
     * Create and get new Rational object from current object with absolute values
     * @returns {Rational}
     */
    abs() {
        return new Rational(Math.abs(this.numerator), this.denominator);
    }
    /**
     * Create and get new Rational object from current object with inverse values
     * @returns {Rational}
     */
    inv() {
        return new Rational(this.denominator, this.numerator);
    }
    // =================================== Arithmetic methods ===================================
    /**
     * Arithmetic: add the current Rational object with all Rational objects in the argument list
     * Function modify receiver
     * @returns {Rational}
     */
    add() {
        for (var i = 0; i < arguments.length; i++) {
            this.numerator = this.numerator * arguments[i].denominator + this.denominator * arguments[i].numerator;
            this.denominator = this.denominator * arguments[i].denominator;
        }
        return this.normalize();
    }
    /**
     * Arithmetic: subtract the current Rational object with all Rational objects in the argument list
     * Function modify receiver
     * @returns {Rational}
     */
    subtract(obj: Rational) {
        this.numerator = this.numerator * obj.denominator - this.denominator * obj.numerator;
        this.denominator = this.denominator * obj.denominator;
        return this.normalize();
    }
    /**
     * Arithmetic: apply unary "-" operator to receiver
     * @returns {Rational}
     */
    neg() {
        var number = new Rational(0);
        return number.subtract(this);
    }
    /**
     * Arithmetic: multiply the current Rational object with all Rational objects in the argument list
     * Function modify receiver
     * @returns {Rational}
     */
    multiply(obj: Rational) {
        this.numerator *= obj.numerator;
        this.denominator *= obj.denominator;
        return this.normalize();
    }
    /**
     * Divide current object for other Rational object
     * @param rat Rational object
     * @returns {Rational}
     */
    divide(rat) {
        return this.multiply(rat.inv());
    }
    /**
     * Increment current object
     * @returns {Rational}
     */
    inc() {
        this.numerator += this.denominator;
        return this.normalize();
    }
    /**
     * Decrement current object
     * @returns {Rational}
     */
    dec() {
        this.numerator -= this.denominator;
        return this.normalize();
    }
    // =================================== Comparison methods ===================================
    /**
     * Compare the current object with zero
     * @returns {boolean}
     */
    isZero() {
        return (this.numerator == 0);
    }
    /**
     * Check if the current object is positive
     * @returns {boolean}
     */
    isPositive() {
        return (this.numerator > 0);
    }
    /**
     * Check if the current object is negative
     * @returns {boolean}
     */
    isNegative() {
        return (this.numerator < 0);
    }

    /**
     * Check if the current object is equal to other Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    eq(rat) {
        return this.dup().subtract(rat).isZero();
    }
    /**
     * Check if the current object is not equal to other Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    ne(rat) {
        return !(this.eq(rat));
    }
    /**
     * Check if the current object is less than Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    lt(rat) {
        return this.dup().subtract(rat).isNegative();
    }
    /**
     * Check if the current object is greater than Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    gt(rat) {
        return this.dup().subtract(rat).isPositive();
    }
    /**
     * Check if the current object is less than Rational object or equal them
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    le(rat) {
        return !(this.gt(rat));
    }
    /**
     * Check if the current object is greater than Rational object or equal them
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    ge(rat) {
        return !(this.lt(rat));
    }

}
class SimplexView {


    constructor()
    {

    }


}

//interface ISimplex {
//    run(): boolean;
//    complete(): any;
//
//    nextStep(): boolean;
//    isCompleted(): boolean;
//    isError(): boolean;
//    isEnd(): boolean;
//    parseData(data: any): boolean;
//}

class Simplex {

    constructor(data: any)
    {

    }

    /**
     * Build current simplex function
     * @returns {boolean}
     */
    build(): boolean
    {
        return true;
    }

    /**
     * Validate current simplex data
     * @returns {boolean}Header/Footer/Left Menu from iwdagency.com
     */
    validate(): boolean
    {
        return false;
    }

    /**
     *
     */
    run(): boolean
    {
        return false;
    }

    /**
     * Completely
     */
    complete(): boolean
    {
        return false;
    }

    /**
     * Start next simplex step
     * @returns {boolean} true if it hasn't next step, else false
     */
    nextStep(): boolean
    {

        return this.isEnd();
    }

    /**
     * Check if simplex is completed
     * @returns {boolean}
     */
    isCompleted(): boolean
    {
        return true;
    }

    /**
     * Check if simplex has some errors
     * @returns {boolean}
     */
    isError(): boolean
    {
        return true;
    }

    /**
     * Check, if simplex is in the final state
     * (is completed, or has some errors)
     * @returns {boolean}
     */
    isEnd(): boolean
    {
        return this.isCompleted() || this.isError();
    }
}

class DSimplex extends Simplex {

    constructor(data)
    {
        super(data);
    }

}

class Template {
    public name: string;
    public html: string;

    constructor(name: string, html: string)
    {
        this.setName(name);
        this.setHtml(html);
    }

    getName() : string { return this.name }
    setName(value: string) : void { this.name = value }

    getHtml() : string { return this.html }
    setHtml(value: string) : void { this.html = value }

    render(params: any): any
    {
        return _.template(this.html, params);
    }

    isNameEquals(name: string) : boolean
    {
        return this.getName() === name;
    }
}

class TemplateManager {
    private templates: Array<Template>;

    constructor()
    {
        this.templates = new Array<Template>();
    }

    addTemplate(name: string, html: string)
    {
        var item = new Template(name, html);
        this.templates.push(item);
    }

    /**
     * Check if template is exists
     * @param {string} name of template
     * @returns {boolean}
     */
    isExistsTemplate(name: string) : boolean
    {
        return this.findTemplate(name) !== null;

    }

    /**
     * Find template by name
     * @param {string} name
     * @returns {Template|null}
     */
    findTemplate(name: string) : Template
    {
        for(var tmpIndex = 0; tmpIndex < this.templates.length; tmpIndex++)
        {
            var item = this.templates[tmpIndex];
            if(item.isNameEquals(name))
                return item;
        }
        return null;
    }
}


class DSimplexView extends SimplexView {
    public simplexTable: DSimplexTable;
    public countVar: number;
    public countLim: number;

    public simplexData;

    public templateManager: TemplateManager;

    constructor(countVar, countLim)
    {
        super();
        this.countVar = countVar;
        this.countLim = countLim;

        // init all templates
        this.fillTemplates();

        this.buildTemplates();
    }

    fillTemplates()
    {
        this.templateManager = new TemplateManager();

        this.templateManager.addTemplate('simplex-field', $('#tpl-simplex-field').html());
        //this.templateManager.addTemplate('simplex-field', $('#tpl-simplex-field').html());
    }

    buildTemplates()
    {
        var template_html = $('#tpl-simplex-field').html();
        // var tpl = _.template(template_html);
        var container = $('#d-simplex-container');

        var labelText;

        var textNode, lim, varIndex;

        // build function of goal

        textNode = document.createElement("div");  // Create with DOM
        textNode.className = "limit-label";
        textNode.innerHTML = "Function of goal";


        container.append(textNode);

        var items = [];
        for(varIndex = 0; varIndex < this.countVar; varIndex++)
        {
            items.push({
                'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                'lim_id': 'func',
                'var_id': varIndex
            });
        }

        var select;

        //select = this.createSelect('d-func-select');

        container.append(_.template(template_html,{items:items}));

        //container.append(select);


        textNode = document.createElement("div");  // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "->";
        container.append(textNode);

        textNode = document.createElement("div");  // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "min";
        container.append(textNode);

        for(lim = 0; lim < this.countLim; lim++)
        {
            items = [];

            textNode = document.createElement("div");  // Create with DOM
            textNode.className = "limit-label";
            textNode.innerHTML = "Limit №" + (lim + 1);
            container.append(textNode);

            for(varIndex = 0; varIndex < this.countVar; varIndex++)
            {
                items.push({
                    'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                    'lim_id': lim,
                    'var_id': varIndex
                });
            }

            container.append(_.template(template_html,{items:items}));



            //select = this.createSelect('d-lim-select-' + lim);
            //container.append(select);

            //textNode = document.createElement("div");  // Create with DOM
            //textNode.className = "limit-result";
            //textNode.innerHTML = "=";
            //container.append(textNode);

            items = [
                {
                    'title': '=',
                    'lim_id': lim,
                    'var_id': 'b'
                }
            ];

            container.append(_.template(template_html,{items:items}));

        }

        var resultButton = document.createElement("button");
        resultButton.type = "button";
        resultButton.id = 'btnRunDSimplex';
        resultButton.className = "btn btn-warning";
        resultButton.innerHTML = "Start";
        container.append(resultButton);

        var resultContainer = document.createElement("div");
        resultContainer.id = "dSimplexResult";
        resultContainer.className = "d-simplex-result";
        container.append(resultContainer);
    }

    tryParseTemplates(): boolean
    {
        var valid = true;

        var data = {
            n: parseInt(this.countVar.toString()),
            m: parseInt(this.countLim.toString()),
        };
        //data.n = this.countVar;
        //data.m = this.countLim;

        data[data.m] = new Array();

        for (var i = 0; i < this.countLim; i++) {
            data[i] = new Array();
            data[i][data.n] = Fraction.parse($('#dsimplex-lim-' + i +'-var-b').val());

            for (var j = 0; j < this.countVar; j++)
                data[i][j] = Fraction.parse($('#dsimplex-lim-' + i +'-var-' + j).val());


        }

        for (var j = 0; j < this.countVar; j++)
            data[data.m][j] = Expression.parse($('#dsimplex-lim-func-var-' + j).val());




        // function of goal
        for(varIndex = 0; varIndex < this.countVar; varIndex++)
        {
            var field = $('#dsimplex-lim-func-var-' + varIndex);

            var validField = this.tryValidField(field);

            if(!validField)
                valid = false;
        }


        for(var lim = 0; lim < this.countLim; lim++)
        {
            for(var varIndex = 0; varIndex < this.countVar; varIndex++)
            {
                var field = $('#dsimplex-lim-' + lim + '-var-' + varIndex);

                var validField = this.tryValidField(field);

                if(!validField)
                    valid = false;
            }
        }

        if(valid) {
            try {
                this.simplexTable.setData(data);
            }
            catch (e)
            {
                alert(e.message);
            }
        }

        return valid;
    }

    tryValidField(field)
    {
        var valid = true;
        var value = field.val();

        //set field valid state
        field.removeClass('error-field');

        if(Validator.isInteger(value))
        {
            // integer number

        }
        else if(Validator.isRational(value))
        {
            // rational number

        }
        else if(Validator.isSynthetic(value))
        {
            // synthetic number

        }
        else {
            // invalid value
            field.addClass('error-field');
            valid = false;
        }
        return valid;
    }

    createSelect(id: string)
    {
        var select = document.createElement( 'select' );
        select.id = id;
        var option;

        option = document.createElement( 'option' );
        option.value = '1';
        option.textContent = '>=';
        select.appendChild( option );

        option = document.createElement( 'option' );
        option.value = '2';
        option.textContent = '=';
        select.appendChild( option );

        option = document.createElement( 'option' );
        option.value = '3';
        option.textContent = '<=';
        select.appendChild( option );

        return select;
    }

    run() {
        $('#d-simplex-result').text('');

        this.simplexTable = new DSimplexTable();

        if(!this.tryParseTemplates())
        {
            // error
            alert('You have some errors in required fields');
        }
        else {
            // run simplex method

            try {
                this.simplexTable.btnClick();

                while(this.simplexTable.hop !== -1)
                {
                    this.getData();
                    this.simplexTable.btnClick();
                }

                alert('This task was completed');
                this.getData();
                console.log('completed');
            }
            catch (e) {
                console.log(e);
                alert(e.message);
            }
        }
    }

    getData() {

        var n = parseInt(this.countVar.toString());
        var m = parseInt(this.countLim.toString());

        var mainDiv = $('#dSimplexResult');
        var tableDiv = $('<table class="table" style="width: 100%;">');
        var tableRowDiv;
        var tableCellDiv;

        tableRowDiv = $('<tr class="table-row">');
        tableCellDiv = $('<th class="table-cell">');
        //tableCellDiv.append('/');
        tableRowDiv.append(tableCellDiv);
        for (var j = 0; j < n; j++) {
            tableCellDiv = $('<th class="table-cell">');
            tableCellDiv.append('X' + (j + 1));
            tableRowDiv.append(tableCellDiv);
        }
        /*tableCellDiv=$('<div class="table-cell">');
         //tableCellDiv.append();
         tableRowDiv.append(tableCellDiv);*/
        tableCellDiv = $('<th class="table-cell">');
        tableCellDiv.append('free.m.');
        tableRowDiv.append(tableCellDiv);
        tableDiv.append(tableRowDiv);

        for (var i = 0; i < m; i++) {
            tableRowDiv = $('<tr class="table-row">');
            tableCellDiv = $('<td class="table-cell">');
            tableCellDiv.append('X' + (this.simplexTable.basic[i] + 1));
            tableRowDiv.append(tableCellDiv);
            for (j = 0; j < n; j++) {
                tableCellDiv = $('<td class="table-cell">');
                tableCellDiv.append(this.simplexTable.koefs[i][j].toString());
                tableRowDiv.append(tableCellDiv);
            }
            /*tableCellDiv=$('<div class="table-cell">');
             tableCellDiv.append('=');
             tableRowDiv.append(tableCellDiv);*/
            tableCellDiv = $('<td class="table-cell">');
            tableCellDiv.append(this.simplexTable.freeKoefs[i].toString());
            tableRowDiv.append(tableCellDiv);
            tableDiv.append(tableRowDiv);
        }

        tableRowDiv = $('<tr class="table-row">');
        tableCellDiv = $('<td class="table-cell">');
        tableCellDiv.append('func');
        tableRowDiv.append(tableCellDiv);
        for (j = 0; j < n; j++) {
            tableCellDiv = $('<td class="table-cell">');
            tableCellDiv.append(this.simplexTable.grades[j].toString());
            tableRowDiv.append(tableCellDiv);
        }
        /*tableCellDiv=$('<div class="table-cell">');
         tableCellDiv.append('->');
         tableRowDiv.append(tableCellDiv);*/
        tableCellDiv = $('<td class="table-cell">');
        tableCellDiv.append(this.simplexTable.fx.toString());
        tableRowDiv.append(tableCellDiv);
        tableDiv.append(tableRowDiv);

        mainDiv.append(tableDiv);
        this.description();
    };
    description() {
        var div = $('#dSimplexResult');
        var tab = this.simplexTable;

        if (tab.hop != -1) {
            div.append('<p>x' + tab.hop + '(' + this.getX() + ')</p>');
            div.append('<p>X' + (tab._j + 1) + ' вводиться в базис</p>');
            div.append('<p>X' + (tab.basic[tab._i] + 1) + ' виводиться з базису</p>');
        }
        div.append('<p>' + tab.str + '</p>');
        if (tab.hop == -1) {
            if(tab.result == 1) {
                div.append('<p>x*(' + this.getX() + ')</p>');
                div.append('<p>F(x*) = ' + tab.fx.toString() + '</p>');
            }
        }
    };
    getX() {
        var tab = this.simplexTable;

        var tmp = new Array();
        for(var j = 0; j< tab.n;j++)
            tmp[j] = new Fraction();
        for(var i =0;i<tab.m;i++)
            tmp[tab.basic[i]] = tab.freeKoefs[i];
        var str = tmp.join(', ');
        return str;
    }
}

class GomoriView {
    public simplexTable: GomoriSimplexTable;
    public countVar: number;
    public countLim: number;

    public simplexData;

    public templateManager:TemplateManager;

    constructor(countVar, countLim) {

        this.countVar = countVar;
        this.countLim = countLim;

        this.buildTemplates();
    }

    buildTemplates()
    {
        var template_html = $('#tpl-gomori-field').html();
        var template_checkbox = $('#tpl-gomori-checkbox').html();
        // var tpl = _.template(template_html);
        var container = $('#gomori-container');

        var labelText;

        var textNode, lim, varIndex;

        // build function of goal

        textNode = document.createElement("div");  // Create with DOM
        textNode.className = "limit-label";
        textNode.innerHTML = "Function of goal";

        container.append(textNode);

        var items = [];
        for(varIndex = 0; varIndex < this.countVar; varIndex++)
        {
            items.push({
                'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                'lim_id': 'func',
                'var_id': varIndex
            });
        }

        var select;

        select = this.createSelectExstr('gomori-func-select');

        container.append(_.template(template_html,{items:items}));

        textNode = document.createElement("div");  // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "->";
        container.append(textNode);

        container.append(select);


        //textNode = document.createElement("div");  // Create with DOM
        //textNode.className = "limit-result";
        //textNode.innerHTML = "->";
        //container.append(textNode);

        textNode = document.createElement("div");  // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "min";
        container.append(textNode);

        for(lim = 0; lim < this.countLim; lim++)
        {
            items = [];

            textNode = document.createElement("div");  // Create with DOM
            textNode.className = "limit-label";
            textNode.innerHTML = "Limit №" + (lim + 1);
            container.append(textNode);

            for(varIndex = 0; varIndex < this.countVar; varIndex++)
            {
                items.push({
                    'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                    'lim_id': lim,
                    'var_id': varIndex
                });
            }

            container.append(_.template(template_html,{items:items}));



            //select = this.createSelect('d-lim-select-' + lim);
            //container.append(select);

            //textNode = document.createElement("div");  // Create with DOM
            //textNode.className = "limit-result";
            //textNode.innerHTML = "=";
            //container.append(textNode);

            select = this.createSelect('gomori-lim-' + lim + '-sign');

            container.append(select);

            items = [
                {
                    'title': '',
                    'lim_id': lim,
                    'var_id': 'b'
                }
            ];

            container.append(_.template(template_html,{items:items}));

        }

        //'#gomori-var-int-' + j
        textNode = document.createElement("div");  // Create with DOM
        textNode.className = "limit-label";
        textNode.innerHTML = "Integer limitations";
        container.append(textNode);


        var items = [];
        for(varIndex = 0; varIndex < this.countVar; varIndex++)
        {
            items.push({
                'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                'var_id': varIndex
            });
        }

        container.append(_.template(template_checkbox,{items:items}));


        var resultButton = document.createElement("button");
        resultButton.type = "button";
        resultButton.id = 'btnRunGomori';
        resultButton.className = "btn btn-warning";
        resultButton.innerHTML = "Start";
        container.append(resultButton);

        var resultContainer = document.createElement("div");
        resultContainer.id = "gomori-result";
        resultContainer.className = "gomori-result";
        container.append(resultContainer);
    }

    createSelect(id: string)
    {
        var select = document.createElement( 'select' );
        select.id = id;
        var option;

        option = document.createElement( 'option' );
        option.value = '1';
        option.textContent = '<=';
        select.appendChild( option );


        option = document.createElement( 'option' );
        option.value = '-1';
        option.textContent = '>=';
        select.appendChild( option );

        return select;
    }

    createSelectExstr(id: string)
    {
        var select = document.createElement( 'select' );
        select.id = id;
        var option;

        option = document.createElement( 'option' );
        option.value = '1';
        option.textContent = 'min';
        select.appendChild( option );


        option = document.createElement( 'option' );
        option.value = '-1';
        option.textContent = 'max';
        select.appendChild( option );

        return select;
    }

    run() {
        $('#gomori-result').text('');

        this.simplexTable = new GomoriSimplexTable();

        if(!this.tryParseTemplates())
        {
            // error
            alert('You have some errors in required fields');
        }
        else {
            // run simplex method

            try {
                this.simplexTable.btnClick();

                //while(this.simplexTable.isend != true || this.simplexTable.hop != -1)
                //{
                //    this.getData();
                //    this.simplexTable.btnClick();
                //}

                //alert('This task was completed');
                this.getData();
                //console.log('completed');



                if (this.simplexTable.isend == true) {
                    alert('Задача вирішена');
                    console.log('ended');
                    $('#btnGomoriStep').hide();
                }
                else if(this.simplexTable.hop == -1) {
                    alert('Задача не вирішена');
                    console.log('ended');
                    $('#btnGomoriStep').hide();
                }
                else {
                    $('#btnGomoriStep').show();
                }
            }
            catch (e) {
                console.log(e);
                alert(e.message);
            }
        }
    }

    next()
    {
        this.simplexTable.btnClick();
        this.getData();

        if (this.simplexTable.isend == true) {
            alert('Task is completed');
            console.log('ended');
            $('#btnGomoriStep').hide();
        }
        if(this.simplexTable.hop == -1) {
            alert('Task is not completed');
            console.log('ended');
            $('#btnGomoriStep').hide();
        }

    }

    tryParseTemplates(): boolean
    {
        var valid = true;

        var data = {
            n: parseInt(this.countVar.toString()),
            m: parseInt(this.countLim.toString()),
            mm: parseInt($('#gomori-func-select').val())
        };
        //data.n = this.countVar;
        //data.m = this.countLim;

        console.log(data.mm);
        data[data.m] = new Array();
        data[data.m + 1] = new Array();
        //data[data.m + 2] = new Array();
        data[data.m + 3] = new Array();

        console.log(data);

        try {
            for (var i = 0; i < data.m; i++) {
                data[i] = new Array();
                data[data.m + 1][i] = parseInt($('#gomori-lim-' + i + '-sign').val());
                data[i][data.n] = Fraction.parse($('#gomori-lim-' + i + '-var-b').val());
                for (j = 0; j < data.n; j++)
                    data[i][j] = Fraction.parse($('#gomori-lim-' + i + '-var-' + j).val());
            }
            for (var j = 0; j < data.n; j++) {
                data[data.m][j] = Expression.parse($('#gomori-lim-func-var-' + j).val());
                //data[data.m + 2][j] = $('input.posit' + j).prop("checked");
                data[data.m + 3][j] = $('#gomori-var-int-' + j).prop("checked");
            }

            //console.log("lell");
            this.simplexTable.setData(data);
        }
        catch (err) {
            console.log(err.message);
            alert('Input error: ' + err.message);
            valid = false;
        }



        //for (var i = 0; i < this.countLim; i++) {
        //    data[i] = new Array();
        //    data[i][data.n] = Fraction.parse($('#dsimplex-lim-' + i +'-var-b').val());
        //
        //    for (var j = 0; j < this.countVar; j++)
        //        data[i][j] = Fraction.parse($('#dsimplex-lim-' + i +'-var-' + j).val());
        //
        //
        //}
        //
        //for (var j = 0; j < this.countVar; j++)
        //    data[data.m][j] = Expression.parse($('#dsimplex-lim-func-var-' + j).val());
        //
        //
        //
        //
        //// function of goal
        //for(varIndex = 0; varIndex < this.countVar; varIndex++)
        //{
        //    var field = $('#dsimplex-lim-func-var-' + varIndex);
        //
        //    var validField = this.tryValidField(field);
        //
        //    if(!validField)
        //        valid = false;
        //}
        //
        //
        //for(var lim = 0; lim < this.countLim; lim++)
        //{
        //    for(var varIndex = 0; varIndex < this.countVar; varIndex++)
        //    {
        //        var field = $('#dsimplex-lim-' + lim + '-var-' + varIndex);
        //
        //        var validField = this.tryValidField(field);
        //
        //        if(!validField)
        //            valid = false;
        //    }
        //}
        //
        //if(valid) {
        //    try {
        //        this.simplexTable.setData(data);
        //    }
        //    catch (e)
        //    {
        //        alert(e.message);
        //    }
        //}

        //if(valid)
        //{
        //    try {
        //        this.simplexTable.setData(data);
        //    }
        //    catch (e)
        //    {
        //        alert(e.message);
        //    }
        //}

        return valid;
    }

    tryValidField(field)
    {
        var valid = true;
        var value = field.val();

        //set field valid state
        field.removeClass('error-field');

        if(Validator.isInteger(value))
        {
            // integer number

        }
        else if(Validator.isRational(value))
        {
            // rational number

        }
        else if(Validator.isSynthetic(value))
        {
            // synthetic number

        }
        else {
            // invalid value
            field.addClass('error-field');
            valid = false;
        }
        return valid;
    }

    getData() {
        var tab = this.simplexTable;
        var mainDiv = $('#gomori-result');
        var tableDiv = $('<table class="table">');
        var tableRowDiv;
        var tableCellDiv;

        tableRowDiv = $('<tr class="table-row">');
        tableCellDiv = $('<th class="table-cell">');
        tableRowDiv.append(tableCellDiv);
        for (var j = 0; j < tab.n; j++) {
            tableCellDiv = $('<th class="table-cell">');
            tableCellDiv.append(tab.x[j]/*'X' + (j + 1)*/);
            tableRowDiv.append(tableCellDiv);
        }
        tableCellDiv = $('<th class="table-cell">');
        tableCellDiv.append('free m.');
        tableRowDiv.append(tableCellDiv);
        tableDiv.append(tableRowDiv);

        for (var i = 0; i < tab.m; i++) {
            tableRowDiv = $('<tr class="table-row">');
            tableCellDiv = $('<td class="table-cell">');
            tableCellDiv.append(tab.x[tab.basic[i]]/*'X' + (tab.basic[i] + 1)*/);
            tableRowDiv.append(tableCellDiv);
            for (j = 0; j < tab.n; j++) {
                tableCellDiv = $('<td class="table-cell">');
                tableCellDiv.append(tab.koefs[i][j].toString());
                tableRowDiv.append(tableCellDiv);
            }
            tableCellDiv = $('<td class="table-cell">');
            tableCellDiv.append(tab.freeKoefs[i].toString());
            tableRowDiv.append(tableCellDiv);
            tableDiv.append(tableRowDiv);
        }

        tableRowDiv = $('<tr class="table-row">');
        tableCellDiv = $('<td class="table-cell">');
        tableCellDiv.append('f');
        tableRowDiv.append(tableCellDiv);
        for (j = 0; j < tab.n; j++) {
            tableCellDiv = $('<td class="table-cell">');
            tableCellDiv.append(tab.grades[j].toString());
            tableRowDiv.append(tableCellDiv);
        }
        tableCellDiv = $('<td class="table-cell">');
        tableCellDiv.append(tab.fx.toString());
        tableRowDiv.append(tableCellDiv);
        tableDiv.append(tableRowDiv);

        mainDiv.append(tableDiv);
        this.description();
    }
    description() {
        var tab = this.simplexTable;
        var div = $('#gomori-result');
        /*if (tab.hop > 0) {
         div.append('<p>x' + tab.hop + '(' + getX() + ')</p>');
         div.append('<p>X' + (tab._j + 1) + ' вводиться в базис</p>');
         div.append('<p>X' + (tab._i + 1) + ' виводиться з базису</p>');
         }*/
        div.append(tab.doneMessage());
        /*if (tab.hop == -1) {
         if (tab.result == 1) {
         div.append('<p>x*(' + getX() + ')</p>');
         div.append('<p>F(x*) = ' + tab.fx.toString() + '</p>');
         }
         }*/
        console.log("hop " + tab.hop);
    }

}
class Validator {

    constructor()
    {

    }

    static isInteger(str: string) : boolean
    {
        return Validator.testPattern(/^(-)?(\d+)$/, str);
    }

    static isRational(str: string) : boolean
    {
        return Validator.testPattern(/^(-)?(\d+)\/(\d+)$/, str);
    }

    static isOnlyLetters(str: string) : boolean
    {
        return Validator.testPattern(/^\w+$/, str);
    }

    static isSynthetic(str: string) : boolean
    {
        return Validator.testPattern(/^(m|M)$/, str);
    }

    static testPattern(pattern, str) : boolean
    {
        return pattern.test(str);
    }
}

$(function() {
    // ========================== gomori ==========================
    // create new instances
    var gomori;
    $('#btnGomoriStep').hide();

    $('#gomori-container').on('click', '#btnRunGomori', function() {
        gomori.run();
    });

    $('body').on('click', '#btnGomoriStep', function() {
        gomori.next();
    });

    $('#gomoriRefresh').click(function() {
        $('#btnGomoriStep').hide();

        var container = $('#gomori-container');

        var countVar = $('#gomori-count-variables').val();
        var countLim = $('#gomori-count-limits').val();

        container.text('');

        if(!Validator.isInteger(countVar))
        {
            alert('Count of variables must be an integer');
            return;

        }

        if(!Validator.isInteger(countLim))
        {
            alert('Count of limits must be an integer');
            return;

        }


        var textNode = document.createElement("div");  // Create with DOM
        textNode.className = "result-block-label";
        textNode.innerHTML = 'Please, set start values:';
        container.append(textNode);

        gomori = new GomoriView(countVar, countLim);
    });



    // ========================== double simplex ==========================
    // create new instances
    var dSimplex;

    $('#d-simplex-container').on('click', '#btnRunDSimplex', function() {
        dSimplex.run();
    });

    $('#dSimplexRefresh').click(function() {

        var container = $('#d-simplex-container');

        var countVar = $('#dsimplex-count-variables').val();
        var countLim = $('#dsimplex-count-limits').val();

        container.text('');

        if(!Validator.isInteger(countVar))
        {
            alert('Count of variables must be an integer');
            return;

        }

        if(!Validator.isInteger(countLim))
        {
            alert('Count of limits must be an integer');
            return;

        }


        var textNode = document.createElement("div");  // Create with DOM
        textNode.className = "result-block-label";
        textNode.innerHTML = 'Please, set start values:';
        container.append(textNode);

        dSimplex = new DSimplexView(countVar, countLim);
    });

});