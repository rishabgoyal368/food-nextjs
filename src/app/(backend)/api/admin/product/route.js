import ProductModel from "@/app/(backend)/model/ProductModel";
import dbConnect from "@/lib/dbConnect";
import { makeResponse } from "@/lib/makeResponse";
import path from "path";
import { writeFile } from "fs/promises";


export async function GET(request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");
        console.log('name', name);
        const getAllProducts = await ProductModel.find({
            ...(name && {
                $or: [
                    { productName: { $regex: name, $options: 'i' }},
                    { _id :  name },
                ],
            }),
        })
        .populate("CategoryId")  // Populate the Category reference
        .exec();

        return makeResponse(true, "Fetching products", getAllProducts, 200);
    } catch (error) {
        console.error(error);
        return makeResponse(false, error?.message, {}, 400);
    }
}



export async function POST(req) {
    await dbConnect();

    try {
        const formData = await req.formData();
        const fileList = formData.getAll("productImages"); // Retrieve all image files
        const imagePaths = [];

        for (const file of fileList) {
            if (file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const fileName = file.name.replaceAll(" ", "_");
                const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
                await writeFile(uploadPath, buffer);
                imagePaths.push(`/uploads/${fileName}`);
            }
        }

        const product = await ProductModel.create({
            productName: formData.get("productName"),
            CategoryId: formData.get("categoryId"),
            productImages: imagePaths,
            price: formData.get("price"),
            discount: formData.get("discount"),
            description: formData.get("description"),
        });

        return makeResponse(true, "Product created successfully", product, 201);
    } catch (error) {
        return makeResponse(false, error.message, {}, 400);
    }
}

export async function PUT(req) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id"); // Get product ID from URL
        if (!id) return makeResponse(false, "Product ID is required", {}, 400);

        const formData = await req.formData();
        const file = formData.get("file");
        let fileName = "";

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            fileName = file.name.replaceAll(" ", "_");

            try {
                await writeFile(
                    path.join(process.cwd(), "public/uploads/" + fileName),
                    buffer
                );
            } catch (error) {
                return makeResponse(false, "Image upload failed", {}, 400);
            }
        }

        const updatedData = {
            productName: formData.get("productName"),
            categoryId: formData.get("categoryId"),
            price: formData.get("price"),
            discount: formData.get("discount"),
            description: formData.get("description"),
            ...(fileName && { productImages: `/uploads/${fileName}` }), // Update image only if provided
        };

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedProduct) {
            return makeResponse(false, "Product not found", {}, 404);
        }

        return makeResponse(true, "Product updated successfully", updatedProduct, 200);
    } catch (error) {
        return makeResponse(false, error.message, {}, 400);
    }
}

export async function DELETE(request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id"); // Get product ID from URL
        if (!id) return makeResponse(false, "Product ID is required", {}, 400);

        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return makeResponse(false, "Product not found", {}, 404);
        }

        return makeResponse(true, "Product deleted successfully", deletedProduct, 200);
    } catch (error) {
        return makeResponse(false, error.message, {}, 400);
    }
}
