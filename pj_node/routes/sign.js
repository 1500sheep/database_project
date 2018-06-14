const models = require('./models');

exports.main= (req, res) => {
    var sess;
    sess = req.session;
    console.log("로그인 이름 :"+sess.name);
    res.render('index',{
        title:'Airport API with Nodejs',
        name:sess.name
    });
};

exports.index = (req, res) => {
    res.render('index',{title:'Airport API with Nodejs'});
};


//로그인 -> router.get('/signin')
exports.signinGet = (req,res)=>{

    res.render('signin',{title:'Airport API with Nodejs'});
};

//로그인 -> router.post('/signin')
exports.signinPost = (req,res)=>{

    var name = req.body.name || '';
    var password = req.body.password || '';

    // var sql = 'select * from user where name=\''+name+'\' and password='\''+password+'\'';
        models.User.findOne({
        where: {
            name: name
        }
    }).then(function(user){

        if(user==null){
            res.render('signin',{message:'Incorrect name'});
            return ;
        }
        if(user.password!=password){
            res.render('signin',{message:'Incorrect password'});
            return ;
        }
        req.session.name = name;

        console.log("로그인 name : "+name);
        res.render('index',
            {
                title:'Airport API with Nodejs',
                name : name
            });
    });



};


//로그아웃 -> router.get('/signout')
exports.signout = (req,res)=>{
    sess = req.session;
    if(sess.name){
        req.session.destroy(function(err){
            if(err){

                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/');
    }
};
//회원가입 -> router.get('/signup')
exports.signupGet = (req,res)=>{
    res.render('signup',{title:'Airport API with Nodejs'});
}

//회원가입 -> router.put('/signup')
exports.signupPost = (req,res)=>{

    var name = req.body.name || '';
    var password = req.body.password || '';
    console.log("name is : "+name+"\t password is : "+password);
    models.User.findOne({
        where: {
            name: name
        }
    }).then(function(user){
        if(user!=null){
            res.render('signin',{message:'The name already exists'});
            return ;
        }

        models.User.create(
            {
                name:name,
                password:password
            }).then(function(){
            res.render('signin',{message:'Sign Up Succeed'});
            return;
        })

    });
};


