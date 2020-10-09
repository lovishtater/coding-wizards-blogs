//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const {
  functions
} = require("lodash");

const homeStartingContent = " Hey guys, we have created this channel to provide quality education to students who want to learn, grow and do something beautiful with their life. In return we want you to do the same to your juniors and help the youth of this nation to find its right path.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContents: homeStartingContent,
    newPost: posts
  });
});


app.get("/about", function (req, res) {
  res.render("about", {
    aboutContents: aboutContent
  });
});

// app.get("/contact", function (req, res) {
//   res.render("contact", {
//     contactContents: contactContent
//   });
// });


app.get("/compose", function (req, res) {
  res.render("compose", {});

});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.titleText,
    content: req.body.contentText,
    date: req.body.dateText,
    author: req.body.authorName
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestTitle = _.kebabCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.kebabCase(post.title);
    console.log(storedTitle);
    if (requestTitle == storedTitle) {
      res.render("posts", {
        title: post.title,
        content: post.content,
        date: post.date,
        author: post.author
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});