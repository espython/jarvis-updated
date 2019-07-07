import express from 'express';

import { Comment } from '../../models';

const router = express.Router();

router.post('/comments', (req, res) => {
  Comment.create(
    { comment: req.body.commentText, author: req.body.author },
    function(err, comment) {
      if (err)
        return res
          .status(400)
          .json({ commentError: 'error while saving comment' });
      // saved!);
      console.log('post saved successfully', comment);
      res.json(comment);
    }
  );

  console.log('body', req.body);
});

/**
 * get posts route
 */
router.get('/comments/post/:id', (req, res) => {
  const { id } = req.params;
  console.log('id ==> ', id);
  try {
    const getPosts = async author => {
      const postsArray = await Comment.find({ author });
      res.json(postsArray);
    };
    getPosts(id);

    // res.json({ posts });
    // console.log('posts', posts);
  } catch (error) {
    console.log('find posts Errors', error);
  }
});

export default router;
