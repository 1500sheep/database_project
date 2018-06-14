const models = require('./models');
const async = require('async');
const parseString = require("xml2js").parseString;
const request = require('request');
const requestapi = require('./requestapi');
const controller = require('./user.controller');
var urlDom = 'http://openapi.tago.go.kr/openapi/service/DmstcFlightNvgInfoService/getFlightOpratInfoList';
var service_key_dom = 'tkehIXMpknYbTSJ1eaKROgXcmEs987WG%2Bu%2F8IWJsWhx6Swi0Nff%2FaZXQy%2FriW5PGCv6bfI4t9DAzh1hmQkcEdA%3D%3D';
var queryParams = '?' + encodeURIComponent('ServiceKey')+'='+service_key_dom;

//국내선1 -> router.get('/domestic1')
exports.domestic1 = (req,res)=>{
    var sess;
    sess = req.session;
    console.log("로그인 이름 :"+sess.name);
    res.render('booking/domestic1',
        {
            title:'Airport API with Nodejs',
            name:sess.name,
            domstatus:1
        }

    );

};

//국내선2 -> router.get('domestic2')
exports.domestic2 = (req,res)=>{
    var sess;
    sess = req.session;
    console.log("출발 날짜 : "+req.body.departday);
    console.log("도착 날짜 : "+req.body.arriveday);
    console.log("출발 공항 : "+req.body.departairport);
    console.log("도착 공항 : "+req.body.arriveairport);

    var departairport = req.body.departairport;
    var arriveairport = req.body.arriveairport;


    console.log("is coming? : "+sess.name);
    async.series([
        function(callback){
            controller.convertdate(req.body.departday,callback);
        },
        function (callback) {
            controller.convertdate(req.body.arriveday,callback);
        }
    ],function(error,results){
        if(error) console.log(error);
        //왕복 데이터 다 받아오기
        console.log("첫 번째 결과 : "+results[0]);
        console.log("첫 번째 결과2 : "+results[1]);
        var depart_data = urlDom+queryParams+'&depPlandTime='+results[0]+'&depAirportId='+departairport+'&arrAirportId='+arriveairport;
        var arrive_data = urlDom+queryParams+'&depPlandTime='+results[1]+'&depAirportId='+arriveairport+'&arrAirportId='+departairport;

        async.series([
            function(callback){
                console.log("departurl : "+depart_data);
                requestapi.getDatafromAPI(depart_data,callback);
            },
            function(callback){
                console.log("arriveurl : "+arrive_data);
                requestapi.getDatafromAPI(arrive_data,callback);
            }
        ],function(error,fresults){
            if(error) console.log(error);
            console.log("두 번째 결과 : "+fresults[0].item[1].airlineNm);
            console.log("두 번째 결과2 : "+fresults[1].item.length);

            res.render('booking/domestic2',
                {
                    title:'Airport API with Nodejs',
                    name : sess.name,
                    depart:fresults[0],
                    arrive:fresults[1],
                    domstatus:2
                });

        });
    });
};

