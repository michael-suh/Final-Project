set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"phoneNumber" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."items" (
	"itemId" serial NOT NULL,
	"title" TEXT NOT NULL,
  "price" int NOT NULL,
	"fileUrl" TEXT NOT NULL,
	"userId" int NOT NULL,
	"content" TEXT NOT NULL,
	"uploadedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."reviews" (
	"reviewId" serial NOT NULL,
	"itemId" int NOT NULL,
	"userId" int NOT NULL,
	"content" TEXT NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("itemId") REFERENCES "items"("itemId");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
