const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articles');
const validateArticle = require('./middlewares/validateArticle');



const app = express();
app.use(express.json());
app.use(cors());

// POST with validation middleware

app.post('/api/articles', validateArticle)

//middleware to parse JSON
app.use(bodyParser.json());

//Route prefix: all article routes will start with /api/articles
app.use('/api/articles', articleRoutes);

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/blog_crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
   .catch(err => console.error('DB Connection Error:', err));


// Start the server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));