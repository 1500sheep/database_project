const models = require('./models');
const PDFDocument = require('pdfkit');

//예약 확인 -> router.get('/checkreservation')
exports.checkreservationGet=(req,res)=>{
    var sess;
    sess = req.session;
    models.Reservation.findAndCountAll({
        where:{
            name:sess.name
        }
    }).then(function(info){
        if(!info){
            res.render('index',
                {
                    title:'Airport API with Nodejs',
                    name : sess.name
                });
        }
        console.log("나와라 : "+JSON.stringify(info.rows));
        res.render('checkreserv',{
            reservation:info.rows,
            count:info.count,
            name:sess.name
        });

    })
};

exports.getPdf = (req, res) => {
    const doc = new PDFDocument;
    var filename = 'my_trip_plan';
    filename = encodeURIComponent(filename) + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    const content = "에어부산\t\t\t김해\t18.06.15\t08:25\t김포\t18.06.15\t07:30\t64000\tBX8803" +
        "\n\n에어부산\t\t\t김포\t18.06.23\t09:55\t김해\t18.06.23\t09:00\t64000\tBX8804" +
        "\n\n제주항공\t\t\t김포\t18.06.20\t08:50\t제주\t18.06.20\t07:40\t67600\t7C140" +
        "\n\n제주항공\t\t\t제주\t18.06.23\t12:30\t김포\t18.06.23\t11:20\t59100\t7C113\n\n";
    const total = '\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t총 예상 비용:\t254700 원';

    doc.font('./public/fonts/aBlackM.ttf').fontSize(30);
    doc.text('똘순이 님의 비행 스케줄', 140, 50);

    doc.fontSize(12).text(' 항공사       도착    날짜     시간    출발     날짜     시간     가격    항공번호', 60, 160);
    doc.text(content+total, 50, 190);

    doc.save()
        .rect(30, 150, 550, 200)
        .stroke();

    doc.save()
        .moveTo(45, 177)
        .lineTo(550, 177)
        .stroke();

    doc.pipe(res);
    doc.end();
};

exports.checkreservationPost=(req,res)=>{
    var sess;
    sess = req.session;
    console.log("나오나 ? "+req.body.choosedepart);
    console.log("나오나 ? "+req.body.choosearrive);
    models.Reservation.create(
        {
            name:sess.name,
            departInfo:req.body.choosedepart,
            arriveInfo:req.body.choosearrive
        }).then(function(){
        res.render('index',
            {
                title:'Airport API with Nodejs',
                name : sess.name
            });
    })
};
