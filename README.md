# NWT WORLD

เว็บข่าวภาษาไทย (การเมือง / ต่างประเทศ) สร้างด้วย Next.js + Sanity CMS

## ตั้งค่า
1. สร้างโปรเจกต์ Sanity ที่ https://www.sanity.io/manage แล้วคัดลอก Project ID
2. คัดลอก `.env.example` เป็น `.env.local` และใส่ `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. ใน Sanity → API → CORS origins เพิ่ม `http://localhost:3000` และโดเมนเว็บจริง (เปิด Allow credentials)
4. `npm install` แล้ว `npm run dev`
5. เพิ่มข่าวที่ `/studio`

ดูหน้าตาโดยยังไม่มี Sanity: `NEXT_PUBLIC_USE_MOCK=1 npm run dev` (ข้อมูลทดสอบจาก `lib/mock.ts`)

## Deploy
นำเข้า repo นี้ใน Vercel และตั้งค่า environment variables เหมือน `.env.example`
