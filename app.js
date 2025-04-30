const express = require('express');
const path = require('path');
const app = express();

// Configuración básica
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Única ruta necesaria
app.get('/', (req, res) => {
  res.render('index', {
    title: 'The Palace - Historia',
    page: 'home'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sitio funcionando en http://localhost:${PORT}`);
});