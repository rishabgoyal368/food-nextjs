import dbConnect  from "@/lib/dbConnect"; // Your DB connection
import UserModel from "@/app/(backend)/model/UserModel";
import { makeResponse } from "@/lib/makeResponse";
import { z } from "zod";

// Create a Zod schema to validate the `id` parameter
const userIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"); // Validates MongoDB ObjectId format

const updateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name is too long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name is too long"),
  email: z.string().email("Invalid email format"),
});


export async function GET(request, { params }) {
  const { id } = params; 

  try {
    userIdSchema.parse(id); // This will throw an error if the ID is invalid
  } catch (error) {
    return makeResponse(false, error.errors[0].message, {}, 400); // Return error if validation fails
  }

  await dbConnect(); // Connect to the database

  try {
    const user = await UserModel.findById(id); // Assuming UserModel is a Mongoose model

    if (!user) {
      return makeResponse(false, "User not found", {}, 404);
    }

    return makeResponse(true, "User fetched successfully", user, 200);
  } catch (error) {
    return makeResponse(false, error.message, {}, 400);
  }
}



export async function DELETE(request, { params }) {
    const { id } = params; 
  
    try {
      userIdSchema.parse(id); // This will throw an error if the ID is invalid
    } catch (error) {
      return makeResponse(false, error.errors[0].message, {}, 400); // Return error if validation fails
    }
  
    await dbConnect(); // Connect to the database
  
    try {
      const user = await UserModel.deleteOne({'_id':id}); // Assuming UserModel is a Mongoose model
  
      if (!user) {
        return makeResponse(false, "User not found", {}, 404);
      }
  
      return makeResponse(true, "User deleted successfully", user, 200);
    } catch (error) {
      return makeResponse(false, error.message, {}, 400);
    }
}


export async function PUT(request, { params }) {
  const { id } = params; 
  const data = await request.json(); 

  // Validate the `id` parameter using Zod
  try {
    userIdSchema.parse(id); 
  } catch (error) {
    return makeResponse(false, error.errors[0].message, {}, 400); 
  }

  try {
    updateUserSchema.parse(data); 
  } catch (error) {
    return makeResponse(false, error.errors[0].message, {}, 400);
  }

  await dbConnect(); // Connect to the database

  try {
    // Find the user by ID and update the data
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true }); // `new: true` returns the updated document

    if (!updatedUser) {
      return makeResponse(false, "User not found", {}, 404); // Return error if user not found
    }

    // Return the updated user
    return makeResponse(true, "User updated successfully", updatedUser, 200);
  } catch (error) {
    // Handle any errors during the update process
    return makeResponse(false, error.message, {}, 400);
  }
}
