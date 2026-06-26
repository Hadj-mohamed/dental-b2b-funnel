# 🦷 نظام إدارة عيادات الأسنان الذكي — B2B Funnel

نظام فانل + CRM مخصص لجذب ملاك عيادات الأسنان في الخليج العربي.
تجربة مجانية 7 أيام — بلا بطاقة ائتمان.

## 🚀 التشغيل

```bash
npm install
npm run dev
```

افتح: `http://localhost:5173`

## 📦 التقنيات

- React 18 + Vite 5 + TypeScript 5
- TailwindCSS v4 (Vite Plugin)
- framer-motion 11 (animations)
- lucide-react (icons)
- Supabase (DB + Realtime)

## 🗂️ الهيكل

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Router (landing / crm)
├── types.ts                 # Types + COUNTRY_RULES
├── vertical.config.ts       # B2B DNA (offer, pipeline, demo data)
├── supabase.ts              # Fail-Safe client
├── index.css                # Tailwind v4 + theme
├── pages/
│   ├── LandingPage.tsx      # VSL Sales Letter
│   └── CRMPage.tsx          # Pipeline Tracker
└── components/
    ├── SmartPhoneInput.tsx  # كشف الدولة + علم + تحقق
    ├── PaymentMethods.tsx   # Geo payments (SA/AE/QA/KW)
    └── UpsellCard.tsx       # AI assistant add-on
```

## 🔧 الإنتاج

1. ضع `.env` بقيم Supabase الحقيقية
2. نفّذ `supabase/schema.sql` في Supabase SQL Editor
3. في `PaymentMethods.tsx` — ابحث عن `INJECT_WISE_LINK` و `INJECT_PAYPAL_LINK` وضع روابطك
4. في `vertical.config.ts` — عدّل `CONTACT.whatsapp_number`
5. `npm run build` → ارفع `dist/` على Vercel
