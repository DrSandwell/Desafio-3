const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 8080;

const manager = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        const products = await manager.getProducts();
        const limit = req.query.limit;
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        console.log("Error al obtener los productos:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

app.get('/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const product = manager.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    } 
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});