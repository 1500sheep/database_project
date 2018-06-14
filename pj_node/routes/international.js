const models = require('./models');
const async = require('async');
const parseString = require("xml2js").parseString;
var request = require('request');

//국제선1 -> router.get('international1')
exports.international1= (req,res)=>{
    var sess;
    sess = req.session;
    console.log("로그인 이름 :"+sess.name);
    res.render('booking/international1',
        {
            title:'Airport API with Nodejs',
            name:sess.name,
            interstatus:1
        }
    );
};


//국제선2 -> router.get('international2')
exports.international2= (req,res)=>{
    var sess;
    sess = req.session;
    console.log("이름 : "+sess.name);
    console.log("출발공항 : "+req.body.interdepart);
    console.log("도착공항: "+req.body.interarrive);
    console.log("출발 날짜 : "+req.body.departday);
    console.log("도착 날짜 : "+req.body.arriveday);


    async.series([
        function(callback){
            models.Airportschedule.findAndCountAll({
                where:{
                    boardingKor:req.body.interdepart,
                    arrivedKor:req.body.interarrive
                }
            }).then(function(resultA){
                if(!resultA){
                    res.redirect('booking/international1');
                }
                console.log("국제 공항 갯수A :  "+resultA.count);
                console.log("국제 공항 갯수A :  "+resultA.rows);
                callback(null,resultA);
            })
        },
        function(callback){
            models.Airportschedule.findAndCountAll({
                where:{
                    boardingKor:req.body.interarrive,
                    arrivedKor:req.body.interdepart
                }
            }).then(function(resultB){
                if(!resultB){
                    res.redirect('booking/international1');
                }
                console.log("국제 공항 갯수B :  "+resultB.count);
                callback(null,resultB);
            })
        }
    ],function(error,results){
        if(error){
            console.log("Error : "+error);
            res.redirect('booking/international1');
        }
        console.log("여기 나오는가?: "+results);


        console.log("1111 : "+results[0].rows);


        console.log("2222 : "+results[1]);
        res.render('booking/international2',{
            title:'Airport API with Nodejs',
            name:sess.name,
            interstatus:2,
            go:results[0].count,
            back:results[1].count,
            depart:results[0].rows,
            arrive:results[1].rows
        });
    });


};

