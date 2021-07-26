const router = require('express').Router();
const verify = require('../verifyToken');

const Post = require('../model/Post');

router.get('/', verify ,(req, res) => {
    Post.find({}, function(err, post) {
        var postMap = {};
    
        post.forEach(function(p) {
          postMap[p._id] = p;
        });
        res.send(postMap);
    });
});

router.post('/new', verify , async(req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        url: req.body.url,
        created_on: req.body.created_on,
    });

    try {
        const savedUser = await post.save();
        res.send(
            {
                userID: savedUser.id,
                status: 'Post created'
            }
        );
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:url',verify,async(req, res)=>{
    try {
        const result = await Post.deleteOne({"url": req.params.url});
        if(result) {
            res.status(200).send('Post Deleted');
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;