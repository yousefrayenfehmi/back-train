
const express = require('express');
const app = express();
const cors = require('cors');  // Si tu as besoin d'activer CORS
const gareRoutes = require('./routes/gareRoutes');  // Importer les routes des gares
const voyageRoutes = require('./routes/voyageRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse les données JSON dans le corps de la requête

app.use(express.json());  
app.use(cors());  

// Utiliser les routes des gares
app.use('/api', gareRoutes);  
app.use('/api/voyages', voyageRoutes);

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000');
});