const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Load content from JSON file
const contentFilePath = path.join(__dirname, 'content.json');
const siteContent = JSON.parse(fs.readFileSync(contentFilePath, 'utf8'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to make site content available to all templates
app.use((req, res, next) => {
  res.locals.content = siteContent;
  next();
});

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
