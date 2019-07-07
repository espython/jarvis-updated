import express from 'express'

import { Post } from '../../models'

const router = express.Router()

router.post('/post', (req, res) => {
  Post.create({ post: req.body.postText, author: req.body.author }, function (
    err,
    post
  ) {
    if (err) return res.status(400).json({ post: 'error save post' })
    // saved!);
    console.log('post saved successfully', post)
    res.json(post)
  })

  console.log('body', req.body)
})

/**
 * get posts route
 */
router.get('/posts/user/:id', (req, res) => {
  const { id } = req.params
  // console.log('id ==> ', id);
  try {
    const getPosts = async author => {
      const postsArray = await Post.find({ author })
      res.json(postsArray)
    };
    getPosts(id)

    // res.json({ posts });
    // console.log('posts', posts);
  } catch (error) {
    console.log('find posts Errors', error)
  }
})

/**
 * get posts route
 */
router.get('/posts/', (req, res) => {
  // console.log('id ==> ', id);
  try {
    const getPosts = async () => {
      const postsArray = await Post.find({})
      res.json(postsArray)
    };
    getPosts()

    // res.json({ posts });
    // console.log('posts', posts);
  } catch (error) {
    console.log('find posts Errors', error)
  }
})

export default router
