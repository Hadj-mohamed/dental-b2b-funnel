/**
 * ============================================================================
 * PaymentMethods — بوابات دفع ذكية حسب الدولة
 * ----------------------------------------------------------------------------
 * تعرض وسائل الدفع الشائعة لكل دولة خليجية تلقائياً بناءً على رمز الهاتف.
 *
 * ⚠️ ملاحظة هندسية — أماكن حقن روابط الدفع الحقيقية:
 *   • روابط Wise    → ابحث عن "INJECT_WISE_LINK"
 *   • روابط PayPal  → ابحث عن "INJECT_PAYPAL_LINK"
 *   استبدل القيم الفارغة بروابط بوابة الدفع الخاصة بك قبل الإنتاج.
 * ============================================================================
 */

import { CreditCard, Wallet, Apple, Building2, Smartphone } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name_ar: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'online' | 'offline';
  // ⚠️ INJECT_WISE_LINK / INJECT_PAYPAL_LINK — ضع روابطك هنا
  checkoutUrl?: string;
}

const PAYMENTS_BY_COUNTRY: Record<string, PaymentMethod[]> = {
  SA: [
    { id: 'mada',         name_ar: 'مدى',          icon: CreditCard, type: 'online' },
    { id: 'apple_pay',    name_ar: 'Apple Pay',    icon: Apple,      type: 'online' },
    { id: 'stc_pay',      name_ar: 'STC Pay',      icon: Smartphone, type: 'online' },
    { id: 'tabby',        name_ar: 'تابي (قسّط)',   icon: Wallet,     type: 'online' },
    {
      id: 'wise',
      name_ar: 'تحويل Wise',
      icon: Building2,
      type: 'offline',
      // ⚠️ INJECT_WISE_LINK — استبدل برابط حساب Wise الخاص بشركتك
      checkoutUrl: '',
    },
    {
      id: 'paypal',
      name_ar: 'PayPal',
      icon: Wallet,
      type: 'online',
      // ⚠️ INJECT_PAYPAL_LINK — استبدل برابط PayPal Checkout الخاص بك
      checkoutUrl: '',
    },
  ],
  AE: [
    { id: 'visa',         name_ar: 'Visa / Mastercard', icon: CreditCard, type: 'online' },
    { id: 'apple_pay',    name_ar: 'Apple Pay',          icon: Apple,      type: 'online' },
    { id: 'tabby',        name_ar: 'تابي (قسّط)',         icon: Wallet,     type: 'online' },
    {
      id: 'wise',
      name_ar: 'تحويل Wise',
      icon: Building2,
      type: 'offline',
      // ⚠️ INJECT_WISE_LINK
      checkoutUrl: '',
    },
  ],
  QA: [
    { id: 'visa',         name_ar: 'Visa / Mastercard', icon: CreditCard, type: 'online' },
    { id: 'apple_pay',    name_ar: 'Apple Pay',          icon: Apple,      type: 'online' },
    {
      id: 'wise',
      name_ar: 'تحويل Wise',
      icon: Building2,
      type: 'offline',
      // ⚠️ INJECT_WISE_LINK
      checkoutUrl: '',
    },
  ],
  KW: [
    { id: 'knet',         name_ar: 'KNET',               icon: CreditCard, type: 'online' },
    { id: 'visa',         name_ar: 'Visa / Mastercard', icon: CreditCard, type: 'online' },
    { id: 'apple_pay',    name_ar: 'Apple Pay',          icon: Apple,      type: 'online' },
    {
      id: 'wise',
      name_ar: 'تحويل Wise',
      icon: Building2,
      type: 'offline',
      // ⚠️ INJECT_WISE_LINK
      checkoutUrl: '',
    },
  ],
};

interface PaymentMethodsProps {
  country: string;  // 'SA' | 'AE' | 'QA' | 'KW'
  onMethodSelect?: (methodId: string, checkoutUrl?: string) => void;
  selectedMethod?: string;
}

export default function PaymentMethods({
  country,
  onMethodSelect,
  selectedMethod,
}: PaymentMethodsProps) {
  const methods = PAYMENTS_BY_COUNTRY[country] ?? PAYMENTS_BY_COUNTRY.SA;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
        <Wallet className="w-4 h-4 text-secondary" />
        <span>طرق الدفع المتاحة في بلدك</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {methods.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedMethod === m.id;
          const isOffline = m.type === 'offline';
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onMethodSelect?.(m.id, m.checkoutUrl)}
              className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'border-secondary bg-secondary/5 text-primary shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              } ${isOffline ? 'border-dashed' : ''}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{m.name_ar}</span>
              {isOffline && (
                <span className="text-[9px] text-slate-400 mr-auto">(تحويل)</span>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-400 leading-relaxed">
        🔒 جميع المعاملات مشفّرة بـ SSL 256-bit. لا نخزّن بيانات بطاقتك.
        للتحويلات البنكية عبر Wise، سيصلك رابط التحويل بعد تأكيد الطلب.
      </p>
    </div>
  );
}
