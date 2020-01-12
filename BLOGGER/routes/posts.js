const { Router } = require('express');
const BlogPost = require('../models/blogPosts');
const auth = require('../middleware/auth');
const router = Router();

router.get('/:id/edit', auth, async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!req.query.allow) {
    return res.redirect('/');
  }
  res.render('post-edit', {
    title: `Редактировать пост ${blogPost.title}`,
    blogPost
  });
});

router.post('/edit', auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await BlogPost.findByIdAndUpdate(id, req.body);
  res.redirect('/');
});

router.delete('/remove/:id', auth, async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json(blogPost)
      .end();
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id).populate('userId', 'name');
  res.render('post', {
    layout: 'empty',
    title: `Пост ${blogPost.title}`,
    blogPost
  });
});

module.exports = router;
