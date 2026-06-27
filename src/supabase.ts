/**
 * ============================================================================
 * SUPABASE CLIENT — Fail-Safe (works without .env via placeholders)
 * ============================================================================
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL ?? '';
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!URL || !KEY) {
  console.warn('[supabase] Missing env vars — running in Demo mode. Add .env to connect.');
}

export const supabase: SupabaseClient = createClient(
  URL || 'https://placeholder.supabase.co',
  KEY || 'placeholder-anon-key',
  {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { params: { eventsPerSecond: 10 } },
  }
);

export const CRM_TABLE = 'clinic_leads';
