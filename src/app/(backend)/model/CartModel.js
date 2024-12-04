import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    }, 
    totalPrice:{
        type: mongoose.Schema.Types.Number, 
        required: true,
    }, 
    productId:{
        type: mongoose.Schema.Types.Array,
        required: true,
    }
});

const cartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default cartModel;
