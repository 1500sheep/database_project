var request = require('request');
var parseString = require('xml2js').parseString;
var async = require('async');

exports.getDatafromURL =function(url,callback){
    console.log("getAPIDate : "+url);
    request({
            url:url,
            method:'GET'
        },function(error,response,body) {
            console.log('Status', response.statusCode);
            var xml2 = body;
            parseString(xml2, function (error, result) {
                if (error) {
                    console.log("ERROR : " + error);
                    return;
                }
                var apidata = result.response.body[0].items[0];
                console.log("apidata is : "+apidata);
                console.log("apidata type is : "+apidata.length);
                callback(null,apidata);
            })
        }
    );
}

exports.getDatafromAPI = function(url,callback){
    var tasks = [
        function(callback){
            request({
                    url:url,
                    method:'GET'
                },function(error,response,body) {
                    console.log('Status', response.statusCode);
                    var xml2 = body;
                    parseString(xml2, function (error, result) {
                        if (error) {
                            console.log("ERROR : " + error);
                            return;
                        }
                        var temp = result.response.body[0].totalCount;
                        console.log("temp :"+temp);
                        if(temp==null){
                            return -1;
                        }
                        var totalCount = parseInt(temp)
                        callback(null,url+'&numOfRows='+totalCount);
                    })
                }
            );
        },

        function(data,callback){
            console.log("여기 값 나온다 : "+data);
            request({
                    url:data,
                    method:'GET'
                },function(error,response,body) {
                    console.log('Status', response.statusCode);
                    var xml2 = body;
                    parseString(xml2, function (error, result) {
                        if (error) {
                            console.log("ERROR : " + error);
                            return;
                        }
                        var apidata = result.response.body[0].items[0];
                        console.log("Get API Data : "+apidata.item[0].airlineNm);

                        callback(null,apidata);
                    })
                }
            );

        }
    ];
    async.waterfall(tasks,function(err,result){
        if(err)
            console.log(err);
        else
            console.log('성공!!'+result.item[0].airlineNm);
        callback(null,result);
    });
}