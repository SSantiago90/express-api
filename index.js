const express = require('express'); // Importar Express
const app = express(); // Crear la aplicación
// Middleware para parsear JSON
app.use(express.json());

let data = [
  { id: 1, name: 'Remera' },
  { id: 2, name: 'Zapatilla' },
  { id: 3, name: 'Campera' },
  { id: 4, name: 'Bufanda' },
];

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esta es una API simple.');
});

// Ruta para obtener datos
app.get('/api/items', (req, res) => { 
  res.json(data);
});

app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const requestedItem = data.find(item => item.id == id);

  if (requestedItem) {  
    res.json(requestedItem);
  } else {
    res.status(404).json({ error: 'Elemento no encontrado' });
  }
});
// Ruta para agregar un elemento (POST)
app.post('/api/items', (req, res) => {
  const newItem = req.body; // Obtener el nuevo elemento del cuerpo de la solicitud
  data.push(newItem);
  res.status(201).json({
    message: 'Elemento creado exitosamente',
    data: data,
  });
});


// Ruta para actualizar un elemento (PUT)
app.put('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body; // Obtener el elemento actualizado del cuerpo de la solicitud
  
  const newData = data.map(item => {
    if (item.id == id) {
      return updatedItem;
    }
    return item;
  });

  data= newData;
  
  res.json({
    message: 'Elemento actualizado exitosamente',
    data: data
  });  
});


// Ruta para eliminar un elemento (DELETE)
app.delete('/api/items/:id', (req, res) => {  
  const id = req.params.id; 
  const newData = data.filter(item => item.id != id);
  data = newData;
  res.json({
    message: 'Elemento eliminado exitosamente', 
    data: data
  })
});

// Ruta protegida que verifica el header Authorization
app.get('/api/protected', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No se encontró el header Authorization' });
  }

  // Ejemplo simple para verificar el token
  const token = authHeader.split(' ')[1]; // Suponiendo formato "Bearer <token>"
  if (token !== 'mi-token-secreto') {
    return res.status(403).json({ error: 'Forbidden: Token inválido' });
  }

  res.json({ message: 'Acceso permitido', data: 'Este es un recurso protegido' });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
