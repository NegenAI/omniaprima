import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_vehicles_specs_icon" AS ENUM('km', 'generic');
  CREATE TYPE "public"."enum_vehicles_formula" AS ENUM('lungo-termine', 'breve-termine', 'vendita');
  CREATE TYPE "public"."enum_vehicles_category" AS ENUM('auto', 'autocarro', 'furgone', 'piattaforma');
  CREATE TYPE "public"."enum_vehicles_price_unit" AS ENUM('mese', 'giorno', 'totale');
  CREATE TYPE "public"."enum_vehicles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__vehicles_v_version_specs_icon" AS ENUM('km', 'generic');
  CREATE TYPE "public"."enum__vehicles_v_version_formula" AS ENUM('lungo-termine', 'breve-termine', 'vendita');
  CREATE TYPE "public"."enum__vehicles_v_version_category" AS ENUM('auto', 'autocarro', 'furgone', 'piattaforma');
  CREATE TYPE "public"."enum__vehicles_v_version_price_unit" AS ENUM('mese', 'giorno', 'totale');
  CREATE TYPE "public"."enum__vehicles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'manager', 'editor');
  CREATE TABLE "vehicles_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_vehicles_specs_icon" DEFAULT 'generic',
  	"label" varchar
  );
  
  CREATE TABLE "vehicles_details_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "vehicles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar,
  	"description" varchar,
  	"formula" "enum_vehicles_formula",
  	"category" "enum_vehicles_category",
  	"image_id" integer,
  	"price_amount" numeric,
  	"price_unit" "enum_vehicles_price_unit" DEFAULT 'mese',
  	"details_advance" varchar,
  	"details_duration_value" varchar,
  	"details_duration_unit" varchar,
  	"details_mileage_value" varchar,
  	"details_mileage_unit" varchar,
  	"offer" boolean,
  	"featured" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_vehicles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "vehicles_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "vehicles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_vehicles_v_version_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__vehicles_v_version_specs_icon" DEFAULT 'generic',
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vehicles_v_version_details_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_vehicles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_formula" "enum__vehicles_v_version_formula",
  	"version_category" "enum__vehicles_v_version_category",
  	"version_image_id" integer,
  	"version_price_amount" numeric,
  	"version_price_unit" "enum__vehicles_v_version_price_unit" DEFAULT 'mese',
  	"version_details_advance" varchar,
  	"version_details_duration_value" varchar,
  	"version_details_duration_unit" varchar,
  	"version_details_mileage_value" varchar,
  	"version_details_mileage_unit" varchar,
  	"version_offer" boolean,
  	"version_featured" boolean,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__vehicles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_vehicles_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_vehicles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"vehicles_id" integer,
  	"team_members_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"town" varchar NOT NULL,
  	"street" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"footer_email" varchar NOT NULL,
  	"hours" varchar NOT NULL,
  	"facebook" varchar,
  	"instagram" varchar,
  	"google_rating" varchar,
  	"google_reviews_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "vehicles_specs" ADD CONSTRAINT "vehicles_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_details_features" ADD CONSTRAINT "vehicles_details_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vehicles_texts" ADD CONSTRAINT "vehicles_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_rels" ADD CONSTRAINT "vehicles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vehicles_rels" ADD CONSTRAINT "vehicles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_version_specs" ADD CONSTRAINT "_vehicles_v_version_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_version_details_features" ADD CONSTRAINT "_vehicles_v_version_details_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_parent_id_vehicles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v" ADD CONSTRAINT "_vehicles_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vehicles_v_texts" ADD CONSTRAINT "_vehicles_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_rels" ADD CONSTRAINT "_vehicles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_vehicles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vehicles_v_rels" ADD CONSTRAINT "_vehicles_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vehicles_fk" FOREIGN KEY ("vehicles_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locations" ADD CONSTRAINT "site_settings_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "vehicles_specs_order_idx" ON "vehicles_specs" USING btree ("_order");
  CREATE INDEX "vehicles_specs_parent_id_idx" ON "vehicles_specs" USING btree ("_parent_id");
  CREATE INDEX "vehicles_details_features_order_idx" ON "vehicles_details_features" USING btree ("_order");
  CREATE INDEX "vehicles_details_features_parent_id_idx" ON "vehicles_details_features" USING btree ("_parent_id");
  CREATE INDEX "vehicles__order_idx" ON "vehicles" USING btree ("_order");
  CREATE INDEX "vehicles_image_idx" ON "vehicles" USING btree ("image_id");
  CREATE UNIQUE INDEX "vehicles_slug_idx" ON "vehicles" USING btree ("slug");
  CREATE INDEX "vehicles_updated_at_idx" ON "vehicles" USING btree ("updated_at");
  CREATE INDEX "vehicles_created_at_idx" ON "vehicles" USING btree ("created_at");
  CREATE INDEX "vehicles__status_idx" ON "vehicles" USING btree ("_status");
  CREATE INDEX "vehicles_texts_order_parent" ON "vehicles_texts" USING btree ("order","parent_id");
  CREATE INDEX "vehicles_rels_order_idx" ON "vehicles_rels" USING btree ("order");
  CREATE INDEX "vehicles_rels_parent_idx" ON "vehicles_rels" USING btree ("parent_id");
  CREATE INDEX "vehicles_rels_path_idx" ON "vehicles_rels" USING btree ("path");
  CREATE INDEX "vehicles_rels_media_id_idx" ON "vehicles_rels" USING btree ("media_id");
  CREATE INDEX "_vehicles_v_version_specs_order_idx" ON "_vehicles_v_version_specs" USING btree ("_order");
  CREATE INDEX "_vehicles_v_version_specs_parent_id_idx" ON "_vehicles_v_version_specs" USING btree ("_parent_id");
  CREATE INDEX "_vehicles_v_version_details_features_order_idx" ON "_vehicles_v_version_details_features" USING btree ("_order");
  CREATE INDEX "_vehicles_v_version_details_features_parent_id_idx" ON "_vehicles_v_version_details_features" USING btree ("_parent_id");
  CREATE INDEX "_vehicles_v_parent_idx" ON "_vehicles_v" USING btree ("parent_id");
  CREATE INDEX "_vehicles_v_version_version__order_idx" ON "_vehicles_v" USING btree ("version__order");
  CREATE INDEX "_vehicles_v_version_version_image_idx" ON "_vehicles_v" USING btree ("version_image_id");
  CREATE INDEX "_vehicles_v_version_version_slug_idx" ON "_vehicles_v" USING btree ("version_slug");
  CREATE INDEX "_vehicles_v_version_version_updated_at_idx" ON "_vehicles_v" USING btree ("version_updated_at");
  CREATE INDEX "_vehicles_v_version_version_created_at_idx" ON "_vehicles_v" USING btree ("version_created_at");
  CREATE INDEX "_vehicles_v_version_version__status_idx" ON "_vehicles_v" USING btree ("version__status");
  CREATE INDEX "_vehicles_v_created_at_idx" ON "_vehicles_v" USING btree ("created_at");
  CREATE INDEX "_vehicles_v_updated_at_idx" ON "_vehicles_v" USING btree ("updated_at");
  CREATE INDEX "_vehicles_v_latest_idx" ON "_vehicles_v" USING btree ("latest");
  CREATE INDEX "_vehicles_v_texts_order_parent" ON "_vehicles_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_vehicles_v_rels_order_idx" ON "_vehicles_v_rels" USING btree ("order");
  CREATE INDEX "_vehicles_v_rels_parent_idx" ON "_vehicles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_vehicles_v_rels_path_idx" ON "_vehicles_v_rels" USING btree ("path");
  CREATE INDEX "_vehicles_v_rels_media_id_idx" ON "_vehicles_v_rels" USING btree ("media_id");
  CREATE INDEX "team_members__order_idx" ON "team_members" USING btree ("_order");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_vehicles_id_idx" ON "payload_locked_documents_rels" USING btree ("vehicles_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_locations_order_idx" ON "site_settings_locations" USING btree ("_order");
  CREATE INDEX "site_settings_locations_parent_id_idx" ON "site_settings_locations" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "vehicles_specs" CASCADE;
  DROP TABLE "vehicles_details_features" CASCADE;
  DROP TABLE "vehicles" CASCADE;
  DROP TABLE "vehicles_texts" CASCADE;
  DROP TABLE "vehicles_rels" CASCADE;
  DROP TABLE "_vehicles_v_version_specs" CASCADE;
  DROP TABLE "_vehicles_v_version_details_features" CASCADE;
  DROP TABLE "_vehicles_v" CASCADE;
  DROP TABLE "_vehicles_v_texts" CASCADE;
  DROP TABLE "_vehicles_v_rels" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_locations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_vehicles_specs_icon";
  DROP TYPE "public"."enum_vehicles_formula";
  DROP TYPE "public"."enum_vehicles_category";
  DROP TYPE "public"."enum_vehicles_price_unit";
  DROP TYPE "public"."enum_vehicles_status";
  DROP TYPE "public"."enum__vehicles_v_version_specs_icon";
  DROP TYPE "public"."enum__vehicles_v_version_formula";
  DROP TYPE "public"."enum__vehicles_v_version_category";
  DROP TYPE "public"."enum__vehicles_v_version_price_unit";
  DROP TYPE "public"."enum__vehicles_v_version_status";
  DROP TYPE "public"."enum_users_role";`)
}
