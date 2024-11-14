// routes/gareRoutes.js

const express = require('express');
const router = express.Router();
const { getAllGares, getGareById, addGare, updateGare, deleteGare,getCoordinatesByGareName} = require('../model/gareModel');  // Importer les fonctions CRUD

// Route pour récupérer toutes les gares
router.get('/gares', async (req, res) => {
  try {
    const gares = await getAllGares();
    res.json(gares); 
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des gares' });
  }
});
router.post('/points', async (req, res) => {
    const { dep, arr } = req.body;  // Extraire les gares de départ et d'arrivée du corps de la requête
  
    try {
      // Récupérer les coordonnées de la gare de départ
      const departCoords = await getCoordinatesByGareName(dep);
  
      // Récupérer les coordonnées de la gare d'arrivée
      const arriveeCoords = await getCoordinatesByGareName(arr);
  
      // Retourner les coordonnées sous forme de réponse
      res.json({
        deps: departCoords,   // Coordonnées de la gare de départ
        arrs: arriveeCoords   // Coordonnées de la gare d'arrivée
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées:', error.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
// Route pour récupérer une gare par son ID
router.get('/gares/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const gare = await getGareById(id);
    if (gare) {
      res.json(gare);  // Retourner la gare trouvée
    } else {
      res.status(404).json({ error: 'Gare non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la gare' });
  }
});

// Route pour ajouter une nouvelle gare
router.post('/gares', async (req, res) => {
  const { nom, latitude, longitude } = req.body;
  try {
    const newGare = await addGare(nom, latitude, longitude);
    res.status(201).json(newGare);  // Retourner la gare ajoutée
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la gare' });
  }
});

// Route pour mettre à jour une gare
router.put('/gares/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, latitude, longitude } = req.body;
  try {
    const updatedGare = await updateGare(id, nom, latitude, longitude);
    if (updatedGare) {
      res.json(updatedGare);  // Retourner la gare mise à jour
    } else {
      res.status(404).json({ error: 'Gare non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la gare' });
  }
});

// Route pour supprimer une gare
router.delete('/gares/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGare = await deleteGare(id);
    if (deletedGare) {
      res.json(deletedGare);  // Retourner la gare supprimée
    } else {
      res.status(404).json({ error: 'Gare non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la gare' });
  }
});

module.exports = router;  // Exporter le routeur
