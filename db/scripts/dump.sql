CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

-- Seed admin user
INSERT INTO "users" ("username", "password") 
VALUES ('admin@purrfectcreations.com','$2b$10$Jpg7O5VwfdcJM5AiyPMsc.kmCIePoqjPdXiN1rC1m04UIb30O6Rnq');