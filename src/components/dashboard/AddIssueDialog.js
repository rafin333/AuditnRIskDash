"use client"

import { useState } from "react"

import { useForm } from "react-hook-form"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { Form, FormControl, FormField, FormFooter, FormLabel, FormMessage, Textarea } from "../ui/form"
import { Select } from "../ui/select"

const categories = ["Bug", "Feature Request", "Enhancement"]
const priorities = ["High", "Medium", "Low"]
const statuses = ["Open", "In Progress", "Closed"]

export default function AddIssueDialog({ onIssueAdded, onClose, selectedRow }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm({
    defaultValues: selectedRow || {
      issue_title: "",
      issue_description: "",
      issue_category: "",
      issue_priority: "",
      issue_status: "",
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onIssueAdded()
      onClose()
    } catch (error) {
      console.error("Error adding issue:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <FormLabel htmlFor="issue_title">Title</FormLabel>
      <FormField
        control={form.control}
        name="issue_title"
        render={({ field }) => (
          <FormControl>
            <Input placeholder="Title" {...field} />
            <FormMessage />
          </FormControl>
        )}
      />

      <FormLabel htmlFor="issue_description">Description</FormLabel>
      <FormField
        control={form.control}
        name="issue_description"
        render={({ field }) => (
          <FormControl>
            <Textarea placeholder="Description" {...field} />
            <FormMessage />
          </FormControl>
        )}
      />

      <FormField
        control={form.control}
        name="issue_category"
        render={({ field }) => (
          <FormControl>
            <FormLabel htmlFor="issue_category">Category</FormLabel>
            <Select {...field}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <FormMessage />
          </FormControl>
        )}
      />

      <FormField
        control={form.control}
        name="issue_priority"
        render={({ field }) => (
          <FormControl>
            <FormLabel htmlFor="issue_priority">Priority</FormLabel>
            <Select {...field}>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </Select>
            <FormMessage />
          </FormControl>
        )}
      />

      <FormField
        control={form.control}
        name="issue_status"
        render={({ field }) => (
          <FormControl>
            <FormLabel htmlFor="issue_status">Status</FormLabel>
            <Select {...field}>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
            <FormMessage />
          </FormControl>
        )}
      />

      <FormFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </FormFooter>
    </Form>
  )
}

