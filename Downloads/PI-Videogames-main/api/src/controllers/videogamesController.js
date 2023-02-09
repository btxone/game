require("dotenv").config();
const axios = require("axios");
const { KEY, URL } = process.env;
const { Genre, Videogame } = require("../db")

// 8=============================================D..  me traigo todo los video juegos de la api

const GetApiInfo = async () => {
    let apiVideogames = [];
    let page = 1;
    let perPage = 20;
  
    while (apiVideogames.length < 100) {
      let apiData = await axios.get(
        `${URL}/games?key=${KEY}&page=${page}&page_size=${perPage}`
      );
      apiVideogames = apiVideogames.concat(apiData.data.results);
      page++;
    }
  
    return apiVideogames.slice(0, 100).map(el => ({
      id: el.id,
      name: el.name,
      rating: el.rating,
      genres: el.genres.map(gen => gen.name),
      platforms: el.platforms.map(el => el.platform.name),
      image: el.background_image,
    }));
  };
  
  // 8=============================================D..  me traigo todos los video juegos de la DB

  const getDbInfo = async () => {
    try {
      const videoGames = await Videogame.findAll({
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
  
      return videoGames;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  

// 8=============================================D..  UNO LOS DOS PEDIDOS Y SE CONCATENAN EN UNO SOLO
const getAllInfo = async () => {
  const ApiInfo = await GetApiInfo();
  const DbInfo = await getDbInfo();
  const infoTotal = ApiInfo.concat(DbInfo);
  return infoTotal
};

// 8=============================================D..  solicitud por query de nombre a la API


const nameApi = async (name) => {
  try {
    const infoSearch = await axios({
      method: 'get',
      url: `${URL}/games?search=${name}&key=${KEY}`,
      headers: { "Accept-Encoding": "null" }
    });

    const vgSearch = infoSearch.data.results.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        rating: el.rating,
        platforms: el.platforms.map((el) => el.platform.name),
        genres: el.genres.map((el) => el.name),
      };
    });
    return vgSearch;
  } catch (e) {
    console.error(e);
  }
};

// 8=============================================D.. solicitud por query de nombre DB

const nameDb = async (name) => {
  try {
      const infodb = await getDbInfo();
      const infobyname = infodb.filter(videogame => videogame.name.includes(name))
      return infobyname;
  } catch (e) {
      console.error(e)
  }
};

// 8=============================================D.. uno mis solicitudes por query

const GetAllInfoByName = async (name) => {
  try {
      const apInfo = await nameApi(name);
      const DbInfo = await nameDb(name);
      const infoTotal = apInfo.concat(DbInfo);
      return infoTotal;
  } catch (e) {
      console.error(e);
  }
};

// 8=============================================D.. busqueda por id en API

const idApi = async (id) => {
  try {
      const rtaApi = await axios({
          url: `${URL}/games/${id}?key=${KEY}`,
          method: 'get',
          headers: { "Accept-Encoding": "null" }
      });
      const { data } = await rtaApi;
      console.log(data + "esta es mi data");
      const info = {
          id: data.id,
          name: data.name,
          image: data.background_image,
          genres: data.genres?.map(g => g.name),
          description: data.description,
          released: data.released,
          rating: data.rating,
          platforms: data.platforms?.map(el => el.platform.name)
      };
      return info;
  } catch (e) {
      console.error(e);
  }
};

// 8=============================================D.. busqueda por id en DB

const idDb = async (id) => {
  try {
      return await Videogame.findByPk(id, {
          include: [{
              model: Genre,
              atributes: ['name'],
              throught: {
                  attributes: []
              }
          }]
      });
  } catch (e) {
      console.error(e);
  }
};

// 8=============================================D.. uno las solicitudes por ID

const videogame = async (id) => {
  try {
      const infoIdDB = await idDb(id);
      if (infoIdDB) {
          return infoIdDB;
      }
      const infoIdApi = await idApi(id);
      return infoIdApi;
  } catch (e) {
      console.error(e);
  }
};

module.exports = {
  getAllInfo,
  getDbInfo,
  GetApiInfo,
  nameApi,
  videogame,
  GetAllInfoByName
};
