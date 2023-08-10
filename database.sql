DROP TABLE user_event_junction;
DROP TABLE survey_responses;
DROP TABLE emergencies;
DROP TABLE locations;
DROP TABLE events;
DROP TABLE "user";
DROP TABLE injuries;
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(200) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "first_name" VARCHAR(1000),
  "last_name" VARCHAR(1000),
  "is_venue" BOOLEAN DEFAULT FALSE
);
CREATE TABLE events (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(400),
  "venue" VARCHAR(400),
  "admin_id" INT REFERENCES "user" NOT NULL,
  "start_time" TIMESTAMP WITH TIME ZONE,
  "end_time" TIMESTAMP WITH TIME ZONE,
  "date" VARCHAR
);
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name character varying(200) NOT NULL,
  event_id integer NOT NULL REFERENCES events(id) ON DELETE CASCADE
);
CREATE TABLE emergencies (
  "id" SERIAL PRIMARY KEY,
  "type" INT,
  "timecreated" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "status" INT,
  "event_id" INT REFERENCES "events" ON DELETE CASCADE,
  "user_id" INT REFERENCES "user" ON DELETE CASCADE,
  "location_id" INT REFERENCES "locations" ON DELETE CASCADE,
  "admin_notes" TEXT
);
CREATE TABLE survey_responses (
  "id" SERIAL PRIMARY KEY,
  "question1" VARCHAR(400),
  "question2" VARCHAR(400),
  "question3" VARCHAR(400),
  "responseValues1" TEXT,
  "responseValues2" TEXT,
  "responseValues3" TEXT,
  "responseNotes" TEXT,
  "emergency_id" INT NOT NULL REFERENCES "emergencies" ON DELETE CASCADE
);
CREATE TABLE user_event_junction (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE,
  "event_id" INT NOT NULL REFERENCES "events" ON DELETE CASCADE
);
CREATE TABLE injuries ("id" SERIAL PRIMARY KEY, "type" VARCHAR(40));
INSERT INTO "injuries" ("type")
VALUES ('Injury'),
  ('Illness'),
  ('Altercation'),
  ('Unconscious Person'),
  ('Suspicious Activity');
INSERT INTO "user" (
    "first_name",
    "last_name",
    "username",
    "password",
    is_venue
  )
VALUES (
    'DEFAULT',
    'USER',
    'DEFAULT@USER',
    'DEFAULTPASSWORD',
    FALSE
  ),
  (
    'DEFAULT',
    'USER',
    'DEFAULT@VENUE',
    'DEFAULTPASSWORD',
    TRUE
  );
