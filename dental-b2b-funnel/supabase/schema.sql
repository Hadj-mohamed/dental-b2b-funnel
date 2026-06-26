-- ============================================================================
-- B2B Dental Funnel — Supabase Schema
-- Table: clinic_leads (pipeline tracking)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.clinic_leads (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

    clinic_name       TEXT NOT NULL,
    owner_name        TEXT NOT NULL,
    phone             TEXT NOT NULL,
    phone_country     TEXT NOT NULL DEFAULT 'SA',
    email             TEXT,
    city              TEXT,

    status            TEXT NOT NULL DEFAULT 'diagnosis'
        CHECK (status IN ('diagnosis','live_trial','payment','closed','churned')),

    has_upsell        BOOLEAN NOT NULL DEFAULT false,

    trial_started_at  TIMESTAMPTZ,
    trial_ends_at     TIMESTAMPTZ,
    notes             TEXT
);

CREATE INDEX IF NOT EXISTS idx_clinic_leads_status    ON public.clinic_leads (status);
CREATE INDEX IF NOT EXISTS idx_clinic_leads_phone     ON public.clinic_leads (phone);
CREATE INDEX IF NOT EXISTS idx_clinic_leads_created_desc ON public.clinic_leads (created_at DESC);

ALTER TABLE public.clinic_leads ENABLE ROW LEVEL SECURITY;

-- anon INSERT (funnel submissions)
DROP POLICY IF EXISTS "anon_insert_clinic" ON public.clinic_leads;
CREATE POLICY "anon_insert_clinic"
    ON public.clinic_leads FOR INSERT TO anon WITH CHECK (true);

-- authenticated SELECT + UPDATE
DROP POLICY IF EXISTS "auth_select_clinic" ON public.clinic_leads;
CREATE POLICY "auth_select_clinic"
    ON public.clinic_leads FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_clinic" ON public.clinic_leads;
CREATE POLICY "auth_update_clinic"
    ON public.clinic_leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- ============================================================================
-- DONE
-- ============================================================================
