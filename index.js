import express from "express";

const app = express();
const port = 3000;
 
var catalogue = new Map();
catalogue.set(0 , new BlogPost(0 , 'test', 'test'));
var totalPostCount = catalogue.size;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {catalogue: catalogue});
});

app.get("/newPost", (req, res) => {
    res.render("newPost.ejs");
  });

  app.post("/create", (req, res) => {
    let blogPost = new BlogPost( totalPostCount, req.body.title, req.body.postText );
    catalogue.set(totalPostCount, blogPost);
    console.log(blogPost);
    totalPostCount++;
    res.redirect("/");
  });

  app.get('/viewPost/:postId', (req, res) => {
    console.log(req.params.postId);
    let target = catalogue.get(Number(req.params.postId));
    res.render("viewPost.ejs", {blogPost: target});
  });

  app.post("/delete/:postId", (req, res) => {
    console.log(req.params);
    catalogue.delete(Number(req.params.postId));
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