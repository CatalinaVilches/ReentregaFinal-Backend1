import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"]
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"]
    },
    name: {
      type: String,
      required: [true, "El título es obligatorio"]
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"]
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio"],
      min: [0, "El stock no puede ser negativo"]
    },
    
  },
  {
    timestamps: true, 
    versionKey: false,
    strict: true 
  }
);

productSchema.plugin(mongoosePaginate);

export const productosModel = mongoose.model("Products", productSchema);