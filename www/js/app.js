/// <reference path="./jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fraction = (function () {
    function Fraction(_numerator, _denominator) {
        this.normalize = function () {
            if (this.denominator < 0) {
                this.numerator *= -1;
                this.denominator *= -1;
            }
            this.contraction();
        };
        if (_denominator == undefined)
            _denominator = 1;
        if (_numerator == undefined)
            _numerator = 0;
        if (_denominator == 0)
            throw Error('divide by zero');
        if (typeof _numerator == "number")
            this.numerator = _numerator;
        else
            this.numerator = 0;
        if (typeof _denominator == "number")
            this.denominator = _denominator;
        else
            this.denominator = 1;
        this.normalize();
    }
    /**
     * operator '+' *
     */
    Fraction.addition = function (a, b) {
        return new Fraction(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator);
    };
    ;
    /**
     * operator '-' *
     */
    Fraction.subtraction = function (a, b) {
        return new Fraction(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator);
    };
    ;
    /**
     * operator 'x' *
     */
    Fraction.multiplication = function (a, b) {
        return new Fraction(a.numerator * b.numerator, a.denominator * b.denominator);
    };
    ;
    /**
     * operator ':' *
     */
    Fraction.division = function (a, b) {
        return new Fraction(a.numerator * b.denominator, a.denominator * b.numerator);
    };
    ;
    /**
     * operator '==' *
     */
    Fraction.isEqual = function (a, b) {
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
    ;
    /**
     * operator '!=' *
     */
    Fraction.isNotEqual = function (a, b) {
        return !Fraction.isEqual(a, b);
    };
    ;
    /**
     * operator '>' *
     */
    Fraction.more = function (a, b) {
        if (typeof a.numerator == "undefined" ||
            typeof a.denominator == "undefined" ||
            typeof b != "number" &&
                (typeof b.numerator == "undefined" || typeof b.denominator == "undefined"))
            throw new Error("incorrect input data");
        if (typeof b == "number")
            return (a.numerator / a.denominator > b);
        return (a.numerator / a.denominator > b.numerator / b.denominator);
    };
    ;
    /**
     * operator '<' *
     */
    Fraction.less = function (a, b) {
        if (Fraction.isEqual(a, b))
            return false;
        return !Fraction.more(a, b);
    };
    ;
    /**
     * operator '>=' *
     */
    Fraction.moreOrEqual = function (a, b) {
        return !Fraction.less(a, b);
    };
    ;
    /**
     * operator '<=' *
     */
    Fraction.lessOrEqual = function (a, b) {
        return !Fraction.more(a, b);
    };
    ;
    Fraction.parse = function (str) {
        if (str == "")
            return new Fraction();
        var strs = str.split('/');
        var a = 0;
        var b = 1;
        a = parseInt(strs[0]);
        if (strs.length == 2)
            b = parseInt(strs[1]);
        if (typeof a != 'number' || isNaN(a) || typeof b != 'number' || isNaN(b) || strs.length > 2)
            throw Error("Неможливо зчитати дані");
        else
            return new Fraction(a, b);
    };
    ;
    Fraction.prototype.integerPart = function () {
        var value = this.numerator / this.denominator;
        return parseInt(value.toString());
    };
    ;
    Fraction.prototype.fractionalPart = function () {
        var t = this.numerator % this.denominator;
        return new Fraction(t >= 0 ? t : this.denominator + t, this.denominator);
    };
    ;
    Fraction.prototype.module = function () {
    };
    ;
    Fraction.prototype.isNull = function () {
        return (this.numerator == 0);
    };
    ;
    Fraction.prototype.toString = function () {
        return this.numerator + (this.denominator == 1 ? "" : "/" + this.denominator);
    };
    ;
    Fraction.prototype.contraction = function () {
        if (this.numerator == -0)
            this.numerator = 0;
        if (this.numerator == 0) {
            this.denominator = 1;
            return this;
        }
        var _gcd = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
        this.numerator /= _gcd;
        this.denominator /= _gcd;
        return this;
    };
    ;
    Fraction.prototype.gcd = function (a, b) {
        while (a != b) {
            if (a > b)
                a -= b;
            else
                b -= a;
        }
        return a;
    };
    ;
    return Fraction;
})();
var Expression = (function () {
    function Expression(_c, _M) {
        this.c = new Fraction(0, 1);
        this.M = new Fraction(0, 1);
        if (typeof _c != "undefined") {
            if (typeof _c == "number")
                this.c = new Fraction(_c, 1);
            else
                this.c = _c;
        }
        if (typeof _M != "undefined") {
            if (typeof _M == "number")
                this.M = new Fraction(_M, 1);
            else
                this.M = _M;
        }
    }
    /**
     * operator '+' *
     */
    Expression.addition = function (a, b) {
        return new Expression(Fraction.addition(a.c, b.c), Fraction.addition(a.M, b.M));
    };
    ;
    /**
     * operator '-' *
     */
    Expression.subtraction = function (a, b) {
        return new Expression(Fraction.subtraction(a.c, b.c), Fraction.subtraction(a.M, b.M));
    };
    ;
    /**
     * operator 'x' *
     */
    Expression.multiplication = function (a, b) {
        return new Expression(Fraction.multiplication(a.c, b), Fraction.multiplication(a.M, b));
    };
    ;
    /**
     * operator ':' *
     */
    Expression.division = function (a, b) {
        return new Expression(Fraction.division(a.c, b), Fraction.division(a.M, b));
    };
    ;
    /**
     * operator '==' *
     */
    Expression.isEqual = function (a, b) {
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
    ;
    /**
     * operator '!=' *
     */
    Expression.isNotEqual = function (a, b) {
        return !Expression.isEqual(a, b);
    };
    ;
    /**
     * operator '>' *
     */
    Expression.more = function (a, b) {
        if (typeof b == "number")
            return !(Fraction.isEqual(a.M, 0) && Fraction.less(a.c, b));
        if (Fraction.more(a.M, b.M))
            return true;
        if (Fraction.isEqual(a.M, b.M))
            if (Fraction.more(a.c, b.c))
                return true;
        return false;
    };
    ;
    /**
     * operator '<' *
     */
    Expression.less = function (a, b) {
        return !Expression.moreOrEqual(a, b);
    };
    ;
    /**
     * operator '>=' *
     */
    Expression.moreOrEqual = function (a, b) {
        if (Expression.isEqual(a, b))
            return true;
        if (typeof b == "number")
            return !(Fraction.isEqual(a.M, 0) && Fraction.less(a.c, b));
        if (Fraction.more(a.M, b.M))
            return true;
        if (Fraction.isEqual(a.M, b.M))
            if (Fraction.more(a.c, b.c))
                return true;
        return false;
    };
    ;
    /**
     * operator '<=' *
     */
    Expression.lessOrEqual = function (a, b) {
        return !Expression.more(a, b);
    };
    ;
    Expression.parse = function (str) {
        if (str == 'M' || str == 'm' || str == 'М' || str == 'м')
            return new Expression(0, 1);
        else
            return new Expression(Fraction.parse(str), 0);
    };
    ;
    Expression.prototype.toString = function () {
        var str = "";
        if (!this.M.isNull()) {
            if (Fraction.isNotEqual(this.M, 1))
                str += this.M.toString() + "*";
            str += "M";
        }
        if (!this.c.isNull()) {
            if (Fraction.more(this.c, 0) && Fraction.isNotEqual(this.M, 0))
                str += "+";
            str += this.c.toString();
        }
        if (str.length == 0)
            str = "0";
        return str;
    };
    ;
    return Expression;
})();
var DSimplexTable = (function () {
    function DSimplexTable(m, n) {
        if (typeof m !== 'undefined')
            this.m = m;
        if (typeof n !== 'undefined')
            this.n = n;
        this.hop = 0;
    }
    DSimplexTable.prototype.setData = function (data) {
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
        for (var j = 0; j < this.n; j++) {
            this.fxKoefs[j] = data[this.m][j];
            this.x[j] = "x" + (j + 1);
        }
        if (!this.getBasic()) {
            throw Error("Неможливо побудувати базис");
        }
    };
    ;
    DSimplexTable.prototype.btnClick = function () {
        switch (this.hop) {
            case 0:
                this.buildTable();
                break;
            case -1:
                this.doneMessage(this.result);
                break;
            default:
                this.nextTable();
                break;
        }
    };
    ;
    DSimplexTable.prototype.buildTable = function () {
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
        else
            this.hop++;
    };
    ;
    DSimplexTable.prototype.nextTable = function () {
        var tmpF;
        var tmpE = new Expression();
        this.basic[this._i] = this._j;
        if (Fraction.isNotEqual((tmpF = this.koefs[this._i][this._j]), 1)) {
            for (var j = 0; j < this.n; j++)
                this.koefs[this._i][j] = Fraction.division(this.koefs[this._i][j], tmpF);
            this.freeKoefs[this._i] = Fraction.division(this.freeKoefs[this._i], tmpF);
        }
        for (var i = 0; i < this.m; i++) {
            if (i == this._i)
                tmpE = Expression.subtraction(new Expression(), this.grades[this._j]);
            else
                tmpF = Fraction.subtraction(new Fraction(), this.koefs[i][this._j]);
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
        else
            this.hop++;
    };
    ;
    DSimplexTable.prototype.isEnd = function () {
        var minF = new Fraction(0);
        for (var i = 0; i < this.m; i++)
            if (Fraction.less(this.freeKoefs[i], minF)) {
                minF = this.freeKoefs[i];
                this._i = i;
            }
        var check = new Fraction(0);
        if (Fraction.isEqual(minF, check))
            return 1;
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
                console.log(min);
                this._j = j;
            }
        }
        var check1 = new Expression(10000000, 1);
        if (Expression.isEqual(min, check1)) {
            return -1;
        }
        return 0;
    };
    ;
    DSimplexTable.prototype.getBasic = function () {
        var t = 0;
        this.basic = [];
        for (var i = 0; i < this.n; i++) {
            if (Expression.less(this.fxKoefs[i], 0))
                throw Error('koef f(x) менше 0');
        }
        for (var j = 0; j < this.n; j++) {
            var counter = 0;
            for (var i = 0; i < this.m; i++) {
                if (counter == 0 && Fraction.isEqual(this.koefs[i][j], 1))
                    counter++;
                else if (Fraction.isEqual(this.koefs[i][j], 0))
                    continue;
                else {
                    counter = 2;
                    break;
                }
            }
            if (counter == 1)
                this.basic[t++] = j;
        }
        return (t == this.m);
    };
    ;
    DSimplexTable.prototype.doneMessage = function (res) {
        this.str = "";
        switch (res) {
            case -1:
                this.str = "МПР порожня";
                break;
            case 1:
                this.str = "Отриманий оптимальний розв`язок";
                break;
            case 0:
                this.str = "Pадача потребує подальшої оптимізації";
                return false;
        }
        return true;
    };
    ;
    return DSimplexTable;
})();
var GomoriSimplexTable = (function () {
    function GomoriSimplexTable(_m, _n) {
        this.m = _m;
        this.n = _n;
        this.isend = false;
        this.hop = 0;
    }
    GomoriSimplexTable.prototype.setData = function (data) {
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
        for (var j = 0; j < this.n; j++) {
            this.fxKoefs[j] = data[this.m][j];
            //this.isPositive[j] = data[this.m + 2][j];
            this.isInteger[j] = data[this.m + 3][j];
            this.x[j] = "x" + (j + 1);
        }
        console.log("lell");
        this.xChange();
    };
    ;
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
    GomoriSimplexTable.prototype.btnClick = function () {
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
    ;
    GomoriSimplexTable.prototype.buildTable = function () {
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
    ;
    GomoriSimplexTable.prototype.nextTable = function () {
        var tmpF;
        var tmpE = new Expression();
        this.basic[this._i] = this._j;
        if (Fraction.isNotEqual((tmpF = this.koefs[this._i][this._j]), 1)) {
            for (var j = 0; j < this.n; j++)
                this.koefs[this._i][j] = Fraction.division(this.koefs[this._i][j], tmpF);
            this.freeKoefs[this._i] = Fraction.division(this.freeKoefs[this._i], tmpF);
        }
        for (var i = 0; i < this.m; i++) {
            if (i == this._i)
                tmpE = Expression.subtraction(new Expression(), this.grades[this._j]);
            else
                tmpF = Fraction.subtraction(new Fraction(), this.koefs[i][this._j]);
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
    ;
    GomoriSimplexTable.prototype.buildCut = function () {
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
    ;
    GomoriSimplexTable.prototype.calcCut = function () {
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
            if (i == this._i)
                tmpE = Expression.subtraction(new Expression(), this.grades[this._j]);
            else
                tmpF = Fraction.subtraction(new Fraction(), this.koefs[i][this._j]);
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
    ;
    GomoriSimplexTable.prototype.isEnd2ST = function () {
        var minF = new Fraction(0);
        for (var i = 0; i < this.m; i++)
            if (Fraction.less(this.freeKoefs[i], minF)) {
                minF = this.freeKoefs[i];
                this._i = i;
            }
        var check = new Fraction(0);
        if (Fraction.isEqual(minF, check))
            return this.isAllInt(); //2or4
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
        return 3; //this.isAllInt();
    };
    ;
    GomoriSimplexTable.prototype.isAllInt = function () {
        var flag = true;
        for (var i = 0; i < this.m; i++) {
            if (this.isInteger[this.basic[i]] == true) {
                console.log(this.freeKoefs[i].fractionalPart());
                if (Fraction.isEqual(this.freeKoefs[i].fractionalPart(), new Fraction()))
                    continue;
                else
                    return 2;
            }
        }
        this.isend = true;
        return 4;
    };
    ;
    GomoriSimplexTable.prototype.isEnd = function () {
        if (this.hop < 2)
            return this.isEndST();
        else
            return this.isEnd2ST();
    };
    ;
    GomoriSimplexTable.prototype.isEndST = function () {
        var max = new Expression();
        for (var j = 0; j < this.n; j++)
            if (Expression.more(this.grades[j], max)) {
                max = this.grades[j];
                this._j = j;
            }
        var check = new Expression();
        if (Expression.isEqual(max, check)) {
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
                    return -1; // hasnt elemnts > 0 over positive grade
            }
        }
        return 1; // optimization isnt end
    };
    ;
    GomoriSimplexTable.prototype.xChange = function () {
        var counter = 0;
        if (this.mm == -1) {
            for (var i = 0; i < this.n; i++)
                this.fxKoefs[i] = Expression.multiplication(this.fxKoefs[i], new Fraction(-1));
        }
        console.log("lell");
        for (var i = 0; i < this.m; i++) {
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
            if (this.signs[i] < 0)
                counter++;
        }
        if (!this.getBasic()) {
            if (counter == 1) {
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
                    if (i == numberOfRow)
                        continue;
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
    ;
    GomoriSimplexTable.prototype.getBasic = function () {
        var t;
        var count = 0;
        for (var j = 0; j < this.n; j++) {
            var counter = 0;
            for (var i = 0; i < this.m; i++) {
                if (counter == 0 && Fraction.isEqual(this.koefs[i][j], 1)) {
                    counter++;
                    t = i;
                }
                else if (Fraction.isEqual(this.koefs[i][j], 0))
                    continue;
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
        if (count == this.m)
            return true;
        return false;
    };
    ;
    GomoriSimplexTable.prototype.doneMessage = function () {
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
    ;
    GomoriSimplexTable.prototype.getX = function () {
        var tmp = new Array();
        for (var j = 0; j < this.n; j++)
            tmp[j] = new Fraction();
        for (var i = 0; i < this.m; i++)
            tmp[this.basic[i]] = this.freeKoefs[i];
        var str = tmp.join(', ');
        return str;
    };
    ;
    GomoriSimplexTable.prototype.getResult = function () {
        var tmp = new Array();
        for (var j = 0; j < this.n; j++)
            tmp[j] = new Fraction();
        for (var i = 0; i < this.m; i++)
            tmp[this.basic[i]] = this.freeKoefs[i];
        var str = tmp.slice(0, this.xcount).join(', ');
        str = "x*(" + str + ") f(x)=" + Expression.multiplication(this.fx, new Fraction(this.mm));
        return str;
    };
    ;
    return GomoriSimplexTable;
})();
var Rational = (function () {
    /**
     * Constructor: Sets up the rational number by ensuring a nonzero
     * denominator and making only the numerator signed.
     * @param numerator numerator for new Rational number
     * @param denominator denominator for new Rational number
     */
    function Rational(numerator, denominator) {
        if (denominator) {
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
    Rational.prototype.getNumerator = function () { return this.numerator; };
    /**
     * Returns the denominator of this rational number
     * @return number denominator
     */
    Rational.prototype.getDenominator = function () { return this.denominator; };
    /**
     * Set the numerator of this rational number
     * @param numerator number new value of the numerator
     */
    Rational.prototype.setNumerator = function (numerator) { this.numerator = numerator; };
    /**
     * Set the denominator of this rational number
     * @param denominator number new value of the denominator
     */
    Rational.prototype.setDenominator = function (denominator) { this.denominator = denominator; };
    /**
     * Clone rational number
     * @method dup
     * @returns {Rational}
     */
    Rational.prototype.dup = function () {
        return new Rational(this.numerator, this.denominator);
    };
    /**
     * Convert current rational number to string value
     * @method toString
     * @returns {string}
     */
    Rational.prototype.toString = function () {
        if (this.denominator == 1) {
            return this.numerator.toString();
        }
        else {
            // implicit conversion of numbers to strings
            return this.numerator + '/' + this.denominator;
        }
    };
    /**
     * Convert current rational number to float value
     * @returns {float}
     */
    Rational.prototype.toFloat = function () { return eval(this.toString()); };
    /**
     * Convert current rational number to integer value
     * @returns {int}
     */
    Rational.prototype.toInt = function () { return Math.floor(this.toFloat()); };
    /**
     * Reduce ration number (find greatest common divisor and divide numerator and denominator)
     * @returns {Rational}
     */
    Rational.prototype.normalize = function () {
        // Find greatest common divisor (GCD)
        var gsd = Math.abs(this.numerator), b = Math.abs(this.denominator);
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
        if (this.denominator < 0) {
            // Multiply numerator and denominator by -1
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    };
    /**
     * Create and get new Rational object from current object with absolute values
     * @returns {Rational}
     */
    Rational.prototype.abs = function () {
        return new Rational(Math.abs(this.numerator), this.denominator);
    };
    /**
     * Create and get new Rational object from current object with inverse values
     * @returns {Rational}
     */
    Rational.prototype.inv = function () {
        return new Rational(this.denominator, this.numerator);
    };
    // =================================== Arithmetic methods ===================================
    /**
     * Arithmetic: add the current Rational object with all Rational objects in the argument list
     * Function modify receiver
     * @returns {Rational}
     */
    Rational.prototype.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            this.numerator = this.numerator * arguments[i].denominator + this.denominator * arguments[i].numerator;
            this.denominator = this.denominator * arguments[i].denominator;
        }
        return this.normalize();
    };
    /**
     * Arithmetic: subtract the current Rational object with all Rational objects in the argument list
     * Function modify receiver
     * @returns {Rational}
     */
    Rational.prototype.subtract = function (obj) {
        this.numerator = this.numerator * obj.denominator - this.denominator * obj.numerator;
        this.denominator = this.denominator * obj.denominator;
        return this.normalize();
    };
    /**
     * Arithmetic: apply unary "-" operator to receiver
     * @returns {Rational}
     */
    Rational.prototype.neg = function () {
        var number = new Rational(0);
        return number.subtract(this);
    };
    /**
     * Arithmetic: multiply the current Rational object with all Rational objects in the argument list
     * Function modify receiver
     * @returns {Rational}
     */
    Rational.prototype.multiply = function (obj) {
        this.numerator *= obj.numerator;
        this.denominator *= obj.denominator;
        return this.normalize();
    };
    /**
     * Divide current object for other Rational object
     * @param rat Rational object
     * @returns {Rational}
     */
    Rational.prototype.divide = function (rat) {
        return this.multiply(rat.inv());
    };
    /**
     * Increment current object
     * @returns {Rational}
     */
    Rational.prototype.inc = function () {
        this.numerator += this.denominator;
        return this.normalize();
    };
    /**
     * Decrement current object
     * @returns {Rational}
     */
    Rational.prototype.dec = function () {
        this.numerator -= this.denominator;
        return this.normalize();
    };
    // =================================== Comparison methods ===================================
    /**
     * Compare the current object with zero
     * @returns {boolean}
     */
    Rational.prototype.isZero = function () {
        return (this.numerator == 0);
    };
    /**
     * Check if the current object is positive
     * @returns {boolean}
     */
    Rational.prototype.isPositive = function () {
        return (this.numerator > 0);
    };
    /**
     * Check if the current object is negative
     * @returns {boolean}
     */
    Rational.prototype.isNegative = function () {
        return (this.numerator < 0);
    };
    /**
     * Check if the current object is equal to other Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    Rational.prototype.eq = function (rat) {
        return this.dup().subtract(rat).isZero();
    };
    /**
     * Check if the current object is not equal to other Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    Rational.prototype.ne = function (rat) {
        return !(this.eq(rat));
    };
    /**
     * Check if the current object is less than Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    Rational.prototype.lt = function (rat) {
        return this.dup().subtract(rat).isNegative();
    };
    /**
     * Check if the current object is greater than Rational object
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    Rational.prototype.gt = function (rat) {
        return this.dup().subtract(rat).isPositive();
    };
    /**
     * Check if the current object is less than Rational object or equal them
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    Rational.prototype.le = function (rat) {
        return !(this.gt(rat));
    };
    /**
     * Check if the current object is greater than Rational object or equal them
     * @param rat Rational object for comparison
     * @returns {boolean}
     */
    Rational.prototype.ge = function (rat) {
        return !(this.lt(rat));
    };
    return Rational;
})();
var SimplexView = (function () {
    function SimplexView() {
    }
    return SimplexView;
})();
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
var Simplex = (function () {
    function Simplex(data) {
    }
    /**
     * Build current simplex function
     * @returns {boolean}
     */
    Simplex.prototype.build = function () {
        return true;
    };
    /**
     * Validate current simplex data
     * @returns {boolean}Header/Footer/Left Menu from iwdagency.com
     */
    Simplex.prototype.validate = function () {
        return false;
    };
    /**
     *
     */
    Simplex.prototype.run = function () {
        return false;
    };
    /**
     * Completely
     */
    Simplex.prototype.complete = function () {
        return false;
    };
    /**
     * Start next simplex step
     * @returns {boolean} true if it hasn't next step, else false
     */
    Simplex.prototype.nextStep = function () {
        return this.isEnd();
    };
    /**
     * Check if simplex is completed
     * @returns {boolean}
     */
    Simplex.prototype.isCompleted = function () {
        return true;
    };
    /**
     * Check if simplex has some errors
     * @returns {boolean}
     */
    Simplex.prototype.isError = function () {
        return true;
    };
    /**
     * Check, if simplex is in the final state
     * (is completed, or has some errors)
     * @returns {boolean}
     */
    Simplex.prototype.isEnd = function () {
        return this.isCompleted() || this.isError();
    };
    return Simplex;
})();
var DSimplex = (function (_super) {
    __extends(DSimplex, _super);
    function DSimplex(data) {
        _super.call(this, data);
    }
    return DSimplex;
})(Simplex);
var Template = (function () {
    function Template(name, html) {
        this.setName(name);
        this.setHtml(html);
    }
    Template.prototype.getName = function () { return this.name; };
    Template.prototype.setName = function (value) { this.name = value; };
    Template.prototype.getHtml = function () { return this.html; };
    Template.prototype.setHtml = function (value) { this.html = value; };
    Template.prototype.render = function (params) {
        return _.template(this.html, params);
    };
    Template.prototype.isNameEquals = function (name) {
        return this.getName() === name;
    };
    return Template;
})();
var TemplateManager = (function () {
    function TemplateManager() {
        this.templates = new Array();
    }
    TemplateManager.prototype.addTemplate = function (name, html) {
        var item = new Template(name, html);
        this.templates.push(item);
    };
    /**
     * Check if template is exists
     * @param {string} name of template
     * @returns {boolean}
     */
    TemplateManager.prototype.isExistsTemplate = function (name) {
        return this.findTemplate(name) !== null;
    };
    /**
     * Find template by name
     * @param {string} name
     * @returns {Template|null}
     */
    TemplateManager.prototype.findTemplate = function (name) {
        for (var tmpIndex = 0; tmpIndex < this.templates.length; tmpIndex++) {
            var item = this.templates[tmpIndex];
            if (item.isNameEquals(name))
                return item;
        }
        return null;
    };
    return TemplateManager;
})();
var DSimplexView = (function (_super) {
    __extends(DSimplexView, _super);
    function DSimplexView(countVar, countLim) {
        _super.call(this);
        this.countVar = countVar;
        this.countLim = countLim;
        // init all templates
        this.fillTemplates();
        this.buildTemplates();
    }
    DSimplexView.prototype.fillTemplates = function () {
        this.templateManager = new TemplateManager();
        this.templateManager.addTemplate('simplex-field', $('#tpl-simplex-field').html());
        //this.templateManager.addTemplate('simplex-field', $('#tpl-simplex-field').html());
    };
    DSimplexView.prototype.buildTemplates = function () {
        var template_html = $('#tpl-simplex-field').html();
        // var tpl = _.template(template_html);
        var container = $('#d-simplex-container');
        var labelText;
        var textNode, lim, varIndex;
        // build function of goal
        textNode = document.createElement("div"); // Create with DOM
        textNode.className = "limit-label";
        textNode.innerHTML = "Function of goal";
        container.append(textNode);
        var items = [];
        for (varIndex = 0; varIndex < this.countVar; varIndex++) {
            items.push({
                'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                'lim_id': 'func',
                'var_id': varIndex
            });
        }
        var select;
        //select = this.createSelect('d-func-select');
        container.append(_.template(template_html, { items: items }));
        //container.append(select);
        textNode = document.createElement("div"); // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "->";
        container.append(textNode);
        textNode = document.createElement("div"); // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "min";
        container.append(textNode);
        for (lim = 0; lim < this.countLim; lim++) {
            items = [];
            textNode = document.createElement("div"); // Create with DOM
            textNode.className = "limit-label";
            textNode.innerHTML = "Limit №" + (lim + 1);
            container.append(textNode);
            for (varIndex = 0; varIndex < this.countVar; varIndex++) {
                items.push({
                    'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                    'lim_id': lim,
                    'var_id': varIndex
                });
            }
            container.append(_.template(template_html, { items: items }));
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
            container.append(_.template(template_html, { items: items }));
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
    };
    DSimplexView.prototype.tryParseTemplates = function () {
        var valid = true;
        var data = {
            n: parseInt(this.countVar.toString()),
            m: parseInt(this.countLim.toString())
        };
        //data.n = this.countVar;
        //data.m = this.countLim;
        data[data.m] = new Array();
        for (var i = 0; i < this.countLim; i++) {
            data[i] = new Array();
            data[i][data.n] = Fraction.parse($('#dsimplex-lim-' + i + '-var-b').val());
            for (var j = 0; j < this.countVar; j++)
                data[i][j] = Fraction.parse($('#dsimplex-lim-' + i + '-var-' + j).val());
        }
        for (var j = 0; j < this.countVar; j++)
            data[data.m][j] = Expression.parse($('#dsimplex-lim-func-var-' + j).val());
        // function of goal
        for (varIndex = 0; varIndex < this.countVar; varIndex++) {
            var field = $('#dsimplex-lim-func-var-' + varIndex);
            var validField = this.tryValidField(field);
            if (!validField)
                valid = false;
        }
        for (var lim = 0; lim < this.countLim; lim++) {
            for (var varIndex = 0; varIndex < this.countVar; varIndex++) {
                var field = $('#dsimplex-lim-' + lim + '-var-' + varIndex);
                var validField = this.tryValidField(field);
                if (!validField)
                    valid = false;
            }
        }
        if (valid) {
            try {
                this.simplexTable.setData(data);
            }
            catch (e) {
                alert(e.message);
            }
        }
        return valid;
    };
    DSimplexView.prototype.tryValidField = function (field) {
        var valid = true;
        var value = field.val();
        //set field valid state
        field.removeClass('error-field');
        if (Validator.isInteger(value)) {
        }
        else if (Validator.isRational(value)) {
        }
        else if (Validator.isSynthetic(value)) {
        }
        else {
            // invalid value
            field.addClass('error-field');
            valid = false;
        }
        return valid;
    };
    DSimplexView.prototype.createSelect = function (id) {
        var select = document.createElement('select');
        select.id = id;
        var option;
        option = document.createElement('option');
        option.value = '1';
        option.textContent = '>=';
        select.appendChild(option);
        option = document.createElement('option');
        option.value = '2';
        option.textContent = '=';
        select.appendChild(option);
        option = document.createElement('option');
        option.value = '3';
        option.textContent = '<=';
        select.appendChild(option);
        return select;
    };
    DSimplexView.prototype.run = function () {
        $('#d-simplex-result').text('');
        this.simplexTable = new DSimplexTable();
        if (!this.tryParseTemplates()) {
            // error
            alert('You have some errors in required fields');
        }
        else {
            // run simplex method
            try {
                this.simplexTable.btnClick();
                while (this.simplexTable.hop !== -1) {
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
    };
    DSimplexView.prototype.getData = function () {
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
    ;
    DSimplexView.prototype.description = function () {
        var div = $('#dSimplexResult');
        var tab = this.simplexTable;
        if (tab.hop != -1) {
            div.append('<p>x' + tab.hop + '(' + this.getX() + ')</p>');
            div.append('<p>X' + (tab._j + 1) + ' вводиться в базис</p>');
            div.append('<p>X' + (tab.basic[tab._i] + 1) + ' виводиться з базису</p>');
        }
        div.append('<p>' + tab.str + '</p>');
        if (tab.hop == -1) {
            if (tab.result == 1) {
                div.append('<p>x*(' + this.getX() + ')</p>');
                div.append('<p>F(x*) = ' + tab.fx.toString() + '</p>');
            }
        }
    };
    ;
    DSimplexView.prototype.getX = function () {
        var tab = this.simplexTable;
        var tmp = new Array();
        for (var j = 0; j < tab.n; j++)
            tmp[j] = new Fraction();
        for (var i = 0; i < tab.m; i++)
            tmp[tab.basic[i]] = tab.freeKoefs[i];
        var str = tmp.join(', ');
        return str;
    };
    return DSimplexView;
})(SimplexView);
var GomoriView = (function () {
    function GomoriView(countVar, countLim) {
        this.countVar = countVar;
        this.countLim = countLim;
        this.buildTemplates();
    }
    GomoriView.prototype.buildTemplates = function () {
        var template_html = $('#tpl-gomori-field').html();
        var template_checkbox = $('#tpl-gomori-checkbox').html();
        // var tpl = _.template(template_html);
        var container = $('#gomori-container');
        var labelText;
        var textNode, lim, varIndex;
        // build function of goal
        textNode = document.createElement("div"); // Create with DOM
        textNode.className = "limit-label";
        textNode.innerHTML = "Function of goal";
        container.append(textNode);
        var items = [];
        for (varIndex = 0; varIndex < this.countVar; varIndex++) {
            items.push({
                'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                'lim_id': 'func',
                'var_id': varIndex
            });
        }
        var select;
        select = this.createSelectExstr('gomori-func-select');
        container.append(_.template(template_html, { items: items }));
        textNode = document.createElement("div"); // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "->";
        container.append(textNode);
        container.append(select);
        //textNode = document.createElement("div");  // Create with DOM
        //textNode.className = "limit-result";
        //textNode.innerHTML = "->";
        //container.append(textNode);
        textNode = document.createElement("div"); // Create with DOM
        textNode.className = "limit-result";
        textNode.innerHTML = "min";
        container.append(textNode);
        for (lim = 0; lim < this.countLim; lim++) {
            items = [];
            textNode = document.createElement("div"); // Create with DOM
            textNode.className = "limit-label";
            textNode.innerHTML = "Limit №" + (lim + 1);
            container.append(textNode);
            for (varIndex = 0; varIndex < this.countVar; varIndex++) {
                items.push({
                    'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                    'lim_id': lim,
                    'var_id': varIndex
                });
            }
            container.append(_.template(template_html, { items: items }));
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
            container.append(_.template(template_html, { items: items }));
        }
        //'#gomori-var-int-' + j
        textNode = document.createElement("div"); // Create with DOM
        textNode.className = "limit-label";
        textNode.innerHTML = "Integer limitations";
        container.append(textNode);
        var items = [];
        for (varIndex = 0; varIndex < this.countVar; varIndex++) {
            items.push({
                'title': 'x<sub>' + (varIndex + 1) + '</sub>',
                'var_id': varIndex
            });
        }
        container.append(_.template(template_checkbox, { items: items }));
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
    };
    GomoriView.prototype.createSelect = function (id) {
        var select = document.createElement('select');
        select.id = id;
        var option;
        option = document.createElement('option');
        option.value = '1';
        option.textContent = '<=';
        select.appendChild(option);
        option = document.createElement('option');
        option.value = '-1';
        option.textContent = '>=';
        select.appendChild(option);
        return select;
    };
    GomoriView.prototype.createSelectExstr = function (id) {
        var select = document.createElement('select');
        select.id = id;
        var option;
        option = document.createElement('option');
        option.value = '1';
        option.textContent = 'min';
        select.appendChild(option);
        option = document.createElement('option');
        option.value = '-1';
        option.textContent = 'max';
        select.appendChild(option);
        return select;
    };
    GomoriView.prototype.run = function () {
        $('#gomori-result').text('');
        this.simplexTable = new GomoriSimplexTable();
        if (!this.tryParseTemplates()) {
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
                else if (this.simplexTable.hop == -1) {
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
    };
    GomoriView.prototype.next = function () {
        this.simplexTable.btnClick();
        this.getData();
        if (this.simplexTable.isend == true) {
            alert('Task is completed');
            console.log('ended');
            $('#btnGomoriStep').hide();
        }
        if (this.simplexTable.hop == -1) {
            alert('Task is not completed');
            console.log('ended');
            $('#btnGomoriStep').hide();
        }
    };
    GomoriView.prototype.tryParseTemplates = function () {
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
    };
    GomoriView.prototype.tryValidField = function (field) {
        var valid = true;
        var value = field.val();
        //set field valid state
        field.removeClass('error-field');
        if (Validator.isInteger(value)) {
        }
        else if (Validator.isRational(value)) {
        }
        else if (Validator.isSynthetic(value)) {
        }
        else {
            // invalid value
            field.addClass('error-field');
            valid = false;
        }
        return valid;
    };
    GomoriView.prototype.getData = function () {
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
            tableCellDiv.append(tab.x[j] /*'X' + (j + 1)*/);
            tableRowDiv.append(tableCellDiv);
        }
        tableCellDiv = $('<th class="table-cell">');
        tableCellDiv.append('free m.');
        tableRowDiv.append(tableCellDiv);
        tableDiv.append(tableRowDiv);
        for (var i = 0; i < tab.m; i++) {
            tableRowDiv = $('<tr class="table-row">');
            tableCellDiv = $('<td class="table-cell">');
            tableCellDiv.append(tab.x[tab.basic[i]] /*'X' + (tab.basic[i] + 1)*/);
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
    };
    GomoriView.prototype.description = function () {
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
    };
    return GomoriView;
})();
var Validator = (function () {
    function Validator() {
    }
    Validator.isInteger = function (str) {
        return Validator.testPattern(/^(-)?(\d+)$/, str);
    };
    Validator.isRational = function (str) {
        return Validator.testPattern(/^(-)?(\d+)\/(\d+)$/, str);
    };
    Validator.isOnlyLetters = function (str) {
        return Validator.testPattern(/^\w+$/, str);
    };
    Validator.isSynthetic = function (str) {
        return Validator.testPattern(/^(m|M)$/, str);
    };
    Validator.testPattern = function (pattern, str) {
        return pattern.test(str);
    };
    return Validator;
})();
$(function () {
    // ========================== gomori ==========================
    // create new instances
    var gomori;
    $('#btnGomoriStep').hide();
    $('#gomori-container').on('click', '#btnRunGomori', function () {
        gomori.run();
    });
    $('body').on('click', '#btnGomoriStep', function () {
        gomori.next();
    });
    $('#gomoriRefresh').click(function () {
        $('#btnGomoriStep').hide();
        var container = $('#gomori-container');
        var countVar = $('#gomori-count-variables').val();
        var countLim = $('#gomori-count-limits').val();
        container.text('');
        if (!Validator.isInteger(countVar)) {
            alert('Count of variables must be an integer');
            return;
        }
        if (!Validator.isInteger(countLim)) {
            alert('Count of limits must be an integer');
            return;
        }
        var textNode = document.createElement("div"); // Create with DOM
        textNode.className = "result-block-label";
        textNode.innerHTML = 'Please, set start values:';
        container.append(textNode);
        gomori = new GomoriView(countVar, countLim);
    });
    // ========================== double simplex ==========================
    // create new instances
    var dSimplex;
    $('#d-simplex-container').on('click', '#btnRunDSimplex', function () {
        dSimplex.run();
    });
    $('#dSimplexRefresh').click(function () {
        var container = $('#d-simplex-container');
        var countVar = $('#dsimplex-count-variables').val();
        var countLim = $('#dsimplex-count-limits').val();
        container.text('');
        if (!Validator.isInteger(countVar)) {
            alert('Count of variables must be an integer');
            return;
        }
        if (!Validator.isInteger(countLim)) {
            alert('Count of limits must be an integer');
            return;
        }
        var textNode = document.createElement("div"); // Create with DOM
        textNode.className = "result-block-label";
        textNode.innerHTML = 'Please, set start values:';
        container.append(textNode);
        dSimplex = new DSimplexView(countVar, countLim);
    });
});
//# sourceMappingURL=app.js.map