const { Router } = require('express');
require('dotenv').config();
const { getDbInfo, GetApiInfo, nameApi, getAllInfo, GetAllInfoByName } = require('../controllers/videogamesController');

const router = Router();

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  let allVideogames = await getAllInfo();

  if (name) {
    try {
      const allResults = await GetAllInfoByName(name);
      allResults.length
        ? res.status(200).json(allResults.slice(0, 15))
        : res.status(400).json('No hay un videojuego con dicho nombre');
    } catch (err) {
      next(err);
    }
  } else {
    res.json(allVideogames);
    return;
  }
});

router.get('/api', async (req, res, next) => {
  try {
    const allVideogames = await GetApiInfo();
    res.status(200).json(allVideogames);
  } catch (err) {
    next(err);
  }
});

router.get('/db', async (req, res, next) => {
  try {
    const allVideogames = await getDbInfo();
    res.status(200).json(allVideogames);
  } catch (err) {
    next(err);
  }
});

router.get('/platforms', async (req, res, next) => {
  try {
    const all = await GetApiInfo();
    const allPlatforms = [];
    all.map((g) =>
      g.platforms.map((p) => {
        if (!allPlatforms.includes(p)) {
          allPlatforms.push(p);
        }
      })
    );

    allPlatforms.length
      ? res.status(200).json(allPlatforms)
      : res.status(404).json('Error');
  } catch (e) {
    next(e);
  }
});



// router.get("/", async (req, res) => {
//   let { name } = req.query;
//   try {
//     res.status(200).json(await nameApi(name));
//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// });


module.exports = router;
