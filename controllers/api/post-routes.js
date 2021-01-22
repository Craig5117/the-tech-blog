const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
// withAuth here

// get all posts
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
      //     {
      //         model: Comment,
      //         attributes: {

      //         }
      //     }
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one post
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
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
        //     {
        //         model: Comment,
        //         attributes: {
  
        //         }
        //     }
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


// create a post
router.post("/", (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    post_body: req.body.post_body,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post

// delete a post

module.exports = router;
