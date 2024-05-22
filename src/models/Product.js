import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Bidones', 'Kits', 'Accesorios', 'Dispensadores Básicos', 'Dispensadores Eléctricos']
  },
  imageUrl: { type: String, required: true }, // Campo para la URL de la imagen del producto
  isActive: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

export default model("Product", productSchema);