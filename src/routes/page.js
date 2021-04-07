const router = require("express").Router();
const verify = require("./verifyToken")

router.get("/", verify, (req, res) => {
  res.json({ posts: { title: "test", des: "more test" } });
});

module.exports = router;
