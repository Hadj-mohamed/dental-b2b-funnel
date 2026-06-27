/**
 * ============================================================================
 * UpsellCard — العرض التكميلي (AI Assistant) بنقرة واحدة
 * ============================================================================
 */

import { Sparkles, Check } from 'lucide-react';
import { OFFER } from '../vertical.config';

interface UpsellCardProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function UpsellCard({ enabled, onToggle }: UpsellCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 transition-all cursor-pointer ${
        enabled
          ? 'border-secondary bg-secondary/5 shadow-md'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
      onClick={() => onToggle(!enabled)}
    >
      <div className="flex items-start gap-3">
        {/* Toggle checkbox */}
        <div
          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
            enabled ? 'bg-secondary border-secondary' : 'bg-white border-slate-300'
          }`}
        >
          {enabled && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-secondary" />
            <h4 className="text-sm font-bold text-primary">{OFFER.upsellTitle_ar}</h4>
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
              +{OFFER.upsellPrice} {OFFER.currency_ar}/شهر
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-2">
            {OFFER.upsellDesc_ar}
          </p>
          <ul className="space-y-1">
            {[
              'يستقبل المكالمات والرسائل في أوقات الإغلاق تلقائياً',
              'يؤهل الحالات الطارئة ويحدد أولويتها',
              'يجدول المواعيد بدون تدخل بشري',
              'يرسل تقريراً صباحياً للعيادة بكل ما فات',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <Check className="w-3 h-3 text-secondary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
