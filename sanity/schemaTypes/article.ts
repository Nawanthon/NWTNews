import { defineField, defineType } from "sanity";

export const CATEGORIES = [
  { title: "การเมือง", value: "politics" },
  { title: "ต่างประเทศ", value: "world" },
];

export const article = defineType({
  name: "article",
  title: "ข่าว",
  type: "document",
  fields: [
    defineField({ name: "title", title: "หัวข้อข่าว", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "ลิงก์ (slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "หมวด",
      type: "string",
      options: { list: CATEGORIES, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "สรุปสั้น", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "รูปภาพหลัก",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "คำอธิบายรูป", type: "string" })],
    }),
    defineField({ name: "body", title: "เนื้อหา", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "publishedAt", title: "วันที่เผยแพร่", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "featured", title: "ตั้งเป็นข่าวเด่น (หน้าแรก)", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "ใหม่สุดก่อน", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
