
function Expression(_c, _M) {
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
Expression.addition = function(a, b) {
    return new Expression(
        Fraction.addition(a.c, b.c),
        Fraction.addition(a.M, b.M)
    );
};
/**
 * operator '-' *
 */
Expression.subtraction = function(a, b) {
    return new Expression(
        Fraction.subtraction(a.c, b.c),
        Fraction.subtraction(a.M, b.M)
    );
};
/**
 * operator 'x' *
 */
Expression.multiplication = function(a, b) {
    return new Expression(
        Fraction.multiplication(a.c, b),
        Fraction.multiplication(a.M, b)
    );
};
/**
 * operator ':' *
 */
Expression.division = function(a, b) {
    return new Expression(
        Fraction.division(a.c, b),
        Fraction.division(a.M, b)
    );
};
/**
 * operator '==' *
 */
Expression.isEqual = function(a, b) {
    /*if (typeof a.numerator == "undefined" ||
     typeof a.denominator == "undefined" ||
     typeof b != "number" &&
     (typeof b.numerator == "undefined" || typeof b.denominator == "undefined"))
     throw new Error("incorrect input data");*/

    if (typeof b == "number") {
        if (Fraction.isNotEqual(a.M, 0)) return false;
        if (Fraction.isEqual(a.c, b)) return true;
    }
    if (Fraction.isNotEqual(a.M, b.M)) return false;
    if (Fraction.isEqual(a.M, b.M)) if (Fraction.isNotEqual(a.c, b.c)) return false;
    return true;
};
/**
 * operator '!=' *
 */
Expression.isNotEqual = function(a, b) {
    return !Expression.isEqual(a, b);
};
/**
 * operator '>' *
 */
Expression.more = function(a, b) {
    /*if (typeof a.numerator == "undefined" ||
        typeof a.denominator == "undefined" ||
        typeof b != "number" &&
        (typeof b.numerator == "undefined" || typeof b.denominator == "undefined"))
        throw new Error("incorrect input data");*/

    if (typeof b == "number")
        if (Fraction.isEqual(a.M, 0) && Fraction.less(a.c, b))
            return false;
        else return true;
    if (Fraction.more(a.M, b.M)) return true;
    if (Fraction.isEqual(a.M, b.M)) if (Fraction.more(a.c, b.c)) return true;
    return false;
};
/**
 * operator '<' *
 */
Expression.less = function(a, b) {
    return !Expression.moreOrEqual(a, b);
};
/**
 * operator '>=' *
 */
Expression.moreOrEqual = function(a, b) {
    /*if (typeof a.numerator == "undefined" ||
     typeof a.denominator == "undefined" ||
     typeof b != "number" &&
     (typeof b.numerator == "undefined" || typeof b.denominator == "undefined"))
     throw new Error("incorrect input data");*/


    if(Expression.isEqual(a, b)) return true;
    if (typeof b == "number")
        if (Fraction.isEqual(a.M, 0) && Fraction.less(a.c, b))
            return false;
        else return true;
    if (Fraction.more(a.M, b.M)) return true;
    if (Fraction.isEqual(a.M, b.M)) if (Fraction.more(a.c, b.c)) return true;
    return false;
};
/**
 * operator '<=' *
 */
Expression.lessOrEqual = function(a, b) {
    return !Expression.more(a, b);
};

Expression.parse = function(str) {
    if(str == 'M' || str == 'm' || str == 'М' || str == 'м')
        return new Expression(0,1);
    else return new Expression(Fraction.parse(str),0);
};

Expression.prototype.toString = function() {
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
