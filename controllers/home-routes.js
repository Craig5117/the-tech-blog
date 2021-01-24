const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "post_title",
      "post_body",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
        ),
        "comment_count",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // This maps dbPostData, strips out each post and reduces it to the necessary info with get({ plain true}) then returns a new array called posts
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login', {
    formTitle: 'Login',
    elementId: 'login-form',
    buttonText: 'Login!',
    linkText: 'Sign up instead',
    link: '/signup'
  });
});

router.get('/signup', (req, res) => {
  res.render('sign-up', {
    formTitle: 'Sign up',
    elementId: 'signup-form',
    buttonText: 'Sign up!',
    linkText: 'Login instead',
    link: '/login'
  });
});



module.exports = router;
