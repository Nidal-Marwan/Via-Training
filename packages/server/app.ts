const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();
if (process.env.NODE_ENV) {
  app.use(express.static(path.join(__dirname, "build")));
} else {
  app.use(express.static(path.join(__dirname, "public")));
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
