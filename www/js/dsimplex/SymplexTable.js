function DSimplexTable(_m, _n) {
    this.koefs;     // Fraction[,]
    this.freeKoefs; // Fraction[]
    this.fxKoefs;   // Expression[]
    this.grades;    // Expression[]
    this.fx;        // Expression
    this.basic;     // int[]
    this.x;         // string[] // x-names
    this.m = _m;    // size
    this.n = _n;    //
    this._i;        // basis-in
    this._j;        // basis-out
    this.hop = 0;   //number of table
    this.result;    //is ended ?
    this.str;
}

DSimplexTable.prototype.setData = function(data) {
    this.m = data.m;
    this.n = data.n;
    this.koefs = new Array();
    this.freeKoefs = new Array();
    this.basic = new Array();
    this.fxKoefs = new Array();
    this.x = new Array();

    for (var i = 0; i < this.m; i++) {
        this.freeKoefs[i] = data[i][this.n];
        this.koefs[i] = new Array();
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

DSimplexTable.prototype.btnClick = function() {
    switch (this.hop) {
        case 0:  this.buildTable();             break;
        case -1: this.doneMessage(this.result); break;
        default: this.nextTable();              break;
    }
};

DSimplexTable.prototype.buildTable = function() {
    this.grades = new Array();
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

DSimplexTable.prototype.isEnd = function () {
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
    for(j = 0; j < this.n; j++) {
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

DSimplexTable.prototype.getBasic = function() {
    var t = 0;
    this.basic = new Array();
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

    if (t == this.m) return true;
    return false;
};

DSimplexTable.prototype.doneMessage = function(res) {
    this.str="";
    switch (res)
    {
        case -1: this.str = "МПР порожня"; break;
        case 1:  this.str = "Отриманий оптимальний розв`язок"; break;
        case 0:  this.str = "Pадача потребує подальшої оптимізації"; return false;
    }
    return true;
};