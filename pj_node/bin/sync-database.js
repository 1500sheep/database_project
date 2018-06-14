const models = require('../routes/models');

module.exports= () =>{
    return models.sequelize.sync({force:false});
}
