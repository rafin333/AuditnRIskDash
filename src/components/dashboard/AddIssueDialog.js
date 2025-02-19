"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Form, FormControl, FormField, FormFooter, FormLabel, FormMessage, Textarea } from "../ui/form";
import { Select } from "../ui/select";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";

const API_URL = "http://192.168.11.248:5000/api";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IxNmVhZTczMzQ1NzI4MGFmNWQ5MTUiLCJlbWFpbCI6InJhaXlhbjEyNEBnbWFpbC5jb20iLCJyb2xlIjoibG9nZ2VyIiwiYWNsIjpbImxvZ2dpbmciXSwiaWF0IjoxNzM5NjgxNTQxLCJleHAiOjE3Mzk3Njc5NDF9.laK8owQFWrucnLSkgxkLZTR2R6JdfT7kkJDY_8u_SC4";

const categories = ["Bug", "Feature Request", "Enhancement"];
const priorities = ["High", "Medium", "Low"];
const statuses = ["Open", "In Progress", "Closed"];

const issueSchema = z.object({
  issue_title: z.string().min(1, "Title is required").max(100),
  issue_description: z.string().min(1, "Description is required").max(500),
  issue_category: z.enum(categories),
  issue_priority: z.enum(priorities),
  issue_status: z.enum(statuses),
});

export default function AddIssueDialog({ onIssueAdded, onClose, selectedRow }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(issueSchema),
    defaultValues: selectedRow || {
      issue_title: "",
      issue_description: "",
      issue_category: "Bug",
      issue_priority: "Medium",
      issue_status: "Open",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/issue`, {
        method: selectedRow ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${selectedRow ? "update" : "create"} issue`);
      }

      await response.json();
      onIssueAdded();
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>{selectedRow ? "Edit Issue" : "Add New Issue"}</DialogTitle>
      </DialogHeader>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="issue_title"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel htmlFor="issue_title">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter issue title" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="issue_description"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel htmlFor="issue_description">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter issue description" 
                    className="h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="issue_category"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="issue_category">Category</FormLabel>
                  <Select 
                    {...field}
                    className="w-full"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="issue_priority"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="issue_priority">Priority</FormLabel>
                  <Select 
                    {...field}
                    className="w-full"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </Select>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="issue_status"
              render={({ field }) => (
                <div className="space-y-2">
                  <FormLabel htmlFor="issue_status">Status</FormLabel>
                  <Select 
                    {...field}
                    className="w-full"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                  <FormMessage />
                </div>
              )}
            />
          </div>

          <FormFooter className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : selectedRow ? "Update" : "Add Issue"}
            </Button>
          </FormFooter>
        </form>
      </Form>
    </div>
  );
}