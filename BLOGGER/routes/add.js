const { Router } = require('express');
const BlogPost = require('../models/blogPosts');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Добавить пост'
  });
});

router.post('/', auth, async (req, res) => {
  const blogPost = new BlogPost({
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    userId: req.user
  });

  try {
    await blogPost.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
