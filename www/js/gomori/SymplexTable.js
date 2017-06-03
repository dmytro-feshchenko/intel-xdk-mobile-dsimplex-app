
function GomoriSimplexTable(_m, _n) {
    this.koefs;      // Fraction[,]
    this.freeKoefs;  // Fraction[]
    this.fxKoefs;    // Expression[]
    this.grades;     // Expression[]
    this.fx;         // Expression
    this.signs;      // int[]
    this.isInteger;  // int[]
    //this.isPositive; // int[]
    this.basic;      // int[]
    this.x;          // string[] // x-names
    this.m = _m;     // size
    this.n = _n;     //
    this._i;         // basis-in
    this._j;         // basis-out
    this.hop = 0;    // number of table
    this.result;     // is ended ?
    this.mm;         // ->min/max ?
    this.xcount;     // sizeof(x*)
    this.isend = false;
}

GomoriSimplexTable.prototype.setData = function(data) {
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

GomoriSimplexTable.prototype.btnClick = function() {
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

GomoriSimplexTable.prototype.buildTable = function() {
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

GomoriSimplexTable.prototype.calcCut = function() {
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

GomoriSimplexTable.prototype.isEnd2ST = function() {
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

GomoriSimplexTable.prototype.isAllInt = function () {
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

GomoriSimplexTable.prototype.isEnd = function () {
    if(this.hop < 2) return this.isEndST();
    else return this.isEnd2ST();
};

GomoriSimplexTable.prototype.isEndST = function () {
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

GomoriSimplexTable.prototype.xChange = function(){
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

GomoriSimplexTable.prototype.getBasic = function() {
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

GomoriSimplexTable.prototype.doneMessage = function() {
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
GomoriSimplexTable.prototype.getX = function() {
    var tmp = new Array();
    for(var j = 0; j< this.n;j++)
        tmp[j] = new Fraction();
    for(var i =0;i<this.m;i++)
        tmp[this.basic[i]] = this.freeKoefs[i];
    var str = tmp.join(', ');
    return str;
};
GomoriSimplexTable.prototype.getResult = function() {
    var tmp = new Array();
    for (var j = 0; j < this.n; j++)
        tmp[j] = new Fraction();
    for (var i = 0; i < this.m; i++)
        tmp[this.basic[i]] = this.freeKoefs[i];
    var str = tmp.slice(0, this.xcount).join(', ');
    str = "x*(" + str + ") f(x)=" + Expression.multiplication(this.fx, new Fraction(this.mm));
    return str;
};