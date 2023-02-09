const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { videogame } = require('../controllers/videogamesController');
const { Videogame, Genre } = require('../db');

const router = Router();

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = await videogame(id);

    if (data) {
        return res.json(data);
    } else {
        return res.status(404).json({ error: 'El id ingresado no coincide con un videojuego en particular' });
    }
});

router.post('/', async (req, res, next) => {
    const { name, image, genres, released, rating, platforms, description } = req.body;
    const newVideogame = await Videogame.create({
        id: uuidv4(),
        name,
        image,
        genres,
        released,
        rating,
        platforms,
        description,
        createdInDb: true,
    });

    const genre = await Genre.findOne({
        where: { name: genres },
    });

    await newVideogame.addGenre(genre);
    return res.json(newVideogame);
});

module.exports = router;
