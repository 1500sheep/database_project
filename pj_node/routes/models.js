const config = require('../config/environment');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
        config.mysql.database,
        config.mysql.username,
        config.mysql.password,
        {
        'host':'localhost',
        'dialect':'mysql'
        }
        );

const User = sequelize.define('user', {
          name: Sequelize.STRING,
          password: Sequelize.STRING
          });
const Reservation = sequelize.define('reservation', {
    name: Sequelize.STRING,
    departInfo: Sequelize.STRING,
    arriveInfo: Sequelize.STRING
});


const Domairport = sequelize.define('domairport', {
    airportid: Sequelize.STRING,
    airportnm: Sequelize.STRING
});


const Domairline = sequelize.define('domairline', {
    airlineid: Sequelize.STRING,
    airlinenm: Sequelize.STRING
})


const Airportschedule =sequelize.define('airportschedule',{
    airFln:Sequelize.STRING,
    airlineEnglish:Sequelize.STRING,
    airlineKorean:Sequelize.STRING,
    airport:Sequelize.STRING,
    arrivedEng:Sequelize.STRING,
    arrivedKor:Sequelize.STRING,
    boardingEng:Sequelize.STRING,
    boardingKor:Sequelize.STRING,
    city:Sequelize.STRING,
    etd:Sequelize.STRING,
    gate:Sequelize.STRING,
    io:Sequelize.STRING,
    line:Sequelize.STRING,
    rmkEng:Sequelize.STRING,
    rmkKor:Sequelize.STRING,
    std:Sequelize.STRING,
    day:Sequelize.STRING
});
const air =sequelize.define('airport',{
    cityChn:Sequelize.STRING,
    cityCode:Sequelize.STRING,
    cityEng:Sequelize.STRING,
    cityJpn:Sequelize.STRING,
    cityKor:Sequelize.STRING
});

const ichairport =sequelize.define('ichairport',{
    airline:Sequelize.STRING,
    flightId:Sequelize.STRING,
    scheduleDateTime:Sequelize.STRING,
    estimatedDateTime:Sequelize.STRING,
    airport:Sequelize.STRING,
    chkinrange:Sequelize.STRING,
    gatenumber:Sequelize.STRING,
    carousel:Sequelize.STRING,
    exitnumber:Sequelize.STRING,
    remark:Sequelize.STRING,
    airportcode:Sequelize.STRING,
    terminalid:Sequelize.STRING,
    io:Sequelize.STRING
});

const domairsche =sequelize.define('domairsche',{
    airlineKorean:Sequelize.STRING,
    arrivalcity:Sequelize.STRING,
    domesticArrivalTime:Sequelize.STRING,
    domesticEddate:Sequelize.STRING,
    domesticStdate:Sequelize.STRING,
    domesticNum:Sequelize.STRING,
    domesticStartTime:Sequelize.STRING,
    startcity:Sequelize.STRING,
    domesticSun:Sequelize.STRING,
    domesticMon:Sequelize.STRING,
    domesticTue:Sequelize.STRING,
    domesticWed:Sequelize.STRING,
    domesticThu:Sequelize.STRING,
    domesticFri:Sequelize.STRING,
    domesticSat:Sequelize.STRING
});

const interairsche =sequelize.define('interairsche',{
    airlineKorean:Sequelize.STRING,
    airport:Sequelize.STRING,
    city:Sequelize.STRING,
    internationalEddate:Sequelize.STRING,
    internationalStdate:Sequelize.STRING,
    internationalIoType:Sequelize.STRING,
    internationalNum:Sequelize.STRING,
    internationalTime:Sequelize.STRING,
    internationalSun:Sequelize.STRING,
    internationalMon:Sequelize.STRING,
    internationalTue:Sequelize.STRING,
    internationalWed:Sequelize.STRING,
    internationalThu:Sequelize.STRING,
    internationalFri:Sequelize.STRING,
    internationalSat:Sequelize.STRING
});



module.exports = {
    sequelize:sequelize,
    User : User,
    Domairport:Domairport,
    Domairline:Domairline,
    Airport:air,
    Airportschedule:Airportschedule,
    Ichairport:ichairport,
    Domairsche:domairsche,
    Interairsche:interairsche,
    Reservation:Reservation
};
