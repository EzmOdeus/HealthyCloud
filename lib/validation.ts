import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "يجب أن يكون الاسم مكونًا من حرفين على الأقل")
    .max(50, "يجب ألا يتجاوز الاسم 50 حرفًا"),
  email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "رقم الهاتف غير صالح"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "يجب أن يكون الاسم مكونًا من حرفين على الأقل")
    .max(50, "يجب ألا يتجاوز الاسم 50 حرفًا"),
  email: z.string().email("عنوان البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "رقم الهاتف غير صالح"),
  birthDate: z.coerce.date(),
  gender: z.enum(["ذكر", "انثي"]),
  address: z
    .string()
    .min(5, "يجب أن يكون العنوان مكونًا من خمسة أحرف على الأقل")
    .max(500, "يجب ألا يتجاوز العنوان 500 حرف"),
  occupation: z
    .string()
    .min(2, "يجب أن يكون الوظيفة مكونة من حرفين على الأقل")
    .max(500, "يجب ألا تتجاوز الوظيفة 500 حرف"),
  emergencyContactName: z
    .string()
    .min(
      2,
      "يجب أن يكون اسم الشخص الذي يتم الاتصال به مكونًا من حرفين على الأقل"
    )
    .max(50, "يجب ألا يتجاوز اسم الشخص المراد الاتصال به 50 حرفًا"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "رقم الهاتف غير صالح"
    ),
  primaryPhysician: z.string().min(2, "يرجى اختيار طبيب واحد على الأقل"),
  insuranceProvider: z
    .string()
    .min(2, "يجب أن يكون اسم التأمين مكونًا من حرفين على الأقل")
    .max(50, "يجب ألا يتجاوز اسم التأمين 50 حرفًا"),
  insurancePolicyNumber: z
    .string()
    .min(2, "يجب أن يتكون رقم السياسة من حرفين على الأقل")
    .max(50, "يجب ألا يتجاوز رقم السياسة 50 حرفًا"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
