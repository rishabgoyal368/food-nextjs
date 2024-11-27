"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  image: z.any().optional(), // For image uploads
});

function EditUserPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: null, // Default value for the image
    },
  });

  const [imagePreview, setImagePreview] = useState(null);


  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Update the preview
      form.setValue("image", file); // Set the file in the form state
    }
  };

  // Submit handler
  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image) formData.append("image", data.image);

      const response = await fetch(`/api/admin/category/`, {
        method: "POST",
        body: formData, // Send the form data
      });

      const result = await response.json();

      if (response.ok) {
        router.replace("/admin/category");
      } else {
        console.error("Error updating category:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Add Category</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(e);
                      field.onChange(e.target.files[0]); // Update form state
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditUserPage;
