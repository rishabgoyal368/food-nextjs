"use client"

import React, { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from 'next/navigation';
import axios from "axios"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(50, { message: "First name must be at most 50 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(50, { message: "Last name must be at most 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
})

function EditUserPage() {
  const router = useRouter();
  const { id } = useParams(); 
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // Fetch user data to prefill the form
  const getUser = async () => {
    try {
      const response = await axios.get(`/api/admin/users/${id}`);
      if (response.data && response.data.data) {
        const userData = response.data.data;

        form.setValue("firstName", userData.firstName || "");
        form.setValue("lastName", userData.lastName || "");
        form.setValue("email", userData.email || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUser();
  }, [id]);

  // Submit handler
  async function onSubmit(data) {
    try {

      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        router.replace('/admin/users');
      } else {
        console.error("Error updating user:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit User</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
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
