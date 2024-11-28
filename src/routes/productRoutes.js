import express from 'express';
import { ProductMongoManager as ProductManager } from '../dao/productMongoManager.js'; 

const router = express.Router();
const products = new ProductManager();

router.get('/', async (req, res) => {
    let { limit, page } = req.query;
    try {
        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;
        const productos = await products.getProducts(limit, page);
        if (productos && productos.productos.length > 0) {
            res.status(200).json(productos);
        } else {
            res.status(404).json({ error: 'Productos no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await products.getProductsById(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.status(200).json({ producto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { category, description, name, price, stock } = req.body;
     try {
        const newProduct = await products.addProducts(category, description, name, price, stock);
        res.status(201).json({message: "Producto agregado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { category, description, name, price, stock } = req.body;
    try {
        const updateProductlist = await products.updateProduct(id, { category, description, name, price, stock });
        res.status(201).json({message: "Producto editado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await products.deleteProduct(id);
        deleteProduct ? res.status(200).json(deleteProduct) : res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
