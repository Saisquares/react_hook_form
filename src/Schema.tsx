import { z } from "zod";

export const Schema = z
  .object({
    first_name: z
      .string()
      .min(1, "First Name is Required")
      .max(50, "Maximum length is 50 characters")
      .trim() // removes whitespaces at start and ends
      .regex(
        /^[A-Za-z ]+$/,
        "First Name must contain only alphabetic characters and spaces"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must contain at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    gender: z.enum(["Male", "Female", "Others"], {
      message: "Gender is Required",
    }),
    address: z.object({
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
    }),
    age: z
      .number({
        invalid_type_error: "Age is required", 
      })
      .min(1, "Age is required") 
      .min(19, "Minimum age should be above 18"), 
    hobbies: z
      .array(
        z.object({
          name: z.string().min(1, "Hobby Name is required"),
        })
      )
      .min(1, "At least one hobby is required"),
    acceptPrivacy: z.boolean(),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.acceptPrivacy && !data.description) {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "Description is required when you accept the privacy policy",
      });
    }
  });
