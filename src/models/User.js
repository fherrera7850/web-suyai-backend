import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    address: {
      street: { type: String, required: true },
      number: { type: String, required: true },
      officeApartment: String, // Opcional para oficina o departamento
      commune: {
        type: String,
        required: true,
        enum: ['Comuna1', 'Comuna2', 'Comuna3'] // Lista de comunas disponibles
      },
      region: { type: String, default: 'RM' }, // Región por defecto
      comments: String, // Comentarios u observaciones adicionales
    },
    propertyType: { type: String, required: true }, // Ej: Casa, Departamento, Oficina
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }
    },
    googleId: String,
    googleAccessToken: String,
    googleRefreshToken: String,
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    phone: {
      type: String,
      required: true
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Método para comparar la contraseña, solo aplicable si el usuario tiene una contraseña establecida
userSchema.methods.comparePassword = async function (password) {
  if (!this.password)
    return false;
  return bcrypt.compare(password, this.password);
};


userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default model("User", userSchema);