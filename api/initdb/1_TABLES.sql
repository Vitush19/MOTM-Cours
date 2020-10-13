create table users
(
    id bigint auto_increment,
    constraint users_pk
        primary key (id),
    prenom TEXT not null,
    nom TEXT not null,
    email TEXT not null,
    date_naissance DATE null
);
