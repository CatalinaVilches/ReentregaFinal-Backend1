import productValidation from "../validaciones/productsValidation.js";
import { productosModel } from './models/productsModel.js';

export class ProductMongoManager {
    constructor() {
        this.products = [];
    }

    async getProducts(limit, page) {
        try {
            const options = {
                page: page,
                limit: limit,
                lean: true
            };
            const result = await productosModel.paginate({}, options);
            console.log("Paginación Resultada:", result); 
    
            return {
                productos: result.docs,
                total: result.totalDocs,
                limit,
                page,
                totalPages: result.totalPages,
            };
        } catch (error) {
            console.error("Error al obtener productos:", error);
            throw error;
        }
    }
    
    async getProductsById(id) {
        try {
            return await productosModel.findById(id).lean();
        } catch (error) {
            console.error('Error al obtener producto:', error);
            throw error;
        }
    }
  
    async addProducts(category, description, name, price, stock) {
        try {
            const newProduct = await productosModel.create({
                category,
                description,
                name,
                price,
                stock
            });
    
            return newProduct.toJSON();
        } catch (error) {
            throw new Error('Error al añadir el producto: ' + error.message);
        }
    }

    async updateProduct(id, updateData) {
        try {
            const producto = await this.getProductsById(id);
            if (!producto) {
                throw new Error('El producto no existe');
            }
    
            const productoActualizado = await productosModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
    
            if (!productoActualizado) {
                throw new Error('El producto no pudo ser actualizado');
            }
    
            return productoActualizado;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }
  
    async deleteProduct(id) {
        try {
            const producto = await productosModel.findByIdAndDelete(id).lean();
            return producto;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw new Error(error.message);
        }
    }
}
