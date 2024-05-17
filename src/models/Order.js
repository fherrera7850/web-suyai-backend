import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Bidones', 'Kits', 'Dispensadores Básicos', 'Dispensadores Eléctricos', 'Accesorios']
    },
    imageUrl: { type: String, required: true }, // Campo para la URL de la imagen del producto
}, { timestamps: true });

export default model("Order", orderSchema);