create table sometable(id int, val int);
insert into sometable(id, val) VALUES (1, 3);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE forum_user(
    user_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ
);

CREATE TABLE user_session(
    session_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    user_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    token VARCHAR NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ,
    PRIMARY KEY (session_id, user_id),
    FOREIGN KEY (user_id) REFERENCES forum_user (user_id)
);

CREATE TABLE topic(
    topic_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
    created_by UUID NOT NULL DEFAULT uuid_generate_v1(),
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ,
    FOREIGN KEY (created_by) REFERENCES forum_user (user_id)
);

CREATE TABLE topic_info(
    topic_info_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    topic_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    topic_title VARCHAR NOT NULL,
    topic_description VARCHAR NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ,
    PRIMARY KEY (topic_id, topic_info_id),
    FOREIGN KEY (topic_id) REFERENCES topic (topic_id)
);

CREATE TABLE topic_message(
    topic_message_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    topic_id UUID NOT NULL DEFAULT uuid_generate_v1(),
    created_by UUID NOT NULL DEFAULT uuid_generate_v1(),
    topic_message VARCHAR NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ,
    PRIMARY KEY (topic_id, topic_message_id),
    FOREIGN KEY (created_by) REFERENCES forum_user (user_id)
);

-- just testing stuff out
insert into forum_user(email, password_hash) values ('dd_12@test.com', 'asfasfsad');
select * from forum_user;
