const express = require('express');
//Router Class로 Routing 코드를 모듈화 할 수 있다?!
const router = express.Router();
const async = require('async');
const controller = require('./user.controller');
const sign = require('./sign');
const domestic = require('./domestic');
const international = require('./international');
const airports = require('./airports');
const checkreserv = require('./checkreserv');
const request = require('request');
const parseString = require('xml2js').parseString;
const dt = new Date();
const models = require('./models');
var today;

var moment = require('moment');
today = moment().format("YYYY-MM-DD");

var totalCount;
var service_key = 'tkehIXMpknYbTSJ1eaKROgXcmEs987WG%2Bu%2F8IWJsWhx6Swi0Nff%2FaZXQy%2FriW5PGCv6bfI4t9DAzh1hmQkcEdA%3D%3D';
var urlschedule = 'http://openapi.airport.co.kr/service/rest/FlightStatusList/getFlightStatusList';
var urlschedule_ich_arr = 'http://openapi.airport.kr/openapi/service/StatusOfPassengerFlightsDS/getPassengerArrivalsDS';
var urlschedule_ich_depart = 'http://openapi.airport.kr/openapi/service/StatusOfPassengerFlightsDS/getPassengerDeparturesDS';
var queryParams = '?' + encodeURIComponent('ServiceKey')+'='+service_key;
console.log()

var task = [
    // function(callback){
    // console.log("1111111111111");
    //     models.Airportschedule.findOne({
    //             where:{
    //                 day:'2018-06-12'
    //             }
    //         },function(error,data){
    //         console.log("222222222222");
    //             if(error || !data){
    //                 console.log("ERROR : "+error);
    //                 callback(null,false);
    //             }else{
    //                 callback(null,true);
    //             }
    //     });
    // },
    function(callback){
        // console.log("안나오나??????"+data);
        // if(!data){
        //     console.log("할 필요 없음 "+data);
        //     callback(null,0);
        // }else{
            request({
                    url:urlschedule + queryParams,
                    method : 'GET'
                },function(error,response,body){
                    console.log('Status',response.statusCode);
                    //console.log('Response received : ',body);
                    var xml = body;
                    parseString(xml,function(error,result){
                        if(error) {
                            console.log("ERROR : " + error);
                            return;
                        }

                        totalCount = parseInt(result.response.body[0].totalCount);
                        console.log("totalCount : "+result.response.body[0].totalCount);
                        callback(null,totalCount);

                    });
                }
            )
        }
    ,
    function(data2,callback){
        if(data2){
            request({
                    url:urlschedule + queryParams+'&numOfRows='+data2,
                    method : 'GET'
                },function(error,response,body){
                    console.log('Status',response.statusCode);
                    //console.log('Response received : ',body);
                    var xml2 = body;
                    parseString(xml2,function(error,result){
                        if(error) {
                            console.log("ERROR : " + error);
                            return;
                        }
                        console.log("2nd values are : "+result.response.body[0].items[0].item[0].airFln);
                        for(var i=0;i<data2;i++){
                            var airfln =JSON.stringify(result.response.body[0].items[0].item[i].airFln);
                            var airlineenglish = JSON.stringify(result.response.body[0].items[0].item[i].airlineEnglish);
                            var airlinekorean = JSON.stringify(result.response.body[0].items[0].item[i].airlineKorean);
                            var airp = JSON.stringify(result.response.body[0].items[0].item[i].airport);
                            var arrivedeng=JSON.stringify(result.response.body[0].items[0].item[i].arrivedEng);
                            var arrivedkor=JSON.stringify(result.response.body[0].items[0].item[i].arrivedKor);
                            var boardingeng=JSON.stringify(result.response.body[0].items[0].item[i].boardingEng);
                            var boardingkor=JSON.stringify(result.response.body[0].items[0].item[i].boardingKor);
                            var ci=JSON.stringify(result.response.body[0].items[0].item[i].city);
                            var io2=JSON.stringify(result.response.body[0].items[0].item[i].io);
                            var line2=JSON.stringify(result.response.body[0].items[0].item[i].line);
                            var rmkeng=JSON.stringify(result.response.body[0].items[0].item[i].rmkEng);
                            var rmkkor=JSON.stringify(result.response.body[0].items[0].item[i].rmkKor);

                            airfln = airfln==null?null:airfln.substring(2,airfln.length-2);
                            airlineenglish = airlineenglish==null?null:airlineenglish.substring(2,airlineenglish.length-2);
                            airlinekorean = airlinekorean==null?null:airlinekorean.substring(2,airlinekorean.length-2);
                            airp = airp==null?null:airp.substring(2,airp.length-2);
                            arrivedeng = arrivedeng==null?null:arrivedeng.substring(2,arrivedeng.length-2);
                            arrivedkor = arrivedkor==null?null:arrivedkor.substring(2,arrivedkor.length-2);
                            boardingeng = boardingeng==null?null:boardingeng.substring(2,boardingeng.length-2);
                            boardingkor = boardingkor==null?null:boardingkor.substring(2,boardingkor.length-2);
                            ci= ci==null?null:ci.substring(2,ci.length-2);
                            io2 = io2==null?null:io2.substring(2,io2.length-2);
                            line2 = line2==null?null:line2.substring(2,line2.length-2);
                            rmkeng = rmkeng==null?null:rmkeng.substring(2,rmkeng.length-2);
                            rmkkor = rmkkor==null?null:rmkkor.substring(2,rmkkor.length-2);
                            console.log("airfln ",airfln);
                            console.log("airlineenglish ",airlineenglish);
                            console.log("airlinekorean ",airlinekorean);
                            console.log("airp ",airp);
                            console.log("arrivedeng ",arrivedeng);
                            console.log("arrivedkor ",arrivedkor);
                            console.log("boardingeng ",boardingeng);
                            console.log("boardingkor ",boardingkor);
                            console.log("ci ",ci);
                            console.log("io2 ",io2);
                            console.log("line2 ",line2);
                            console.log("rmkeng ",rmkeng);
                            console.log("rmkkor ",rmkkor);
                            models.Airportschedule.create({
                                airFln:airfln,
                                airlineEnglish:airlineenglish,
                                airlineKorean:airlinekorean,
                                airport:airp,
                                arrivedEng:arrivedeng,
                                arrivedKor:arrivedkor,
                                boardingEng:boardingeng,
                                boardingKor:boardingkor,
                                city:ci,
                                etd:parseInt(result.response.body[0].items[0].item[i].etd),
                                gate:result.response.body[0].items[0].item[i].gate==null?-1:parseInt(result.response.body[0].items[0].item[i].gate),
                                io:io2,
                                line:line2,
                                rmkEng:rmkeng,
                                rmkKor:rmkkor,
                                std:parseInt(result.response.body[0].items[0].item[i].std),
                                day:today.toString()
                            });
                    }


                        callback(null,"Done");
                    });
                }
            )
        }else{
           callback(null,'Nothing');
        }
    }

];


