import emailjs from "@emailjs/browser";

export const EMAILJS_SERVICE_ID = "service_yrtbq2c";
export const EMAILJS_TEMPLATE_ID = "template_1jn25k3";
export const EMAILJS_PUBLIC_KEY = "RqVUVYNSHoz3-eGta";

export type RequirementEmailParams = {
  name: string;
  email: string;
  phone: string;
  property_type: string;
  location: string;
  message: string;
};

export async function sendRequirementEmail(
  params: RequirementEmailParams,
): Promise<void> {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      name: params.name,
      email: params.email,
      phone: params.phone,
      property_type: params.property_type,
      location: params.location,
      message: params.message || "—",
    },
    EMAILJS_PUBLIC_KEY,
  );
}
