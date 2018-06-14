const models = require('./models');
const async = require('async');
const parseString = require("xml2js").parseString;
var request = require('request');
const requestapi = require('./requestapi');
const controller = require('./user.controller');

exports.airports1 = (req,res)=>{
    var sess;
    sess = req.session;
    console.log("로그인 이름 :"+sess.name);
    res.render('airports1',
        {
            title:'Airport API with Nodejs',
            name:sess.name,
            airportstatus:2
        }

    );
}

exports.airports2 = (req,res)=>{
    var sess;
    sess = req.session;
    console.log("로그인 이름 :"+sess.name);
    console.log("pick date  :"+req.body.pickdate);

    async.series(
        [
            function(callback){
                controller.convertdate(req.body.pickdate,callback);
            }
        ]
        ,function(error,result){
            if(error){
                console.log(error);
                res.redirect('airports1');
            }
            models.Ichairport.findAndCountAll({
                where:{
                    scheduleDateTime:{
                        $like:result+'%'
                    }
                }
            }).then(function(results){
                if(!results){
                    res.redirect('airports1');
                }
                console.log("갯수 :  "+results.count);
                res.render('airports2',{
                    title:'Airport API with Nodejs',
                    name:sess.name,
                    airportstatus:3,
                    count:results.count,
                    info:results.rows
                });
            })

    });
}