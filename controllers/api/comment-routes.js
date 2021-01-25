const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
// withAuth here

// Get all Comments
router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_body", "post_id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a comment
router.post("/", (req, res) => {
  Comment.create({
    comment_body: req.body.comment_body,
    // like the post route, the session id here will break the backend api posting
    // to restore the posting with insomnia, req.body.user_id must be used
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update a comment
// not sure if I will include this in the final product or not
// but this would allow a user to update or delete their comments
router.put("/:id", (req, res) => {
  Comment.update(
    {
      comment_body: req.body.comment_body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id." });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a comment
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
