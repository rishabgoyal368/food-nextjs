"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useCategory from "@/hooks/use-category";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define validation schema with Zod
const formSchema = z.object({
  productName: z.string().min(2, "Product name must be at least 2 characters").max(50, "Product name must be less than 50 characters"),
  categoryId: z.string().nonempty("Category is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  discount: z.coerce.number().min(0, "Discount must be a positive number"),
  description: z.string().optional(),
  productImages: z
    .array(
      z.object({
        file: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, "Each file must be less than 2MB"), // Limit file size
      })
    )
    .min(1, "At least one image is required"),
});

function AddProductPage() {
  const router = useRouter();
  const { category } = useCategory();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      categoryId: "",
      price: 0,
      discount: 0,
      description: "",
      productImages: [],
    },
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle multiple image changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews(previews); // Update previews
    form.setValue(
      "productImages",
      files.map((file) => ({ file })) // Store files in the form
    );
  };

  // Submit handler
  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("categoryId", data.categoryId);
      formData.append("price", data.price);
      formData.append("discount", data.discount);
      formData.append("description", data.description || "");

      // Append multiple images to formData
      data.productImages.forEach((image) => {
        formData.append("productImages", image.file);
      });

      const response = await fetch(`/api/admin/product/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.replace("/admin/product");
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name Field */}
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Select Field */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                      category.length > 0 && category.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount Field */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter discount" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Multiple Image Upload Field */}
          <FormField
            control={form.control}
            name="productImages"
            render={() => (
              <FormItem>
                <FormLabel>Upload Images</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {imagePreviews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddProductPage;