var task_ich = [
    function(callback){
        request({
                url:urlschedule_ich_depart + queryParams,
                method : 'GET'
            },function(error,response,body){
                console.log('Status',response.statusCode);
                //console.log('Response received : ',body);
                var xml2 = body;
                parseString(xml2,function(error,result){
                    if(error) {
                        console.log("ERROR : " + error);
                        return;
                    }
                    console.log("2nd values are : "+result.response.body[0].items[0].item[0].airline);
                    for(var i=0;i<200;i++){
                        var airline =JSON.stringify(result.response.body[0].items[0].item[i].airline);
                        var airport = JSON.stringify(result.response.body[0].items[0].item[i].airport);
                        var airportcode = JSON.stringify(result.response.body[0].items[0].item[i].airportcode);
                        var chkinrange = JSON.stringify(result.response.body[0].items[0].item[i].chkinrange);
                        var estimatedDateTime=JSON.stringify(result.response.body[0].items[0].item[i].estimatedDateTime);
                        var flightId=JSON.stringify(result.response.body[0].items[0].item[i].flightId);
                        var gatenumber=JSON.stringify(result.response.body[0].items[0].item[i].gatenumber);
                        var remark=JSON.stringify(result.response.body[0].items[0].item[i].remark);
                        var scheduleDateTime=JSON.stringify(result.response.body[0].items[0].item[i].scheduleDateTime);
                        var terminalId=JSON.stringify(result.response.body[0].items[0].item[i].terminalId);

                        airline= airline==null?null:airline.substring(2,airline.length-2);
                        airport= airport==null?null:airport.substring(2,airport.length-2);
                        airportcode= airportcode==null?null:airportcode.substring(2,airportcode.length-2);
                        chkinrange= chkinrange==null?null:chkinrange.substring(2,chkinrange.length-2);
                        estimatedDateTime= estimatedDateTime==null?null:estimatedDateTime.substring(2,estimatedDateTime.length-2);
                        flightId= flightId==null?null:flightId.substring(2,flightId.length-2);
                        gatenumber= gatenumber==null?null:gatenumber.substring(2,gatenumber.length-2);
                        remark= remark==null?null:remark.substring(2,remark.length-2);
                        scheduleDateTime= scheduleDateTime==null?null:scheduleDateTime.substring(2,scheduleDateTime.length-2);
                        terminalId= terminalId==null?null:terminalId.substring(2,terminalId.length-2);

                        models.Ichairport.create({
                            airline:airline,
                            flightId:flightId,
                            scheduleDateTime:scheduleDateTime,
                            estimatedDateTime:estimatedDateTime,
                            airport:airport,
                            chkinrange:chkinrange,
                            gatenumber:gatenumber,
                            carousel:null,
                            exitnumber:i,
                            remark:remark,
                            airportcode:airportcode,
                            terminalid:terminalId,
                            io:"출발"
                        });
                    }

                    callback(null,"Done");
                });
            }
        )
    }
    ,
    function(data2,callback){
        if(data2){
            request({
                    url:urlschedule_ich_arr + queryParams,
                    method : 'GET'
                },function(error,response,body){
                    console.log('Status',response.statusCode);
                    //console.log('Response received : ',body);
                    var xml2 = body;
                    parseString(xml2,function(error,result){
                        if(error) {
                            console.log("ERROR : " + error);
                            return;
                        }
                        console.log("2nd values are : "+result.response.body[0].items[0].item[0].airline);
                        for(var i=0;i<200;i++){
                            var airline =JSON.stringify(result.response.body[0].items[0].item[i].airline);
                            var airport = JSON.stringify(result.response.body[0].items[0].item[i].airport);
                            var airportcode = JSON.stringify(result.response.body[0].items[0].item[i].airportcode);
                            var chkinrange = JSON.stringify(result.response.body[0].items[0].item[i].chkinrange);
                            var estimatedDateTime=JSON.stringify(result.response.body[0].items[0].item[i].estimatedDateTime);
                            var flightId=JSON.stringify(result.response.body[0].items[0].item[i].flightId);
                            var gatenumber=JSON.stringify(result.response.body[0].items[0].item[i].gatenumber);
                            var remark=JSON.stringify(result.response.body[0].items[0].item[i].remark);
                            var scheduleDateTime=JSON.stringify(result.response.body[0].items[0].item[i].scheduleDateTime);
                            var terminalId=JSON.stringify(result.response.body[0].items[0].item[i].terminalId);

                            airline= airline==null?null:airline.substring(2,airline.length-2);
                            airport= airport==null?null:airport.substring(2,airport.length-2);
                            airportcode= airportcode==null?null:airportcode.substring(2,airportcode.length-2);
                            chkinrange= chkinrange==null?null:chkinrange.substring(2,chkinrange.length-2);
                            estimatedDateTime= estimatedDateTime==null?null:estimatedDateTime.substring(2,estimatedDateTime.length-2);
                            flightId= flightId==null?null:flightId.substring(2,flightId.length-2);
                            gatenumber= gatenumber==null?null:gatenumber.substring(2,gatenumber.length-2);
                            remark= remark==null?null:remark.substring(2,remark.length-2);
                            scheduleDateTime= scheduleDateTime==null?null:scheduleDateTime.substring(2,scheduleDateTime.length-2);
                            terminalId= terminalId==null?null:terminalId.substring(2,terminalId.length-2);

                            models.Ichairport.create({
                                airline:airline,
                                flightId:flightId,
                                scheduleDateTime:scheduleDateTime,
                                estimatedDateTime:estimatedDateTime,
                                airport:airport,
                                chkinrange:chkinrange,
                                gatenumber:gatenumber,
                                carousel:null,
                                exitnumber:i,
                                remark:remark,
                                airportcode:airportcode,
                                terminalid:terminalId,
                                io:"도착"
                            });
                        }


                        callback(null,"Done");
                    });
                }
            )
        }else{
            callback(null,'Nothing');
        }
    }

];

