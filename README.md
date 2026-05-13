# Backend E-commerce API

Proyecto final desarrollado para el curso de Backend con Node.js.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Handlebars
- Socket.io
- JavaScript ESModules

---

# Funcionalidades principales

## Productos

- CRUD completo de productos
- Paginación
- Filtros
- Ordenamiento por precio
- Vista de detalle

## Carritos

- Crear carrito
- Agregar productos
- Eliminar productos
- Vaciar carrito
- Actualizar cantidades
- Populate de productos

## Tiempo real

- Actualización en tiempo real con Socket.io
- Persistencia en MongoDB

---

# Estructura del proyecto

```bash
src/
│
├── config/
├── controllers/
├── dao/
│   ├── filesystem/
│   └── mongo/
├── middlewares/
├── models/
├── public/
├── routes/
├── sockets/
├── views/
└── app.js
```

---

# Endpoints principales

## Productos

### Obtener productos

```http
GET /api/products
```

### Obtener producto por ID

```http
GET /api/products/:pid
```

### Crear producto

```http
POST /api/products
```

### Actualizar producto

```http
PUT /api/products/:pid
```

### Eliminar producto

```http
DELETE /api/products/:pid
```

---

## Carritos

### Crear carrito

```http
POST /api/carts
```

### Obtener carrito

```http
GET /api/carts/:cid
```

### Agregar producto

```http
POST /api/carts/:cid/products/:pid
```

---

# Vistas

- /products
- /products/:pid
- /carts/:cid
- /realtimeproducts

---

# Autor

Aylen Gomez