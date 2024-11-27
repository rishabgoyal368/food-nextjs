import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',  // Reference to Category model
      required: true,
    },
    productImages: {
        type: [String],  // Array of image URLs
        required: false,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price is non-negative
    },
    discount: {
      type: Number,
      required: false,
      default: 0, // Default discount is 0
      min: 0,
      max: 100, // Discount is a percentage
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      required: false,
      default: true, // Tracks product availability
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);
  
const ProductModel = mongoose.models?.Product || mongoose.model("Product", productSchema);

export default ProductModel;
