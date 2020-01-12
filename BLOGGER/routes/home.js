const { Router } = require('express');
const BlogPost = require('../models/blogPosts');
const router = Router();

router.get('/', async (req, res) => {
  const blogPosts = await BlogPost.find().populate('userId', 'name');

  res.render('index', {
    title: 'Посты',
    blogPosts
  });
});

module.exports = router;
