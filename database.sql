---CREATE TABLE OF TASKS
CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (250) NOT NULL,
	"priority" VARCHAR (250) NOT NULL,
	"dueDate" DATE,
	"notes" VARCHAR (250) NOT NULL,
	"isComplete" BOOLEAN DEFAULT FALSE
);

---INSERT PLACEHOLDER DATA
INSERT INTO "tasks" 
	("title", "priority", "dueDate", "notes", "isComplete") 
VALUES 
	('pick up dry cleaning', 'high', '5-29-2021', 'ready for pickup at 3:30pm', 'true'),
	('buy cat food', 'medium', '5-30-2021', 'grab wet food this time', 'false'),
	('clean garage', 'low', '6-2-2021', 'rent leaf blower from Lowes''s?', 'false');