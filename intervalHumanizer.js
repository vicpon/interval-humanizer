/*
 * Service to handle conversion of minutes to human friendly text
 */
function intervalHumanizer(timeInMinutes) {
    var self = this;
    var _minutes = timeInMinutes;

    self.weeks = function (newVal) {
        if (arguments.length) {
            return self.setTime('weeks', newVal);
        }

        return self.getTime('weeks');
    };

    self.days = function (newVal) {
        if (arguments.length) {
            return self.setTime('days', newVal);
        }

        return self.getTime('days');
    };

    self.hours = function (newVal) {
        if (arguments.length) {
            return self.setTime('hours', newVal);
        }

        return self.getTime('hours');
    };

    self.minutes = function (newVal) {
        if (arguments.length) {
            return self.setTime('minutes', newVal);
        }

        return self.getTime('minutes');
    };

    self.getTime = function (unit) {

        var minutesInHour = 60;
        var minutesInDay = 60 * 24;
        var minutesInWeek = 60 * 24 * 7;
        var time = 0;
        switch (unit) {
            case 'minutes':
                time = Math.trunc(_minutes % minutesInWeek % minutesInDay % minutesInHour);
                break;
            case 'hours':
                time = Math.trunc(_minutes % minutesInWeek % minutesInDay / minutesInHour);
                break;
            case 'days':
                time = Math.trunc(_minutes % minutesInWeek / minutesInDay);
                break;
            case 'weeks':
                time = Math.trunc(_minutes / minutesInWeek);
                break;
            default:
                throw new Error('Invalid unit passed to getTime');
        }
        return time;
    };

    self.setTime = function (unit, time) {
        var newTime = 0;
        var minutes, hourMinutes, dayMinutes, weekMinutes;

        minutes = this.minutes();
        hourMinutes = Math.trunc(self.hours() * 60);
        dayMinutes = Math.trunc(self.days() * 60 * 24);
        weekMinutes = Math.trunc(self.weeks() * 60 * 24 * 7);

        switch (unit) {
            case 'minutes':
                minutes = time;
                break;
            case 'hours':
                hourMinutes = Math.trunc(time * 60);
                break;
            case 'days':
                dayMinutes = Math.trunc(time * 60 * 24);
                break;
            case 'weeks':
                weekMinutes = Math.trunc(time * 60 * 24 * 7);
                break;
            default:
                throw new Error('Invalid unit passed to getTime');
        }
        newTime = minutes + hourMinutes + dayMinutes + weekMinutes;
        return _minutes = newTime;
    };

    self.toString = function () {
        var weeks = self.weeks();
        var days = self.days();
        var hours = self.hours();
        var minutes = self.minutes();

        var result = '';
        if (weeks > 0) {
            result += weeks + ' week' + (weeks > 1 ? 's' : '') + ' ';
        }
        if (days > 0) {
            result += days + ' day' + (days > 1 ? 's' : '') + ' ';
        }
        if (hours > 0) {
            result += hours + ' hour' + (hours > 1 ? 's' : '') + ' ';
        }
        if (minutes > 0) {
            result += minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ';
        }
        return result.trim();
    }
};