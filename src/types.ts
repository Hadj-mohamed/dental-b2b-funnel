/**
 * ============================================================================
 * TYPES — B2B Dental Funnel
 * ============================================================================
 */

export type LeadStatus =
  | 'diagnosis'    // مرحلة التشخيص (سجلت للتجربة)
  | 'live_trial'   // مرحلة التجربة الحية
  | 'payment'      // مرحلة الدفع والإغلاق
  | 'closed'       // تم الإغلاق
  | 'churned';     // تخلى عن التجربة

export interface ClinicLead {
  id?: number;
  clinicName: string;
  ownerName: string;
  phone: string;
  phoneCountry: string;      // SA | AE | QA | KW
  email?: string;
  city?: string;
  trialStartedAt?: string;
  trialEndsAt?: string;      // +7 days from trialStartedAt
  status: LeadStatus;
  notes?: string;
  hasUpsell: boolean;        // AI assistant add-on
  createdAt?: string;
}

export type PageView = 'landing' | 'crm';

// ============================================================================
// COUNTRY PHONE RULES — Gulf countries
// ============================================================================
export interface CountryPhoneRule {
  code: string;              // '966'
  iso: string;               // 'SA'
  flag: string;              // '🇸🇦'
  nameAr: string;            // 'السعودية'
  nameEn: string;            // 'Saudi Arabia'
  dialDisplay: string;       // '+966'
  /**
   * Regex validates LOCAL number (without country code, without leading 0)
   * Saudi: 5XXXXXXXX (9 digits starting with 5)
   * UAE:   5XXXXXXXX (9 digits starting with 5)
   * Qatar: XXXXXXXX  (8 digits)
   * Kuwait: XXXXXXXX (8 digits)
   */
  localRegex: RegExp;
  localLength: number;
  placeholder: string;
  invalidMessageAr: string;
}

export const COUNTRY_RULES: Record<string, CountryPhoneRule> = {
  SA: {
    code: '966', iso: 'SA', flag: '🇸🇦',
    nameAr: 'السعودية', nameEn: 'Saudi Arabia',
    dialDisplay: '+966',
    localRegex: /^5\d{8}$/,
    localLength: 9,
    placeholder: '512345678',
    invalidMessageAr: 'رقم سعودي غير صحيح — يجب 9 أرقام تبدأ بـ 5',
  },
  AE: {
    code: '971', iso: 'AE', flag: '🇦🇪',
    nameAr: 'الإمارات', nameEn: 'United Arab Emirates',
    dialDisplay: '+971',
    localRegex: /^5\d{8}$/,
    localLength: 9,
    placeholder: '501234567',
    invalidMessageAr: 'رقم إماراتي غير صحيح — يجب 9 أرقام تبدأ بـ 5',
  },
  QA: {
    code: '974', iso: 'QA', flag: '🇶🇦',
    nameAr: 'قطر', nameEn: 'Qatar',
    dialDisplay: '+974',
    localRegex: /^[3-9]\d{7}$/,
    localLength: 8,
    placeholder: '33123456',
    invalidMessageAr: 'رقم قطري غير صحيح — يجب 8 أرقام',
  },
  KW: {
    code: '965', iso: 'KW', flag: '🇰🇼',
    nameAr: 'الكويت', nameEn: 'Kuwait',
    dialDisplay: '+965',
    localRegex: /^[569]\d{7}$/,
    localLength: 8,
    placeholder: '51234567',
    invalidMessageAr: 'رقم كويتي غير صحيح — يجب 8 أرقام',
  },
};
