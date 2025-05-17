const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articles');
const validateArticle = require('./middlewares/validateArticle');
const Article = require('./models/article');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');


// Initialize Express app FIRST
const app = express();

//middleware to parse JSON

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/articles', authMiddleware, articleRoutes); // Protect article routes






//Post with validation middleware
app.post('/api/articles', validateArticle, async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({error: 'server error while creating article' });
    }
})


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