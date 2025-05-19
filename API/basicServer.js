const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

// creating http server
const server = http.createServer((req, res) => {
  const url = req.url;

  // defining the file path of my index.html file
  let filePath = path.join(
    __dirname,
    "public",
    url === "/" ? "index.html" : url
  ); //if req.url is equal to '/' path should lead to index.html else go to the file that matches the url
  // eg: /gallery goes to public/gallery.html

  const ext = path.extname(filePath); // find the extention of the filePath
  let contentType = "text/html";
  // defining the contentType based on the filePath
  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    case ".json":
      contentType = "application/json";
      break;

    case ".png":
      contentType = "image/png";

    case ".jpg":
      contentType = "image/jpg";
      break;

    default:
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end("<h1> 404 Not Found</h1>");
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
      });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log("Server running on port", port);
});
