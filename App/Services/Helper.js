Date.prototype.getMonthName = function() {
    var monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];
    return monthNames[this.getMonth()];
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function getMonthName() {
    const date = new Date();
    return date.getMonthName()
}

function getDate() {
    const date = new Date();
    const date_number = date.getDate()

    let suffix = ''

    if (date_number > 3 && date_number < 21) suffix='th';
    switch (date_number % 10) {
        case 1:  suffix="st";
        case 2:  suffix="nd";
        case 3:  suffix="rd";
        default: suffix="th";
    }

    return date_number + suffix
}

export const Helper = {
    formatNumber,
    getMonthName,
    getDate
}