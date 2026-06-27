/**
 * ============================================================================
 * CRMPage — Pipeline Tracker (مرحلة التشخيص → التجربة → الدفع → الإغلاق)
 * ----------------------------------------------------------------------------
 * لوحة تتبع العيادات المسجلة للتجربة، تحاكي منهجية التشخيص المتقدم.
 * كل عيادة تمر بمرحلة من 4 مراحل + حالة "churned" للتخلي.
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope, Activity, CreditCard, CheckCircle2, Clock,
  Phone, MapPin, Sparkles, AlertCircle, RefreshCw, Plus,
} from 'lucide-react';
import { BRAND, PIPELINE_STAGES, DEMO_CLINICS, CONTACT } from '../vertical.config';
import { supabase, CRM_TABLE } from '../supabase';
import type { ClinicLead, LeadStatus } from '../types';

const STATUS_META: Record<string, { label_ar: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  diagnosis:  { label_ar: 'مرحلة التشخيص',  color: 'blue',    icon: Stethoscope },
  live_trial: { label_ar: 'التجربة الحية',  color: 'amber',   icon: Activity },
  payment:    { label_ar: 'الدفع والإغلاق', color: 'purple',  icon: CreditCard },
  closed:     { label_ar: 'تم الإغلاق',     color: 'emerald', icon: CheckCircle2 },
  churned:    { label_ar: 'تخلى',           color: 'slate',   icon: AlertCircle },
};

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  purple:  { bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  slate:   { bg: 'bg-slate-100',  text: 'text-slate-500',   border: 'border-slate-200' },
};

export default function CRMPage() {
  const [clinics, setClinics] = useState<ClinicLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    fetchClinics();
    // Realtime subscription
    const channel = supabase
      .channel(`${CRM_TABLE}_changes`)
      .on('postgres_changes', { event: '*', table: CRM_TABLE }, () => fetchClinics())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchClinics = async () => {
    try {
      const { data, error } = await supabase
        .from(CRM_TABLE)
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        // Demo mode
        setIsDemo(true);
        setClinics(DEMO_CLINICS as unknown as ClinicLead[]);
      } else {
        setIsDemo(false);
        setClinics(data as ClinicLead[]);
      }
    } catch {
      setIsDemo(true);
      setClinics(DEMO_CLINICS as unknown as ClinicLead[]);
    } finally {
      setLoading(false);
    }
  };

  // Stats per stage
  const stats = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    count: clinics.filter((c) => c.status === stage.id).length,
  }));
  const churnedCount = clinics.filter((c) => c.status === 'churned').length;

  // Trial days remaining
  const getTrialDaysLeft = (trialEndsAt?: string): number => {
    if (!trialEndsAt) return 0;
    const end = new Date(trialEndsAt).getTime();
    const now = Date.now();
    return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6" dir="rtl">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">لوحة متابعة العيادات</h1>
            <p className="text-sm text-slate-500">{BRAND.name_ar} — Pipeline Tracker</p>
          </div>
          <div className="flex items-center gap-2">
            {isDemo && (
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-200">
                Demo Mode
              </span>
            )}
            <button onClick={fetchClinics} className="text-xs font-bold bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" /> تحديث
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = s.icon === 'Stethoscope' ? Stethoscope : s.icon === 'Activity' ? Activity : s.icon === 'CreditCard' ? CreditCard : CheckCircle2;
          const colors = COLOR_CLASSES[s.color];
          return (
            <div key={s.id} className={`rounded-xl border p-4 ${colors.border} ${colors.bg}`}>
              <Icon className={`w-5 h-5 ${colors.text} mb-2`} />
              <div className={`text-2xl font-bold ${colors.text}`}>{s.count}</div>
              <div className="text-xs text-slate-500">{s.label_ar}</div>
            </div>
          );
        })}
        <div className="rounded-xl border border-slate-200 bg-slate-100 p-4">
          <AlertCircle className="w-5 h-5 text-slate-400 mb-2" />
          <div className="text-2xl font-bold text-slate-400">{churnedCount}</div>
          <div className="text-xs text-slate-500">تخلّى</div>
        </div>
      </div>

      {/* Clinics list */}
      <div className="max-w-7xl mx-auto space-y-3">
        {clinics.map((clinic, idx) => {
          const meta = STATUS_META[clinic.status] ?? STATUS_META.diagnosis;
          const Icon = meta.icon;
          const colors = COLOR_CLASSES[meta.color];
          const daysLeft = getTrialDaysLeft(clinic.trialEndsAt);

          return (
            <motion.div
              key={clinic.id ?? idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white rounded-2xl border p-4 sm:p-5 ${colors.border} ${clinic.status === 'churned' ? 'opacity-60' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Status badge */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border} self-start shrink-0`}>
                  <Icon className="w-3.5 h-3.5" />
                  {meta.label_ar}
                </div>

                {/* Clinic info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-primary text-sm sm:text-base">{clinic.clinicName}</h3>
                    {clinic.hasUpsell && (
                      <span className="text-[10px] font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{clinic.ownerName}</span>
                    <span className="flex items-center gap-1" dir="ltr">
                      <Phone className="w-3 h-3" /> {clinic.phone}
                    </span>
                    {clinic.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {clinic.city}
                      </span>
                    )}
                  </div>
                  {clinic.notes && (
                    <p className="text-xs text-slate-400 mt-1.5 italic">📝 {clinic.notes}</p>
                  )}
                </div>

                {/* Trial countdown */}
                {clinic.status === 'live_trial' && (
                  <div className="shrink-0 text-center bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                    <Clock className="w-4 h-4 text-amber-500 mx-auto mb-0.5" />
                    <div className={`text-lg font-bold ${daysLeft <= 2 ? 'text-rose-500' : 'text-amber-600'}`}>{daysLeft}</div>
                    <div className="text-[10px] text-slate-400">يوم متبقٍ</div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {clinics.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Plus className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">لا توجد عيادات مسجلة بعد</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-8 text-center text-xs text-slate-400">
        {BRAND.name_ar} · {CONTACT.email}
      </div>
    </div>
  );
}
