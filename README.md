# Documentación de la API

## Introducción

Esta es una API simple creada con Express que gestiona un catálogo básico de productos. Incluye operaciones CRUD básicas para interactuar con los datos.

---

## **Instalación**

### Requisitos previos

- Node.js instalado en tu sistema.

### Pasos

1. Clona o descarga el proyecto.
2. Navega al directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:
   ```bash
   npm install express
   ```
4. Inicia el servidor ejecutando:
   ```bash
   node index.js
   ```
5. El servidor estará disponible en `http://localhost:3000`.

---

## **Endpoints**

### **1. Ruta Principal**

- **Descripción**: Retorna un mensaje de bienvenida.
- **Método**: `GET`
- **URL**: `/`
- **Respuesta de ejemplo**:
  ```json
  {
    "message": "¡Hola, mundo! Esta es una API simple."
  }
  ```

---

### **2. Obtener todos los elementos**

- **Descripción**: Retorna una lista de todos los elementos disponibles.
- **Método**: `GET`
- **URL**: `/api/items`
- **Respuesta de ejemplo**:
  ```json
  [
    { "id": 1, "name": "Remera" },
    { "id": 2, "name": "Zapatilla" },
    { "id": 3, "name": "Campera" },
    { "id": 4, "name": "Bufanda" }
  ]
  ```

---

### **3. Obtener un elemento por ID**

- **Descripción**: Retorna un elemento específico basado en el ID proporcionado.
- **Método**: `GET`
- **URL**: `/api/items/:id`
- **Parámetros**:
  - `id` (requerido): ID del elemento.
- **Respuestas**:
  - **Éxito (200)**:
    ```json
    { "id": 1, "name": "Remera" }
    ```
  - **Error (404)**:
    ```json
    { "error": "Elemento no encontrado" }
    ```

---

### **4. Agregar un nuevo elemento**

- **Descripción**: Agrega un nuevo elemento al catálogo.
- **Método**: `POST`
- **URL**: `/api/items`
- **Cuerpo de la solicitud**:
  ```json
  { "id": 5, "name": "Guantes" }
  ```
- **Respuesta de ejemplo**:
  ```json
  {
    "message": "Elemento agregado correctamente",
    "item": { "id": 5, "name": "Guantes" }
  }
  ```

---

### **5. Ruta protegida con autorización**

- **Descripción**: Verifica el header `Authorization` y devuelve un recurso protegido si el token es válido.
- **Método**: `GET`
- **URL**: `/api/protected`
- **Headers requeridos**:
  - `Authorization: Bearer <token>`
- **Respuestas**:
  - **Éxito (200)**:
    ```json
    {
      "message": "Acceso permitido",
      "data": "Este es un recurso protegido"
    }
    ```
  - **Error (401)**:
    ```json
    { "error": "Unauthorized: No se encontró el header Authorization" }
    ```
  - **Error (403)**:
    ```json
    { "error": "Forbidden: Token inválido" }
    ```

---

## **Ejemplos de Fetch**

### **Obtener todos los elementos**

```javascript
fetch("http://localhost:3000/api/items")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### **Agregar un elemento**

```javascript
fetch("http://localhost:3000/api/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: 5, name: "Guantes" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### **Acceder a la ruta protegida**

```javascript
fetch("http://localhost:3000/api/protected", {
  headers: {
    Authorization: "Bearer mi-token-secreto",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```
