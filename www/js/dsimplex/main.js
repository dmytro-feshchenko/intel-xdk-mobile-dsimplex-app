$(function() {
    $("button")
        .button()
        .click(function (event) {
            event.preventDefault();
        });
    $('#create-table input').spinner();

    $('#container>div.hide').hide();
    var tabs = $('#tabs a');
    tabs.on('click', function (event) {
        event.preventDefault();
        $('#container>div.hide').show(250);
        $('#container>div').addClass('hide');
        $('#' + event.target.classList).removeClass();
        $('#container>div.hide').hide();
    });
    var tab,
        m,
        n;
    var btnStart = $('#start'),
        btnCalc = $('#calc'),
        _m = $('input.m'),//.attr('aria-valuenow', 2),
        _n = $('input.n');//.attr('aria-valuenow', 2);

    btnCalc.button("option", "disabled", true);

    btnCalc.click(function (event) {
        if (tab == "undefined") {
            tab = new SymplexTable();
            setData();
        }
        tab.btnClick();
        if (tab.hop == -1) {
            notifyMe('Повідомлення', 'Задача вирішена', 'res');
            console.log('ended');
        }
        console.dir(tab);
        getData();
    });
    btnStart.click(function (event) {
        var div = $('#description').html('');
        m = _m.attr('aria-valuenow');
        n = _n.attr('aria-valuenow');
        tab = "undefined";
        if (m < 11 && m > 1 && n < 11 && n > 1) {
            createTable(m, n);
            btnCalc.button("option", "disabled", false);
        }
        else {
            notifyMe('Помилка вводу', 'Спроба ввести некоректні дані', 'error');
        }
    });
    function notifyMe(name, msg, tag) {
        // Давайте проверим, поддерживает ли браузер уведомления
        if (!("Notification" in window)) {
            console.log("Ваш браузер не поддерживает HTML5 Notifications");
        }
        // Теперь давайте проверим есть ли у нас разрешение для отображения уведомления
        else if (Notification.permission === "granted") {
            var notification = new Notification(name, {
                tag: tag,
                body: msg
            });
        }
        // В противном случае, мы должны спросить у пользователя разрешение
        else if (Notification.permission === 'default') {
            Notification.requestPermission(function (permission) {
                // Не зависимо от ответа, сохраняем его в настройках
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                if (permission === "granted") {
                    var notification = new Notification(name, {
                        tag: tag,
                        body: msg
                    });
                }
            });
        }
    }
    function createTable() {
        var div = $('#input-table');
        var form = $('<form>');
        var table = $('<table>');
        var thead = $('<thead>');
        var tbody = $('<tbody>');
        var tfoot = $('<tfoot>');
        var tr, th, td;

        tr = $('<tr>');
        th = $('<th>');
        //th.append('\');
        tr.append(th);
        for (var j = 0; j < n; j++) {
            th = $('<th>');
            th.append('X' + (j + 1));
            tr.append(th);
        }
        th = $('<th>');
        //th.append();
        tr.append(th);
        th = $('<th>');
        th.append('віл.ч.');
        tr.append(th);
        thead.append(tr);

        for (var i = 0; i < m; i++) {
            tr = $('<tr>');
            td = $('<td>');
            td.append('р-ня ' + (i + 1));
            tr.append(td);
            for (j = 0; j < n; j++) {
                td = $('<td>');
                td.append('<input type="text" pattern="([-]{0,1}[0-9]+(/{1}[0-9]+){0,1})" class="koefs' + i + '_' + j + '">');
                tr.append(td);
            }
            td = $('<td>');
            td.append('=');
            tr.append(td);
            td = $('<td>');
            td.append('<input type="text" pattern="([-]{0,1}[0-9]+(/{1}[0-9]+){0,1})" class="freeKoefs' + i + '">');
            tr.append(td);
            tbody.append(tr);
        }

        tr = $('<tr>');
        td = $('<td>');
        td.append('ф. цілі');
        tr.append(td);
        for (j = 0; j < n; j++) {
            td = $('<td>');
            td.append('<input type="text" pattern="([-]{0,1}[0-9]+(/{1}[0-9]+){0,1})|M|m|М|м" class="fxKoefs' + j + '">');
            tr.append(td);
        }
        td = $('<td>');
        td.append('->');
        tr.append(td);
        td = $('<td>');
        td.append('min');
        tr.append(td);
        tfoot.append(tr);

        table.append(thead).append(tbody).append(tfoot);
        form.append(table);
        div.html(form);
    }
    function setData() {
        var data = new Array();
        data.m = m;
        data.n = n;
        data[data.m] = new Array();
        try {
            for (var i = 0; i < m; i++) {
                data[i] = new Array();
                data[i][data.n] = Fraction.parse($('input.freeKoefs' + i).val());
                for (j = 0; j < n; j++)
                    data[i][j] = Fraction.parse($('input.koefs' + i + '_' + j).val());
            }
            for (var j = 0; j < n; j++)
                data[data.m][j] = Expression.parse($('input.fxKoefs' + j).val());
            tab.setData(data);
        }
        catch (err) {
            console.log(err.message);
            tab = "undefined";
            notifyMe('Помилка вводу', err.message, 'err');
        }
    };
    function getData() {
        var mainDiv = $('#input-table');
        var tableDiv = $('<div class="table">');
        var tableRowDiv;
        var tableCellDiv;

        tableRowDiv = $('<div class="table-row">');
        tableCellDiv = $('<div class="table-cell">');
        //tableCellDiv.append('/');
        tableRowDiv.append(tableCellDiv);
        for (var j = 0; j < n; j++) {
            tableCellDiv = $('<div class="table-cell">');
            tableCellDiv.append('X' + (j + 1));
            tableRowDiv.append(tableCellDiv);
        }
        /*tableCellDiv=$('<div class="table-cell">');
         //tableCellDiv.append();
         tableRowDiv.append(tableCellDiv);*/
        tableCellDiv = $('<div class="table-cell">');
        tableCellDiv.append('віл.ч.');
        tableRowDiv.append(tableCellDiv);
        tableDiv.append(tableRowDiv);

        for (var i = 0; i < m; i++) {
            tableRowDiv = $('<div class="table-row">');
            tableCellDiv = $('<div class="table-cell">');
            tableCellDiv.append('X' + (tab.basic[i] + 1));
            tableRowDiv.append(tableCellDiv);
            for (j = 0; j < n; j++) {
                tableCellDiv = $('<div class="table-cell">');
                tableCellDiv.append(tab.koefs[i][j].toString());
                tableRowDiv.append(tableCellDiv);
            }
            /*tableCellDiv=$('<div class="table-cell">');
             tableCellDiv.append('=');
             tableRowDiv.append(tableCellDiv);*/
            tableCellDiv = $('<div class="table-cell">');
            tableCellDiv.append(tab.freeKoefs[i].toString());
            tableRowDiv.append(tableCellDiv);
            tableDiv.append(tableRowDiv);
        }

        tableRowDiv = $('<div class="table-row">');
        tableCellDiv = $('<div class="table-cell">');
        tableCellDiv.append('ф. цілі');
        tableRowDiv.append(tableCellDiv);
        for (j = 0; j < n; j++) {
            tableCellDiv = $('<div class="table-cell">');
            tableCellDiv.append(tab.grades[j].toString());
            tableRowDiv.append(tableCellDiv);
        }
        /*tableCellDiv=$('<div class="table-cell">');
         tableCellDiv.append('->');
         tableRowDiv.append(tableCellDiv);*/
        tableCellDiv = $('<div class="table-cell">');
        tableCellDiv.append(tab.fx.toString());
        tableRowDiv.append(tableCellDiv);
        tableDiv.append(tableRowDiv);

        mainDiv.html(tableDiv);
        description();
    };
    function description() {
        var div = $('#description').html('');
        if (tab.hop != -1) {
            div.append('<p>x' + tab.hop + '(' + getX() + ')</p>');
            div.append('<p>X' + (tab._j + 1) + ' вводиться в базис</p>');
            div.append('<p>X' + (tab.basic[tab._i] + 1) + ' виводиться з базису</p>');
        }
        div.append('<p>' + tab.str + '</p>');
        if (tab.hop == -1) {
            if(tab.result == 1) {
                div.append('<p>x*(' + getX() + ')</p>');
                div.append('<p>F(x*) = ' + tab.fx.toString() + '</p>');
            }
        }
    };
    function getX() {
        var tmp = new Array();
        for(var j = 0; j< tab.n;j++)
            tmp[j] = new Fraction();
        for(var i =0;i<tab.m;i++)
            tmp[tab.basic[i]] = tab.freeKoefs[i];
        var str = tmp.join(', ');
        return str;
    }
});
