CREATE TABLE modules (
    id UUID, 
    name TEXT, 
    "teacherId" TEXT,
    description TEXT, 
    PRIMARY KEY (id), 
    created_at TIMESTAMPTZ DEFAULT NOW(), 
    updated_at TIMESTAMPTZ DEFAULT NOW(), 
    CONSTRAINT fk_teacher FOREIGN KEY ("teacherId") REFERENCES users (id)
)

CREATE TABLE classrooms (
    id UUID, 
    name TEXT NOT NULL, 
    description TEXT NOT NULL, 
    url TEXT, 
    "moduleId" UUID NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT NOW(), 
    updated_at TIMESTAMPTZ DEFAULT NOW(), 
    PRIMARY KEY (id), CONSTRAINT fk_module FOREIGN KEY ("moduleId") REFERENCES modules (id)
);

CREATE TABLE questions (
    id UUID, 
    "classroomId" UUID NOT NULL, 
    question TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(), 
    updated_at TIMESTAMPTZ DEFAULT NOW(), 
    PRIMARY KEY (id), CONSTRAINT fk_module FOREIGN KEY ("classroomId") REFERENCES classrooms (id)
);

CREATE TABLE reply (
    id UUID, 
    comment TEXT, 
    "questionId" UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(), 
    updated_at TIMESTAMPTZ DEFAULT NOW(),  
    PRIMARY KEY (id), CONSTRAINT fk_module FOREIGN KEY ("questionId") REFERENCES questions (id)
)

SELECT DISTINCT
    "modules".*,
    "classrooms".*
FROM modules
    JOIN classrooms on "modules"."id" = "classrooms"."moduleId"

SELECT
    "modules"."id" as module_id,
    "modules"."name" as module_name,
    "modules"."description" as module_description,
    "modules"."teacherId" as module_teacherid,
    "classrooms"."id" as classroom_id,
    "classrooms"."name" as classroom_name,
    "classrooms"."description" as classroom_description,
    "classrooms"."url" as classroom_url,
    "classrooms"."created_at" as classroom_created_at,
    "classrooms"."updated_at" as classroom_updated_at
FROM
    "modules"
    JOIN "classrooms" ON "modules"."id" = "classrooms"."moduleId"
    JOIN "questions" ON "classrooms"."id" = "questions"."id";
