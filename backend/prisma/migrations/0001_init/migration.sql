Loaded Prisma config from prisma.config.ts.

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('adjuster', 'legal', 'admin');

-- CreateEnum
CREATE TYPE "policy_type" AS ENUM ('fire', 'liability', 'housing_fire');

-- CreateEnum
CREATE TYPE "claim_type" AS ENUM ('A', 'B', 'C');

-- CreateEnum
CREATE TYPE "claim_status" AS ENUM ('wait', 'done', 'sent', 'transfer', 'paid');

-- CreateEnum
CREATE TYPE "event_status" AS ENUM ('done', 'now', 'wait');

-- CreateEnum
CREATE TYPE "standard_source" AS ENUM ('standard_cost', 'price_index');

-- CreateEnum
CREATE TYPE "doc_type" AS ENUM ('exemption_notice', 'litigation_brief', 'adjustment_opinion', 'civil_response');

-- CreateEnum
CREATE TYPE "doc_status" AS ENUM ('draft', 'wait', 'done', 'transfer');

-- CreateEnum
CREATE TYPE "decision" AS ENUM ('approve', 'modify', 'reclassify', 'reject');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT,
    "name" VARCHAR(100) NOT NULL,
    "role" "user_role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deactivated_at" TIMESTAMPTZ,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complexes" (
    "id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "address" TEXT,
    "builder" VARCHAR(100),
    "built_at" DATE,
    "warranty_yr" SMALLINT NOT NULL DEFAULT 10,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "complexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policies" (
    "id" UUID NOT NULL,
    "complex_id" UUID NOT NULL,
    "policy_type" "policy_type" NOT NULL,
    "holder_name" VARCHAR(100),
    "valid_from" DATE,
    "valid_until" DATE,
    "deductible" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claims" (
    "id" VARCHAR(20) NOT NULL,
    "complex_id" UUID NOT NULL,
    "policy_id" UUID,
    "assignee_id" UUID,
    "claimant_name" VARCHAR(100),
    "description" TEXT NOT NULL,
    "type" "claim_type" NOT NULL,
    "status" "claim_status" NOT NULL,
    "amount" INTEGER,
    "ai_confidence" DECIMAL(4,3),
    "claimed_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_photos" (
    "id" UUID NOT NULL,
    "claim_id" VARCHAR(20) NOT NULL,
    "label" VARCHAR(100),
    "file_url" TEXT NOT NULL,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,
    "annotations" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "claim_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_ai_reasons" (
    "id" UUID NOT NULL,
    "claim_id" VARCHAR(20) NOT NULL,
    "reason_text" TEXT NOT NULL,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "claim_ai_reasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_precedents" (
    "id" UUID NOT NULL,
    "claim_id" VARCHAR(20) NOT NULL,
    "case_number" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "claim_precedents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claim_events" (
    "id" UUID NOT NULL,
    "claim_id" VARCHAR(20) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "event_at" TIMESTAMPTZ,
    "status" "event_status" NOT NULL,
    "step_number" SMALLINT,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "claim_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_a_details" (
    "claim_id" VARCHAR(20) NOT NULL,
    "defect_type" VARCHAR(200),
    "warranty_remaining" VARCHAR(100),
    "total_claim_est" BIGINT,
    "unit_claim_est" BIGINT,
    "is_exemption" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "type_a_details_pkey" PRIMARY KEY ("claim_id")
);

-- CreateTable
CREATE TABLE "type_b_details" (
    "claim_id" VARCHAR(20) NOT NULL,
    "applicable_clause" TEXT,
    "objection_deadline" DATE,
    "current_step" SMALLINT NOT NULL DEFAULT 0,
    "flow_steps" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "type_b_details_pkey" PRIMARY KEY ("claim_id")
);

-- CreateTable
CREATE TABLE "estimations" (
    "claim_id" VARCHAR(20) NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "calc_seconds" INTEGER,
    "vendor_estimate" INTEGER,
    "depreciation" INTEGER NOT NULL DEFAULT 0,
    "indirect_rate" DECIMAL(4,3),
    "final_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "estimations_pkey" PRIMARY KEY ("claim_id")
);

-- CreateTable
CREATE TABLE "estimation_items" (
    "id" SERIAL NOT NULL,
    "estimation_id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200),
    "quantity" DECIMAL(10,2) NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "standard_src" "standard_source",
    "subtotal" INTEGER NOT NULL,
    "is_selected" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "estimation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL,
    "claim_id" VARCHAR(20) NOT NULL,
    "doc_type" "doc_type" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT,
    "file_url" TEXT,
    "status" "doc_status",
    "reviewed_by" VARCHAR(100),
    "reviewed_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "approvals" (
    "id" UUID NOT NULL,
    "claim_id" VARCHAR(20) NOT NULL,
    "approver_id" UUID NOT NULL,
    "decision" "decision" NOT NULL,
    "approved_amount" INTEGER,
    "comment" TEXT,
    "decided_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "approvals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE INDEX "complexes_name_idx" ON "complexes"("name");

-- CreateIndex
CREATE INDEX "policies_complex_id_idx" ON "policies"("complex_id");

-- CreateIndex
CREATE INDEX "claims_type_idx" ON "claims"("type");

-- CreateIndex
CREATE INDEX "claims_status_idx" ON "claims"("status");

-- CreateIndex
CREATE INDEX "claims_claimed_at_idx" ON "claims"("claimed_at" DESC);

-- CreateIndex
CREATE INDEX "claims_complex_id_idx" ON "claims"("complex_id");

-- CreateIndex
CREATE INDEX "claim_photos_claim_id_idx" ON "claim_photos"("claim_id");

-- CreateIndex
CREATE INDEX "claim_ai_reasons_claim_id_idx" ON "claim_ai_reasons"("claim_id");

-- CreateIndex
CREATE INDEX "claim_precedents_claim_id_idx" ON "claim_precedents"("claim_id");

-- CreateIndex
CREATE INDEX "claim_events_claim_id_idx" ON "claim_events"("claim_id");

-- CreateIndex
CREATE INDEX "estimation_items_estimation_id_idx" ON "estimation_items"("estimation_id");

-- CreateIndex
CREATE INDEX "documents_claim_id_idx" ON "documents"("claim_id");

-- CreateIndex
CREATE INDEX "documents_doc_type_idx" ON "documents"("doc_type");

-- CreateIndex
CREATE INDEX "approvals_claim_id_idx" ON "approvals"("claim_id");

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_complex_id_fkey" FOREIGN KEY ("complex_id") REFERENCES "complexes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_complex_id_fkey" FOREIGN KEY ("complex_id") REFERENCES "complexes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_policy_id_fkey" FOREIGN KEY ("policy_id") REFERENCES "policies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim_photos" ADD CONSTRAINT "claim_photos_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim_ai_reasons" ADD CONSTRAINT "claim_ai_reasons_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim_precedents" ADD CONSTRAINT "claim_precedents_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claim_events" ADD CONSTRAINT "claim_events_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_a_details" ADD CONSTRAINT "type_a_details_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_b_details" ADD CONSTRAINT "type_b_details_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimations" ADD CONSTRAINT "estimations_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimation_items" ADD CONSTRAINT "estimation_items_estimation_id_fkey" FOREIGN KEY ("estimation_id") REFERENCES "estimations"("claim_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- ─── updated_at trigger function ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'users','complexes','policies','claims',
      'claim_photos','claim_ai_reasons','claim_precedents','claim_events',
      'type_a_details','type_b_details','estimations','estimation_items',
      'documents','approvals'
    ])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- ─── Views ───

CREATE VIEW v_monthly_kpi AS
SELECT
  to_char(claimed_at, 'YYYY-MM')          AS year_month,
  COUNT(*)::int                            AS total_claims,
  COUNT(*) FILTER (WHERE type = 'A')::int  AS type_a,
  COUNT(*) FILTER (WHERE type = 'B')::int  AS type_b,
  COUNT(*) FILTER (WHERE type = 'C')::int  AS type_c,
  COUNT(*) FILTER (WHERE status = 'wait')::int AS pending_approval
FROM claims
GROUP BY 1;

CREATE VIEW v_claim_detail AS
SELECT
  c.*,
  cx.name         AS complex_name,
  cx.builder,
  cx.built_at,
  p.policy_type,
  p.deductible,
  u.name          AS assignee_name,
  e.total_amount  AS est_total,
  e.final_amount  AS est_final,
  e.vendor_estimate
FROM claims c
LEFT JOIN complexes cx ON cx.id = c.complex_id
LEFT JOIN policies p   ON p.id = c.policy_id
LEFT JOIN users u      ON u.id = c.assignee_id
LEFT JOIN estimations e ON e.claim_id = c.id;
