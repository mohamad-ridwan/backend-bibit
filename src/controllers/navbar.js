const navbar = require('../models/navbar')

exports.postLogoWeb = (req, res, next)=>{
    const id = req.body.id
    const image = req.file.path

    const post = new navbar({
        id: id,
        image: image
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: "logo web berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postMenuPage = (req, res, next)=>{
    const id = req.body.id
    const name = req.body.name
    const path = req.body.path

    const post = new navbar({
        id: id,
        name: name,
        path: path,
        menuCollapse: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: "menu page berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postMenuCollapse = (req, res, next)=>{
    const _id = req.params._id

    const name = req.body.name
    const path = req.body.path

    const data = {
        name: name,
        path: path
    }

    navbar.updateOne(
        {_id: _id},
        {$push: {menuCollapse: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: "menu collapse berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.putLogoWeb = (req, res, next)=>{
    const _id = req.params._id

    const image = req.file.path

    navbar.findById(_id)
    .then(post=>{
        if(!post){
            const err = new Error('data tidak ada')
            err.errorStatus = 404
            throw err
        }

        post.image = image

        return post.save()
    })
    .then(result=>{
        res.status(201).json({
            message: "logo web berhasil di update",
            data: result
        })
    })
    .catch(err=>next(err))
}

exports.getAll = (req, res, next)=>{
    let totalItems

    navbar.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return navbar.find()
    })
    .then(result=>{
        res.status(200).json({
            message: "data berhasil di dapat",
            data: result,
            totalData: totalItems
        })
    })
    .catch(err=>next(err))
}