import CatgeoryModel from "@/app/(backend)/model/CategoryModel";
import dbConnect from "@/lib/dbConnect";
import { makeResponse } from "@/lib/makeResponse";
import path from "path";
import { writeFile } from "fs/promises";

export async function PUT(req, {params}) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const { id } = params; 

  
    if (!id) {
      return makeResponse(false, "Category ID is required", {}, 400);
    }
  
    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    let fileName = "";
  
    try {
      const category = await CatgeoryModel.findById(id);
  
      if (!category) {
        return makeResponse(false, "Category not found", {}, 404);
      }
  
      if (file) {
        // Remove old image file if it exists
        if (category.image) {
          const oldImagePath = path.join(process.cwd(), "public/uploads/category/" + category.image);
          try {
            await unlink(oldImagePath);
          } catch (error) {
            console.log("Failed to delete old image:", error);
          }
        }
  
        // Save the new image file
        const buffer = Buffer.from(await file.arrayBuffer());
        fileName = file.name.replaceAll(" ", "_");
        try {
          await writeFile(
            path.join(process.cwd(), "public/uploads/category/" + fileName),
            buffer
          );
        } catch (error) {
          return makeResponse(false, "Failed to save new file", {}, 400);
        }
      }
  
      // Update category fields
      category.name = name || category.name;
      category.image = file ? fileName : category.image;
      await category.save();
  
      return makeResponse(true, "Category updated successfully", category, 200);
    } catch (error) {
      console.log(error);
      return makeResponse(false, "Failed to update category", {}, 400);
    }
  }
  

  export async function DELETE(req, {params}) {
    await dbConnect();
    const { id } = params; 
  
    if (!id) {
      return makeResponse(false, "Category ID is required", {}, 400);
    }
  
    try {
      const category = await CatgeoryModel.findById(id);
  
      if (!category) {
        return makeResponse(false, "Category not found", {}, 404);
      }
  
      // Remove associated image file if it exists
      if (category.image) {
        const imagePath = path.join(process.cwd(), "public/uploads/" + category.image);
        try {
          await unlink(imagePath);
        } catch (error) {
          console.log("Failed to delete image:", error);
        }
      }
  
      // Delete the category
      await CatgeoryModel.findByIdAndDelete(id);
  
      return makeResponse(true, "Category deleted successfully", {}, 200);
    } catch (error) {
      console.log(error);
      return makeResponse(false, "Failed to delete category", {}, 400);
    }
  }
  
  export async function GET(req, { params }) {
    const { id } = params; 
  
    if (!id) {
      return makeResponse(false, "Category ID is required", {}, 400);
    }
  
    try {
      const category = await CatgeoryModel.findById(id);
  
      if (!category) {
        return makeResponse(false, "Category not found", {}, 404);
      }
  
      return makeResponse(true, "Category fetched successfully", category, 200);
    } catch (error) {
      console.log(error);
      return makeResponse(false, "Failed to fetch category", {}, 400);
    }
  }
  