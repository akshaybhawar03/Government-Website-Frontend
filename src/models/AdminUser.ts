import { Schema, model, models, type InferSchemaType } from "mongoose";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

export type AdminUserDocument = InferSchemaType<typeof AdminUserSchema>;

export const AdminUser = models.AdminUser || model("AdminUser", AdminUserSchema);
