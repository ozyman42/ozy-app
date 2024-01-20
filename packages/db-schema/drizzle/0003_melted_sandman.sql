CREATE TABLE IF NOT EXISTS "steps" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"steps" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "steps" ADD CONSTRAINT "steps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
