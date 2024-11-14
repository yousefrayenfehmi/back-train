
const pool = require('../connection_base/connection');  // Importer la connexion à la base de données

const getAllGares = async () => {
  try {
    const result = await pool.query('SELECT * FROM gares');
    console.log(result);
    
    return result.rows;  // Retourner les gares sous forme de tableau
  } catch (err) {
    console.error('Erreur lors de la récupération des gares:', err);
    throw err;
  }
};
const getCoordinatesByGareName = async (gareName) => {
    console.log(gareName);
    
    try {
      const query = 'SELECT latitude, longitude FROM gares WHERE nom = $1';
      const result = await pool.query(query, [gareName]);
      
      if (result.rows.length > 0) {
        return result.rows[0]; // Retourne la première ligne contenant les coordonnées
      } else {
        throw new Error(`Gare ${gareName} non trouvée`);
      }
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des coordonnées de la gare: ${error.message}`);
    }
  };
const getGareById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM gares WHERE id = $1', [id]);
    return result.rows[0];  // Retourner la gare trouvée
  } catch (err) {
    console.error('Erreur lors de la récupération de la gare:', err);
    throw err;
  }
};

const addGare = async (nom, latitude, longitude) => {
  try {
    const result = await pool.query(
      'INSERT INTO gares (nom, latitude, longitude) VALUES ($1, $2, $3) RETURNING *',
      [nom, latitude, longitude]
    );
    return result.rows[0];  // Retourner la gare ajoutée
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la gare:', err);
    throw err;
  }
};

const updateGare = async (id, nom, latitude, longitude) => {
  try {
    const result = await pool.query(
      'UPDATE gares SET nom = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *',
      [nom, latitude, longitude, id]
    );
    return result.rows[0];  // Retourner la gare mise à jour
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la gare:', err);
    throw err;
  }
};

const deleteGare = async (id) => {
  try {
    const result = await pool.query('DELETE FROM gares WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];  // Retourner la gare supprimée
  } catch (err) {
    console.error('Erreur lors de la suppression de la gare:', err);
    throw err;
  }
};

module.exports = {
  getAllGares,
  getGareById,
  addGare,
  updateGare,
  deleteGare,
  getCoordinatesByGareName
};
