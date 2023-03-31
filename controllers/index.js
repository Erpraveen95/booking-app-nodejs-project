const User = require('../models/index')

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.status(200).json({ allUsers: users })
    }
    catch (err) {
        console.log("database fetch error", err)
        res.status(500).json({ error: err })

    }
}
exports.postUser = async (req, res, next) => {
    //console.log(req.body)
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    //console.log(name,email,phone,"test")
    try {
        const userDetails = await User.create({
            name: name,
            email: email,
            phone: phone
        })
        console.log('user details saved')
        res.status(201).json({ newUserDetails: userDetails })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err })

    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).json({ err: 'id is missing' })
        }
        await User.destroy({ where: { id: id } })
        res.status(2000)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}




