drop table if exists teachers, students, classes;

create table teachers (
    id serial primary key not null,
    username varchar(256) not null,
    password varchar(256) not null
);

create table students (
    id serial primary key not null,
    username varchar(256) not null,
    password varchar(256) not null
);

create table classes (
	id serial primary key not null,
	title varchar(256) not null,
	content text not null,
	classes_id int references classes(id),
	student_id int references students(id),
	teacher_id int references teachers(id)
);
