create table users
(
    id bigint auto_increment,
    constraint users_pk
        primary key (id),
    first_name TEXT not null,
    last_name TEXT not null,
    age int null
);

create table templates
(
    id bigint auto_increment,
    constraint templates_ok
        primary key (id),
    msg_note TEXT not null,
    title TEXT not null
);