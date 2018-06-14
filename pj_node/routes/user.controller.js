//날짜 반환 해주는 함수
exports.convertdate = function(date,callback){
    var arr_date = date.toString().split(" ");
    var day = arr_date[0];
    var month = arr_date[1].split(",")[0];
    var year = arr_date[2];
    if(parseInt(day)<10){
        day='0'+day;
    }
    switch(month){
        case 'January':
            month = "01";
            break;
        case 'February':
            month = "02";
            break;
        case 'March':
            month = "03";
            break;
        case 'April ':
            month = "04";
            break;
        case 'May':
            month = "05";
            break;
        case 'June':
            month = "06";
            break;
        case 'July':
            month = "07";
            break;
        case 'August':
            month = "08";
            break;
        case 'September':
            month = "09";
            break;
        case 'October':
            month = "10";
            break;
        case 'November':
            month = "11";
            break;
        case 'December':
            month = "12";
            break;
    }
    result_date = year+month+day;
    console.log("changed date : "+result_date);
    callback(null,result_date);
}