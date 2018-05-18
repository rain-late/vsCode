;
(function (win) {
    var datepicker = {};

    datepicker.getMonthDate = function (year, month) {
        var ret  = [];
        if (!year || !month) {
            var today  = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        //当月第一天,和周几;
        var firstDay = new Date(year, month - 1, 1);
        var firstWeekDay = firstDay.getDay();
        if (firstWeekDay === 0) firstWeekDay = 7;

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        //上月最后一天和日期;
        var lastMonthLastDay = new Date(year, month - 1, 0);
        var lastMonthDay = lastMonthLastDay.getDate();

        //需要显示上个月天的个数;
        var lastDayConunt = firstWeekDay - 1;

        //当月最后一天;
        var curMonthLastDay = new Date(year, month, 0);
        var lastDay = curMonthLastDay.getDate();

        //计算当前月要显示几周;
        //第一行最后一天;
        var weekLen = 1;
        var firstLineLastDay = 8 - firstWeekDay;
        weekLen += Math.floor((lastDay - firstLineLastDay)/7);
        if ((lastDay - firstLineLastDay) % 7 > 0) weekLen++;
        for (var i = 0; i < weekLen*7; i++) {
            var date = i + 1 - lastDayConunt;
            var showDate = date;
            var thisMonth = month;

            //上一月;
            if (date <= 0) {
                thisMonth = month - 1;
                showDate = lastMonthDay + date;
            } else if (date > lastDay) {
                thisMonth = month + 1;
                showDate = showDate - lastDay;
            }

            if (thisMonth === 0) thisMonth = 12;
            if (thisMonth === 13) thisMonth = 1;

            ret.push({
                month: thisMonth,
                showDate: showDate,
                date: date
            });
        }
        return {
            year: year,
            month: month,
            data: ret
        };
    }

    win.datepicker = datepicker;
})(window);