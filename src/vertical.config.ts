/**
 * ============================================================================
 * VERTICAL CONFIG — B2B Dental Funnel (Generic, Gulf-focused)
 * ============================================================================
 */

export const BRAND = {
  name_ar: 'نظام إدارة عيادات الأسنان الذكي',
  name_en: 'Dental Clinic Growth System',
  tagline_ar:
    'نظام حجز ومتابعة مؤتمت — ملكية دائمة، تجربة مجانية 7 أيام بلا بطاقة ائتمان',
  colors: {
    primary: '#0A2540',
    secondary: '#00D4B2',
  },
} as const;

export const OFFER = {
  trialDays: 7,
  monthlyPrice: 497,        // ر.س / درهم / د.ك
  yearlyPrice: 4970,
  currency_ar: 'ر.س',
  upsellPrice: 197,         // AI assistant add-on (monthly)
  upsellTitle_ar:
    'المساعد الصوتي والمكتوب بالذكاء الاصطناعي — تأهيل طوارئ وجدولة بعد الإغلاق',
  upsellDesc_ar:
    'يستقبل المكالمات والرسائل تلقائياً في أوقات إغلاق العيادة، يؤهل الحالات الطارئة، ويجدول المواعيد بدون أي تدخل بشري.',
} as const;

export const CONTACT = {
  whatsapp_number: '966500000000',  // ← ضع رقم واتساب شركتك هنا
  email: 'info@dentalgrowth.systems',
} as const;

// ============================================================================
// CRM PIPELINE STAGES (per the sales methodology)
// ============================================================================
export const PIPELINE_STAGES = [
  { id: 'diagnosis',   label_ar: 'مرحلة التشخيص',     color: 'blue',    icon: 'Stethoscope' },
  { id: 'live_trial',  label_ar: 'التجربة الحية',     color: 'amber',   icon: 'Activity' },
  { id: 'payment',     label_ar: 'الدفع والإغلاق',    color: 'purple',  icon: 'CreditCard' },
  { id: 'closed',      label_ar: 'تم الإغلاق',         color: 'emerald', icon: 'CheckCircle2' },
] as const;

// ============================================================================
// DEMO CLINIC LEADS (for CRM preview without Supabase)
// ============================================================================
export const DEMO_CLINICS = [
  {
    id: 1, clinicName: 'عيادة الابتسامة الذهبية', ownerName: 'د. خالد العتيبي',
    phone: '+966512345678', phoneCountry: 'SA', city: 'الرياض',
    status: 'live_trial' as const, hasUpsell: true,
    trialStartedAt: '2026-06-20', trialEndsAt: '2026-06-27',
    notes: 'متحمس جداً — سأل عن التكامل مع WhatsApp Business',
  },
  {
    id: 2, clinicName: 'مركز الرياض لزراعة الأسنان', ownerName: 'د. سارة المطيري',
    phone: '+966509876543', phoneCountry: 'SA', city: 'جدة',
    status: 'diagnosis' as const, hasUpsell: false,
    trialStartedAt: '2026-06-25', trialEndsAt: '2026-07-02',
    notes: 'يحتاج عرض توضيحي للـ CRM يوم الأحد',
  },
  {
    id: 3, clinicName: 'عيادة دبي لطب الأسنان', ownerName: 'د. أحمد الزهراني',
    phone: '+971501234567', phoneCountry: 'AE', city: 'دبي',
    status: 'payment' as const, hasUpsell: true,
    trialStartedAt: '2026-06-15', trialEndsAt: '2026-06-22',
    notes: 'وافق على الباقة السنوية — بانتظار تحويل Wise',
  },
  {
    id: 4, clinicName: 'عيادة الدوحة للتقويم', ownerName: 'د. نورة القحطاني',
    phone: '+97433123456', phoneCountry: 'QA', city: 'الدوحة',
    status: 'closed' as const, hasUpsell: true,
    trialStartedAt: '2026-06-01', trialEndsAt: '2026-06-08',
    notes: 'تم الإغلاق — عميل VIP يحوّل أصدقاءه',
  },
  {
    id: 5, clinicName: 'عيادة الكويت ل تجميل الأسنان', ownerName: 'د. فهد الأحمدي',
    phone: '+96551234567', phoneCountry: 'KW', city: 'الكويت',
    status: 'churned' as const, hasUpsell: false,
    trialStartedAt: '2026-05-20', trialEndsAt: '2026-05-27',
    notes: 'لم يكمل التجربة — أعيد الاتصال بعد شهر',
  },
] as const;
