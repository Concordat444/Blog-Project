import express from "express";

const app = express();
const port = 3000;
 
var catalogue = [new BlogPost(0, "test", "test")];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {catalogue: catalogue});
});

app.get("/newPost", (req, res) => {
    res.render("newPost.ejs");
  });

  app.post("/create", (req, res) => {
    console.log(req.body.postText);
    let blogPost = new BlogPost(catalogue.length, req.body.title, req.body.postText );
    catalogue.push(blogPost);
    res.redirect("/");
  });

  app.get('/viewPost/:postId', (req, res) => {
/*     res.render("newPost.ejs"); */
    console.log(req.params);
    res.render("viewPost.ejs", {blogPost: catalogue[req.params.postId]});
  });

  app.post("/delete/:postId", (req, res) => {
    catalogue.splice(catalogue.findIndex((element) => element.id === req.params.postId), 1);
    res.redirect("/");
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function BlogPost(id, title, content ){
    this.id = id;
    this.title = title;
    this.content = content;
}