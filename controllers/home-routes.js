const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage", {
    id: 1,
    post_title: "This is a new post!",
    post_body: "This new post is about things and stuff. Stuff is like this. But things are like this. Yada yada yada. Blah blah blah.",
    created_at: new Date(),
    comments: 30,
    user: {
      username: "test_user"
    }
  });
});

module.exports = router;
