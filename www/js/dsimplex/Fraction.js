
function Fraction(_numerator, _denominator) {
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
Fraction.addition = function(a, b) {
    return new Fraction(
        a.numerator * b.denominator + b.numerator * a.denominator,
        a.denominator * b.denominator
    );
};
/**
 * operator '-' *
 */
Fraction.subtraction = function(a, b) {
    return new Fraction(
        a.numerator * b.denominator - b.numerator * a.denominator,
        a.denominator * b.denominator
    );
};
/**
 * operator 'x' *
 */
Fraction.multiplication = function(a, b) {
    return new Fraction(
        a.numerator * b.numerator,
        a.denominator * b.denominator
    );
};
/**
 * operator ':' *
 */
Fraction.division = function(a, b) {
    return new Fraction(
        a.numerator * b.denominator,
        a.denominator * b.numerator
    );
};
/**
 * operator '==' *
 */
Fraction.isEqual = function(a, b) {
    if (typeof a.numerator == "undefined" ||
        typeof a.denominator == "undefined" ||
        typeof b != "number" &&
        (typeof b.numerator == "undefined" || typeof b.denominator == "undefined"))
        throw new Error("incorrect input data");
    if (typeof b == "number")
        return (a.numerator / a.denominator == b);

    return (a.numerator / a.denominator == b.numerator / b.denominator);
};
/**
 * operator '!=' *
 */
Fraction.isNotEqual = function(a, b) {
    return !Fraction.isEqual(a, b);
};
/**
 * operator '>' *
 */
Fraction.more = function(a, b) {
    if (typeof a.numerator == "undefined" ||
        typeof a.denominator == "undefined" ||
        typeof b != "number" &&
        (typeof b.numerator == "undefined" || typeof b.denominator == "undefined"))
        throw new Error("incorrect input data");
    if (typeof b == "number")
        if (a.numerator / a.denominator > b)
            return true;
        else return false;
    if (a.numerator / a.denominator > b.numerator / b.denominator)
        return true;
    return false;
};
/**
 * operator '<' *
 */
Fraction.less = function(a, b) {
    if(Fraction.isEqual(a,b)) return false;
    return !Fraction.more(a, b);
};

Fraction.parse = function(str) {
    if(str=="") return new Fraction();
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

Fraction.prototype.isNull = function() {
    if(this.numerator == 0) return true;
    return false;
};
Fraction.prototype.toString = function() {
    return this.numerator + (this.denominator == 1 ? "" : "/" + this.denominator);
};
Fraction.prototype.contraction = function() {
    if (this.numerator == 0) {
        this.denominator = 1;
        return this;
    }
    var _gcd = gcd(Math.abs(this.numerator), Math.abs(this.denominator));
    this.numerator /= _gcd;
    this.denominator /= _gcd;
    return this;
};
Fraction.prototype.normalize = function() {
    if (this.denominator < 0) {
        this.numerator *= -1;
        this.denominator *= -1;
    }
    this.contraction();
};
gcd = function(a, b) {
    while (a != b)
    {
        if (a > b) a -= b;
        else b -= a;
    }
    return a;
};
