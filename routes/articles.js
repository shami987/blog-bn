const express = require('express');
const router = express.Router();
const Article = require('../models/article');


//create a new article
router.post('/', async (req, res) => {
    try {
        const artRes = await Article.create(req.body);
        res.status(201).json(artRes);
    }catch (err) {
        console.log(err)
        res.status(400).json({error: err.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const artRes = await Article.find();
        res.json(artRes);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

//Read a single article by ID
router.get('/:id', async (req, res) => {
try {
    const artRes= await Article.findById(req.params.id);
    if(!artRes) return res.status(404).json({ message: 'Not found' });
    res.json(artRes);
} catch (err) {
    res.status(500).json({ error: err.message });
}
})

//Update an article
router.put('/:id', async (req, res) => {
    try {
        const updated = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} //return the updated document
        );
        if(!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    }catch (err) {
        res.status(400).json({ error: err.message});
    }
});

//delete an article
router.delete('/:id', async (req, res) => {
    try {
        const artRes = await Article.findByIdAndDelete(req.params.id);
        if(!artRes) return res.status(404).json({message: 'Not found'});
        res.json({ message: 'article deleted'});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;