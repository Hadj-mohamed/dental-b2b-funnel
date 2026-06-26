/**
 * ============================================================================
 * LandingPage — VSL Sales Letter (B2B for Gulf Dental Clinic Owners)
 * ----------------------------------------------------------------------------
 * هيكل البيع: ألم → تفاقم → كشف → دليل → عرض لا يُقاوم → أب سيل → إغلاق
 * ============================================================================
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Zap, TrendingUp, Wallet, Users, CalendarX, BarChart3,
  MessageCircle, ArrowLeft, Check, Clock, Star, AlertCircle,
  Sparkles, Infinity as InfinityIcon, Server, Lock, ChevronDown,
} from 'lucide-react';
import { BRAND, OFFER, CONTACT } from '../vertical.config';
import { supabase, CRM_TABLE } from '../supabase';
import SmartPhoneInput, { type PhoneResult } from '../components/SmartPhoneInput';
import PaymentMethods from '../components/PaymentMethods';
import UpsellCard from '../components/UpsellCard';

interface LandingPageProps {
  onSubmitted: () => void;
}

export default function LandingPage({ onSubmitted }: LandingPageProps) {
  const [clinicName, setClinicName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState<PhoneResult>({
    fullPhone: '+966', country: 'SA', isValid: false, errorMessage: '',
  });
  const [hasUpsell, setHasUpsell] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const canSubmit =
    clinicName.trim() !== '' &&
    ownerName.trim() !== '' &&
    phone.isValid &&
    !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);

    try {
      await supabase.from(CRM_TABLE).insert({
        clinic_name: clinicName,
        owner_name: ownerName,
        phone: phone.fullPhone,
        phone_country: phone.country,
        status: 'diagnosis',
        has_upsell: hasUpsell,
        trial_started_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('[Landing] insert failed (non-fatal):', err);
    } finally {
      setIsSubmitting(false);
      setShowPayment(true);
    }
  };

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="bg-white">

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-primary via-primary to-slate-900 text-white">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold text-secondary">تجربة مجانية 7 أيام — بلا بطاقة ائتمان</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              هل تتبخر ميزانية إعلانات عيادتك
              <br />
              <span className="text-secondary">دون مواعيد مؤكدة تكافئها؟</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              نظام حجز ومتابعة مؤتمت باسم عيادتك — يلتقط كل lead، يذكّر كل مريض
              عبر واتساب، ويعطيك أرقاماً حقيقية تكشف أين يذهب كل ريال.
              <br />
              <strong className="text-white">جرّبه 7 أيام كاملة مجاناً قبل أن تدفع دولاراً واحداً.</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                { icon: InfinityIcon, text: 'ملكية دائمة' },
                { icon: Server, text: 'استضافة سحابية مجانية' },
                { icon: Wallet, text: '0 اشتراكات خفية' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <Icon className="w-4 h-4 text-secondary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <a
              href="#trial-form"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-secondary/30 transition-all mt-8 text-lg"
            >
              ابدأ تجربتك المجانية الآن
              <ArrowLeft className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===================== PAIN POINTS ===================== */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
              4 أسباب تجعل عيادتك تخسر مرضاً جلبتهم بمئات الريالات
            </h2>
            <p className="text-slate-500">كل واحدة منها قابلة للحل — لكنها تعمل بصمت ضدك الآن</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Wallet, title: 'تسرب الإعلانات', desc: 'تنفق آلاف الريالات على Meta و Google، لكن الـ leads تتسرب لأن الرد متأخر أو البيانات تضيع في ورقة.' },
              { icon: Users, title: 'ضياع المراجعين بعد الإغلاق', desc: 'بعد الحجز الأول، لا نظام onboarding يمنع المريض من الذهاب لمنافسك. كل مريض ضائع = ميزانية إعلان مهدر.' },
              { icon: CalendarX, title: 'تبخر المواعيد', desc: '30% من مواعيدك لا يحضرها المريض — بدون نظام تذكير آلي، كل موعد ضائع = إيراد مهدور + وقت طبيب.' },
              { icon: BarChart3, title: 'أرقام غائبة', desc: 'لا تعرف أي قناة تجلب أفضل المرضى. قراراتك مبنية على الحدس لا البيانات. تخمين مكلف.' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SOLUTION ===================== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            الحل: نظام واحد يلتقط، يذكّر، ويكشف الأرقام
          </h2>
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto">
            ليس قالباً جاهزاً — بل نظام ملكية دائمة يحمل اسم عيادتك، يعمل 24/7 بدون موظف إضافي.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Zap, title: 'التقاط تلقائي', desc: 'كل lead يدخل النظام بدرجة حرارة، يُصنّف تلقائياً HOT/WARM/COLD' },
              { icon: MessageCircle, title: 'تذكير واتساب', desc: 'رسائل Spintax متغيّرة تخفض الغياب من 30% إلى أقل من 8%' },
              { icon: TrendingUp, title: 'أرقام صافية', desc: 'Dashboard يربط الإيرادات بالمصدر — تعرف أين تضاعف الإنفاق' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl p-5 text-right">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-primary mb-1">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OFFER ===================== */}
      <section className="py-16 px-4 bg-gradient-to-bl from-primary to-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">عرض لا يُقاوم</h2>
          <p className="text-slate-300 mb-8">
            جرّب النظام 7 أيام كاملة بمزايا كاملة — بلا بطاقة ائتمان، بلا التزام.
            إن لم ترَ نتائج، احذفه ولا تدفع شيئاً.
          </p>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-bold">{OFFER.trialDays} أيام تجربة كاملة</span>
            </div>
            <div className="text-4xl font-bold mb-1">مجاناً</div>
            <div className="text-slate-400 text-sm mb-6">بلا بطاقة ائتمان · بلا التزام</div>
            <div className="border-t border-white/10 pt-6">
              <div className="text-sm text-slate-300 mb-2">بعد التجربة:</div>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <div className="text-2xl font-bold text-secondary">{OFFER.monthlyPrice}</div>
                  <div className="text-xs text-slate-400">{OFFER.currency_ar}/شهر</div>
                </div>
                <div className="text-slate-500">أو</div>
                <div>
                  <div className="text-2xl font-bold text-secondary">{OFFER.yearlyPrice}</div>
                  <div className="text-xs text-slate-400">{OFFER.currency_ar}/سنة (وفّر {OFFER.monthlyPrice * 12 - OFFER.yearlyPrice})</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                + أسبوع كامل من التعديلات المجانية المخصصة بعد التفعيل
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRIAL FORM ===================== */}
      <section id="trial-form" className="py-16 px-4 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">

            <AnimatePresence mode="wait">
              {!showPayment ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-xl font-bold text-primary mb-1 text-center">
                    ابدأ تجربتك المجانية الآن
                  </h2>
                  <p className="text-sm text-slate-500 text-center mb-6">
                    املأ البيانات — وسيتم تفعيل نظامك خلال 24 ساعة
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Clinic name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-slate-700">اسم العيادة</label>
                      <input
                        type="text"
                        required
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="مثال: عيادة الابتسامة الذهبية"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
                      />
                    </div>

                    {/* Owner name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-slate-700">اسم المسؤول</label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="مثال: د. خالد العتيبي"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
                      />
                    </div>

                    {/* Smart Phone Input */}
                    <SmartPhoneInput value={phone.fullPhone} onChange={setPhone} />

                    {/* Upsell */}
                    <UpsellCard enabled={hasUpsell} onToggle={setHasUpsell} />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all ${
                        canSubmit
                          ? 'bg-secondary hover:bg-secondary-hover text-white shadow-lg shadow-secondary/30 cursor-pointer'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          جارٍ التفعيل...
                        </>
                      ) : (
                        <>
                          فعّل التجربة المجانية
                          <ArrowLeft className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    {!canSubmit && !isSubmitting && (
                      <p className="text-xs text-slate-400 text-center">
                        أكمل البيانات + رقم هاتف صحيح لتفعيل الزر
                      </p>
                    )}
                    <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" />
                      بياناتك محمية — لن نشاركها مع أي طرف
                    </p>
                  </form>
                </motion.div>
              ) : (
                /* ===================== PAYMENT CONFIRMATION ===================== */
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mb-3">
                      <Check className="w-7 h-7 text-emerald-600" strokeWidth={3} />
                    </div>
                    <h2 className="text-xl font-bold text-primary">تم تسجيلك في التجربة! 🎉</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      تجربتك مدتها {OFFER.trialDays} أيام — تبدأ الآن.
                      <br />
                      لاحقاً، اختر طريقة الدفع المناسبة لبلدك للاشتراك بعد التجربة.
                    </p>
                  </div>

                  <PaymentMethods country={phone.country} />

                  <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-slate-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      <strong>ماذا يحدث الآن؟</strong>
                    </div>
                    <ul className="space-y-1 pr-6">
                      <li>• فريقنا سيتواصل معك خلال 24 ساعة لتفعيل النظام باسم عيادتك</li>
                      <li>• ستحصل على رابط CRM خاص + تدريب مجاني للموظفين</li>
                      <li>• خلال 7 أيام، ستشاهد النظام يعمل بكامل مزاياه</li>
                      {hasUpsell && <li>• ✨ المساعد الذكي سيُفعّل معك من اليوم الأول</li>}
                    </ul>
                  </div>

                  <button
                    onClick={onSubmitted}
                    className="w-full mt-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    انتقل إلى لوحة المتابعة →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-primary text-center mb-10">عيادات وثقت بالنظام</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: 'د. سارة — الرياض', text: 'خلال 6 أسابيع، تضاعفت المواعيد المؤكدة. نظام التذكير وحده وفّر لي موظفة كاملة.', result: '+127% مواعيد' },
              { name: 'د. فهد — جدة', text: 'انخفض تكلفة الاكتساب من 850 إلى 290 ريال. أعرف بالضبط أي إعلان يستحق المال.', result: '−66% تكلفة' },
              { name: 'د. نورة — الدمام', text: 'أفضل قرار: ملكية دائمة بدون اشتراك. لو أوقفت الدفع، يبقى نظامي شغّالاً.', result: 'ملكية دائمة' },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">"{t.text}"</p>
                <div className="text-xs font-bold text-secondary bg-secondary/10 inline-block px-2 py-1 rounded mb-2">{t.result}</div>
                <div className="text-xs font-bold text-primary">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER CTA ===================== */}
      <section className="py-12 px-4 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">كل يوم بدون نظام = مرضى يذهبون لمنافسك</h2>
          <p className="text-slate-300 text-sm mb-6">ابدأ التجربة المجانية الآن — لا تخسر شيئاً، وربما تكسب عيادة ممتلئة</p>
          <a href="#trial-form" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-white font-bold px-6 py-3 rounded-xl shadow-lg">
            ابدأ الآن <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
