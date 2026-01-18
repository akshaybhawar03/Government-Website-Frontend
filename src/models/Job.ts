import { Schema, model, models, type InferSchemaType } from "mongoose";
import { slugify } from "@/lib/slug";

const JobSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["job", "result", "admit-card"],
      default: "job",
      index: true,
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    department: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },

    eligibility: { type: String, required: false, trim: true },

    ageLimit: { type: String, required: false, trim: true },
    vacancies: { type: String, required: false, trim: true },
    salary: { type: String, required: false, trim: true },
    fees: { type: String, required: false, trim: true },

    startDate: { type: Date, required: false },
    lastDate: { type: Date, required: false },

    selectionProcess: { type: String, required: false, trim: true },

    applyLink: { type: String, required: true, trim: true },
    notificationPDF: { type: String, required: false, trim: true },

    source: {
      name: { type: String, required: true, trim: true },
      url: { type: String, required: true, trim: true },
    },

    isExpired: { type: Boolean, required: true, default: false, index: true },
  },
  { timestamps: true }
);

JobSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    const base = slugify(String(this.title));
    this.slug = base || `job-${Date.now()}`;
  }
});

JobSchema.index({ "source.url": 1 }, { unique: true });

export type JobDocument = InferSchemaType<typeof JobSchema>;

export const Job = models.Job || model("Job", JobSchema);