// async.waterfall(task_ich,function(err,results) {
//     console.log("Result : "+results)
// });

//3600000 60분을 의미함
setInterval(checkday,5000);

function checkday(){
    console.log("It's calling");
    // if(today!=moment().format("YYYY-MM-DD")){
    //     today = moment().format("YYYY-MM-DD")
    //     console.log("Today just changed : "+today);
    //     async.series(task,function(err,results){
    //         console.log(results);
    //     });
    // }
}


//최초페이지
router.get('/',sign.index);

router.get('/main',sign.main);

//로그인
router.get('/signin',sign.signinGet);

//로그인 Post
router.post('/signin',sign.signinPost);

//로그아웃
router.get('/signout', sign.signout);

//회원가입
router.get('/signup',sign.signupGet);

//회원가입
router.post('/signup',sign.signupPost);

//예약확인
router.get('/checkreservation',checkreserv.checkreservationGet);

//예약확인
router.post('/checkreservation',checkreserv.checkreservationPost);

//print pdf
router.post('/pdf', checkreserv.getPdf);

//국내선1
router.get('/domestic1',domestic.domestic1);

//국내선2
router.post('/domestic2',domestic.domestic2);

//국제선1
router.get('/international1',international.international1);

//국제선2
router.post('/international2',international.international2);

//공항 스케줄1
router.get('/airports1',airports.airports1);

//공항 스케줄2
router.post('/airports2',airports.airports2);

module.exports = router;
