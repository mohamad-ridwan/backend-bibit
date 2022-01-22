const category = require('../models/category')

exports.post = (req, res, next) => {
    const id = req.body.id

    const post = new category({
        id: id,
        data: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: "berhasil di post",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postData = (req, res, next) => {
    const _id = req.params._id

    // date
    const nameMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const dateNumber = new Date().getDate().toString().length === 1 ? `0${new Date().getDate()}` : new Date().getDate()
    const month = new Date().getMonth()
    const years = new Date().getFullYear()

    const id = `${new Date().getTime()}`
    const title = req.body.title
    const date = `${nameMonth[month]} ${dateNumber}, ${years}`
    const image = req.file.path
    const kontenUtama = req.body.kontenUtama
    const kontenDetail = req.body.kontenDetail
    const categoryReq = req.body.category
    const checkCategory = categoryReq.includes(',') ? categoryReq.split(',')[0] : categoryReq
    const path = `${checkCategory.toLowerCase()}/${req.body.path.split(' ').join('-').toLowerCase()}`

    const data = [
        {
            id: id,
            title: title,
            date: date,
            image: image,
            kontenUtama: kontenUtama,
            kontenDetail: kontenDetail,
            category: categoryReq,
            path: path
        }
    ]

    category.updateOne(
        { _id: _id },
        { $push: { data: { $each: data, $position: 0 } } }
    )
        .then(result => {
            res.status(201).json({
                message: "data category berhasil di post",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putData = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const title = req.body.title
    const image = req.file.path
    const kontenUtama = req.body.kontenUtama
    const kontenDetail = req.body.kontenDetail
    const categoryReq = req.body.category
    const path = `${categoryReq.toLowerCase()}/${req.body.path.split(' ').join('-').toLowerCase()}`

    const updateDocumentTitle = {
        $set: { "data.$.title": title }
    }
    const updateDocumentImage = {
        $set: { "data.$.image": image }
    }
    const updateDocumentKontenUtama = {
        $set: { "data.$.kontenUtama": kontenUtama }
    }
    const updateDocumentKontenDetail = {
        $set: { "data.$.kontenDetail": kontenDetail }
    }
    const updateDocumentCategory = {
        $set: { "data.$.category": categoryReq }
    }
    const updateDocumentPath = {
        $set: { "data.$.path": path }
    }

    async function update(document) {
        return await new Promise((resolve, reject) => {
            category.updateOne({ _id: _id, "data.id": id }, document)
                .then(result =>resolve('sukses'))
                .catch(err=>reject('error'))
        })
    }

    return update(updateDocumentTitle)
        .then(result => {
            update(updateDocumentImage)
                .then(result => {
                    update(updateDocumentKontenUtama)
                        .then(result => {
                            update(updateDocumentKontenDetail)
                                .then(result => {
                                    update(updateDocumentCategory)
                                        .then(result => {
                                            update(updateDocumentPath)
                                                .then(result => {
                                                    res.status(201).json({
                                                        message: "data category berhasil di update",
                                                        status: result
                                                    })
                                                })
                                        })
                                })
                        })
                })
        })
        .catch(err=>console.log(err))
}

exports.getAll = (req, res, next)=>{
    let totalItems

    category.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return category.find()
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