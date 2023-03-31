const Sequelize = require('sequelize')

const sequelize = new Sequelize('booking-app','root','Gautam@123',{   
    dialect:'mysql',
    host:'localhost',
    define: {
        timestamps: false
    }
})

module.exports =  sequelize