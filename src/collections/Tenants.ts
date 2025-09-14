import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: { description: "This is the name of the store." },
    },
    {
      name: "slug",
      required: true,
      type: "text",
      index: true,
      unique: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "This is the subdomain for the store. [e.g. [slug].learnity.com]",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      access: { update: ({ req }) => isSuperAdmin(req.user) },
      admin: {
        description: "Stripe Account Id associated with your shop",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      required: true,
      admin: {
        description:
          "You cannot create products until you submitted Stripe details.",
      },
    },
  ],
};
