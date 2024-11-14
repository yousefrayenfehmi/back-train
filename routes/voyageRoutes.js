// routes/voyageRoutes.js
const express = require('express');
const router = express.Router();
const voyageModel = require('../model/voyage');

// Créer un voyage
router.post('/', async (req, res) => {
  const { gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train } = req.body;
  try {
    const newVoyage = await voyageModel.createVoyage(gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train);
    res.status(201).json(newVoyage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/search', async (req, res) => {
    const { depart, arrivee } = req.body; 
    try {
      const voyages = await voyageModel.findVoyagesByGares(depart, arrivee);
      if (voyages.length > 0) {
        res.status(200).json(voyages);
      } else {
        res.status(404).json({ error: 'Aucun voyage trouvé pour ces gares' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Lire tous les voyages
router.get('/', async (req, res) => {
  try {
    const voyages = await voyageModel.getAllVoyages();
    res.status(200).json(voyages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lire un voyage par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const voyage = await voyageModel.getVoyageById(id);
    if (voyage) {
      res.status(200).json(voyage);
    } else {
      res.status(404).json({ error: 'Voyage non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un voyage
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train } = req.body;
  try {
    const updatedVoyage = await voyageModel.updateVoyage(id, gare_depart_id, gare_arrivee_id, horaire_depart, horaire_arrivee, prix, train);
    if (updatedVoyage) {
      res.status(200).json(updatedVoyage);
    } else {
      res.status(404).json({ error: 'Voyage non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un voyage
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVoyage = await voyageModel.deleteVoyage(id);
    if (deletedVoyage) {
      res.status(200).json(deletedVoyage);
    } else {
      res.status(404).json({ error: 'Voyage non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
