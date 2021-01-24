const router = require("express").Router();
const withAuth = require("../utils/auth");
const sequelize = require("../config/connection");
const { Post, Comment } = require("../models");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "post_title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
        ),
        "comment_count",
      ],
    ],
  })
  .then((dbPostData) => {
      // This maps dbPostData, strips out each post and reduces it to the necessary info with get({ plain true}) then returns a new array called posts
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  })
});

module.exports = router;