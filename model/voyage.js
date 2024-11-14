// models/voyage.js
const pool = require('../connection_base/connection'); 

// Créer un voyage
const createVoyage = async (gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train) => {
  const query = `
    INSERT INTO voyages (gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];  // Retourne le voyage créé
  } catch (error) {
    throw error;
  }
};
const findVoyagesByGares = async (depart, arrivee) => {
    const query = `
      SELECT v.id, g1.nom AS gare_depart, g2.nom AS gare_arrivee, v.horaire_depart, v.horaire_arrivee, v.prix, v.train
      FROM voyages v
      JOIN gares g1 ON v.gare_depart_id = g1.id
      JOIN gares g2 ON v.gare_arrivee_id = g2.id
      WHERE g1.nom = $1 AND g2.nom = $2;
    `;
  
    try {
      const result = await pool.query(query, [depart, arrivee]);
      return result.rows; // Retourne tous les voyages correspondants
    } catch (error) {
      throw error;
    }
  };

// Lire tous les voyages
const getAllVoyages = async () => {
  const query = `
    SELECT v.id, g1.nom AS gare_depart, g2.nom AS gare_arrivee, v.horaire_depart, v.horaire_arrivee, v.prix, v.train
    FROM voyages v
    JOIN gares g1 ON v.gare_depart_id = g1.id
    JOIN gares g2 ON v.gare_arrivee_id = g2.id;
  `;
  try {
    const result = await pool.query(query);
    return result.rows;  // Retourne tous les voyages
  } catch (error) {
    throw error;
  }
};

// Lire un voyage par son ID
const getVoyageById = async (id) => {
  const query = `
    SELECT v.id, g1.nom AS gare_depart, g2.nom AS gare_arrivee, v.horaire_depart, v.horaire_arrivee, v.prix, v.train
    FROM voyages v
    JOIN gares g1 ON v.gare_depart_id = g1.id
    JOIN gares g2 ON v.gare_arrivee_id = g2.id
    WHERE v.id = $1;
  `;
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Retourne le voyage correspondant à l'ID
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un voyage
const updateVoyage = async (id, gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train) => {
  const query = `
    UPDATE voyages
    SET gare_depart_id = $2, gare_arrivee_id = $3, horaire_depart = $4, horaire_arrivee = $5, prix = $6, train = $7
    WHERE id = $1
    RETURNING *;
  `;
  const values = [id, gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];  // Retourne le voyage mis à jour
  } catch (error) {
    throw error;
  }
};

// Supprimer un voyage
const deleteVoyage = async (id) => {
  const query = `DELETE FROM voyages WHERE id = $1 RETURNING *;`;
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Retourne le voyage supprimé
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createVoyage,
  getAllVoyages,
  getVoyageById,
  updateVoyage,
  deleteVoyage,
  findVoyagesByGares
};
