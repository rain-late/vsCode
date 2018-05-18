;
(function () {
    var datepicker = window.datepicker;
    var monthData, $wrap;
    datepicker.buildUI = function (year, month) {
        monthData = datepicker.getMonthDate(year, month);
        var html = 
        '<div class="ui-datepicker-header">' +
            '<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
            '<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-cur-month">' + monthData.year + '-' + monthData.month + '</span>' +
        '</div>' +
            '<div class="ui-datepicker-body">' +
                '<table>' +
                    '<thead>' +
                        '<tr>' +
                            '<th>一</th>' +
                            '<th>二</th>' +
                            '<th>三</th>' +
                            '<th>四</th>' +
                            '<th>五</th>' +
                            '<th>六</th>' +
                            '<th>日</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>';
        for (var i = 0; i < monthData.data.length; i++) {
            if (i % 7 === 0) html += '<tr>';
            html += '<td>' + monthData.data[i].showDate + '</td>';
            if (i % 7 === 6) html += '</tr>';
        }
        html += '</tbody>' + 
                '</table>' +
            '</div>';

        return html;
    };

    datepicker.render = function (dir) {
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        if (dir === 'prev') month--;
        if (dir === 'next') month++;
        var html = datepicker.buildUI(year, month);
        $wrap = document.createElement('div');
        $wrap.className = 'ui-datepicker-wrapper';
        $wrap.innerHTML = html;
        document.body.appendChild($wrap);
    };

    datepicker.init = function ($input) {
        datepicker.render();
        var $input = document.getElementsByClassName($input);
        $input.addEventListener('focus', function () {
            if (!$wrap.classList.contains('ui-datepicker-wrapper-show')) {
                var top = $input.offsetTop + $input.offsetHeight;
                var left = $input.offsetLeft;
                $wrap.style.top = top + 'px';
                $wrap.style.left = left + 'px';
                $wrap.classList.add('ui-datepicker-wrapper-show');
            } 

        }, false);
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('ui-datepicker-btn') | e.target.classList.contains('datepicker')) return false;
            $wrap.classList.remove('ui-datepicker-wrapper-show');
        }, false);
        // $input.addEventListener('blur', function (e) {
        //     if ($wrap.classList.contains('ui-datepicker-wrapper-show')) $wrap.classList.remove('ui-datepicker-wrapper-show');
        // }, false);

        $wrap.addEventListener('click', function (e) {
            var target = e.target;
            if (!target.classList.contains('ui-datepicker-btn')) return false;
            if (target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev')
            }
            if (target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }
        }, false);
    }
})();