set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL DEFAULT now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."wants" (
	"wantId" serial NOT NULL,
	"wantTitle" TEXT NOT NULL,
	"wantPhotoFile" TEXT NOT NULL,
	"wantContent" TEXT NOT NULL,
  "createdAt" timestamptz(6) NOT NULL DEFAULT now(),
	"userId" integer NOT NULL,
	"isbn" TEXT NOT NULL,
	CONSTRAINT "wants_pk" PRIMARY KEY ("wantId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."sales" (
	"saleId" serial NOT NULL,
	"saleTitle" TEXT NOT NULL,
	"salePhotoFile" TEXT NOT NULL,
	"saleContent" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL DEFAULT now(),
	"userId" integer NOT NULL,
	"isbn" TEXT NOT NULL,
	"tradeOption" BOOLEAN NOT NULL,
	CONSTRAINT "sales_pk" PRIMARY KEY ("saleId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "wants" ADD CONSTRAINT "wants_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "sales" ADD CONSTRAINT "sales_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
