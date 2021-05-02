const router = require('express').Router()
const multer = require("multer")

const Blog = require("./blog.model")


// STORAGE MULTER CONFIG (inside Helper file)
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")

//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031 

router.post("/uploadfiles", async (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, 
                        url: res.req.file.path, 
                        fileName: res.req.file.filename 
                    })
    })
})

router.post("/createPost", async (req, res) => {
    const blog = new Blog({ 
        content: req.body.content, 
        auhtorId: req.body.userID 
    })

    try {
        const postInfo = await blog.save()
        res.status(200).json({ success: true, postInfo })

    } catch (err) {
        res.status(500).send({ errors: err })
    }

    //생각 해보니  세이브 할떄 populate 할필요가 없다.   가져올떄 하면 되니깐...
    // blog.save((err, response) => {
    //     if (err) return res.json({ success: false, err });
    //     Blog.find({ _id: response._id })
    //         .populate('writer')
    //         .exec((err, result) => {
    //             let postInfo = result[0]
    //             if (err) return res.json({ success: false, err });
    //             return res.status(200).json({ success: true,  postInfo });
    //         })
    // })
})


router.get("/getBlogs", async (req, res) => {
    try {
        const blogs = await Blog.find()
                                .populate("writer")
        res.status(200).json({ success: true, blogs })

    } catch (err) {
        res.status(400).send(err)
    }
})

router.post("/getPost", async (req, res) => {
    try {
        const post = await Blog.findById( req.body.postId )
                                .populate('writer')
        res.status(200).json({ success: true, post })

    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router
