// connection_base/connection.js

// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config({ path: './.env'});

// Vérification pour s'assurer que les variables sont chargées
console.log('PG_USER:', process.env.PG_USER);  // Affiche la variable PG_USER pour vérifier

// Importer le module `pg` pour PostgreSQL
const { Pool } = require('pg');

// Créer une nouvelle instance de Pool avec les variables d'environnement
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect().then(response=>{
  console.log("sayer");
  
}).catch(err=>{
  console.log('err');
  
})

module.exports = pool;  // Exporter la connexion pour l'utiliser dans d'autres fichiers
