import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: '',
    },
});

const CategoryModel = mongoose.models?.Category || mongoose.model('Category', CategorySchema);

export default CategoryModel;
