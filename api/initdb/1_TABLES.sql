create table users
(
    id bigint auto_increment,
    constraint users_pk
        primary key (id),
    first_name TEXT not null,
    last_name TEXT not null,
    age DATE null,
    mail TEXT not null,
    mail_id bigint null,
        foreign key (mail_id) references users (id)
);

create table templates
(
    id bigint auto_increment,
    constraint templates_pk
        primary key (id),
    msg_note TEXT not null,
    title TEXT not null
);

create table mails
(
    id bigint auto_increment,
    constraint mails_pk
        primary key (id),
    note int not null,
    comment TEXT not null,
    date DATE null,
    mail TEXT not null,
    user_id bigint not null,
        foreign key (user_id) references users (id)
);