/**
 * ============================================================================
 * SmartPhoneInput — كشف الدولة التلقائي + علم + تحقق صارم
 * ----------------------------------------------------------------------------
 * يقرأ أول 3-4 أرقام (رمز الدولة) ويحدد الدولة تلقائياً:
 *   966 → 🇸🇦 السعودية
 *   971 → 🇦🇪 الإمارات
 *   974 → 🇶🇦 قطر
 *   965 → 🇰🇼 الكويت
 * يعرض العلم داخل الـ Input بشكل أنيق.
 * يتحقق من طول الرقم وصيغته حسب كل دولة.
 * يُحوّل الحدود للأحمر التحذيري عند الخطأ + يُعطّل زر الإرسال.
 * ============================================================================
 */

import { useState, useEffect, useMemo } from 'react';
import { COUNTRY_RULES, type CountryPhoneRule } from '../types';

export interface PhoneResult {
  fullPhone: string;       // '+966512345678'
  country: string;         // 'SA'
  isValid: boolean;
  errorMessage: string;
}

interface SmartPhoneInputProps {
  value: string;
  onChange: (result: PhoneResult) => void;
  label?: string;
}

// خريطة عكسية: من رمز الدولة إلى ISO
const CODE_TO_ISO: Record<string, string> = {
  '966': 'SA',
  '971': 'AE',
  '974': 'QA',
  '965': 'KW',
};

export default function SmartPhoneInput({
  value,
  onChange,
  label = 'رقم الواتساب',
}: SmartPhoneInputProps) {
  // value يأتي بصيغة '+9665...' أو '5...' — نطبّعه
  const { countryCode, localNumber } = useMemo(() => {
    const digits = (value || '').replace(/\D/g, '');
    // لو يبدأ بـ 966/971/974/965
    for (const code of ['966', '971', '974', '965']) {
      if (digits.startsWith(code)) {
        return { countryCode: code, localNumber: digits.slice(code.length) };
      }
    }
    // افتراضي: السعودية
    return { countryCode: '966', localNumber: digits };
  }, [value]);

  const rule: CountryPhoneRule =
    COUNTRY_RULES[CODE_TO_ISO[countryCode] ?? 'SA'] ?? COUNTRY_RULES.SA;

  // Validation
  const trimmed = localNumber.slice(0, rule.localLength);
  const isValid = trimmed.length === rule.localLength && rule.localRegex.test(trimmed);
  const isEmpty = trimmed.length === 0;
  const errorMessage = isEmpty ? '' : isValid ? '' : rule.invalidMessageAr;

  // إشعار الأب بالتغييرات
  useEffect(() => {
    const fullPhone = `+${countryCode}${trimmed}`;
    onChange({
      fullPhone,
      country: rule.iso,
      isValid,
      errorMessage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, trimmed, isValid]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    const newFull = `+${newCode}${trimmed}`;
    onChange({
      fullPhone: newFull,
      country: CODE_TO_ISO[newCode] ?? 'SA',
      isValid,
      errorMessage,
    });
  };

  const handleLocalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, rule.localLength);
    const newFull = `+${countryCode}${digits}`;
    onChange({
      fullPhone: newFull,
      country: rule.iso,
      isValid:
        digits.length === rule.localLength && rule.localRegex.test(digits),
      errorMessage:
        digits.length === 0
          ? ''
          : digits.length === rule.localLength && rule.localRegex.test(digits)
            ? ''
            : rule.invalidMessageAr,
    });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-slate-700">{label}</label>

      <div
        className={`flex rounded-xl overflow-hidden border-2 transition-all bg-white ${
          isEmpty
            ? 'border-slate-200 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20'
            : isValid
              ? 'border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20'
              : 'border-rose-400 focus-within:ring-2 focus-within:ring-rose-400/20'
        }`}
        dir="ltr"
      >
        {/* Country selector with flag */}
        <div className="relative flex items-center bg-slate-50 border-r border-slate-200">
          <span className="text-xl pl-1 ml-2 pointer-events-none">{rule.flag}</span>
          <select
            value={countryCode}
            onChange={handleCountryChange}
            className="appearance-none bg-transparent text-sm font-bold text-slate-700 py-3 pl-2 pr-6 cursor-pointer outline-none"
          >
            {Object.values(COUNTRY_RULES).map((r) => (
              <option key={r.iso} value={r.code}>
                {r.flag} {r.dialDisplay}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <svg
            className="w-3 h-3 text-slate-400 absolute right-1.5 pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Local number input */}
        <input
          type="tel"
          inputMode="numeric"
          value={trimmed}
          onChange={handleLocalInput}
          placeholder={rule.placeholder}
          maxLength={rule.localLength}
          className="flex-1 text-sm font-mono text-slate-800 px-3 py-3 outline-none bg-transparent text-left"
          dir="ltr"
        />
      </div>

      {/* Validation feedback */}
      {errorMessage && (
        <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-rose-500" />
          {errorMessage}
        </p>
      )}
      {isValid && (
        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
          ✓ رقم {rule.nameAr} صحيح
        </p>
      )}
    </div>
  );
}
