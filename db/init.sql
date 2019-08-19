create table sometable(id SERIAL, val int);
insert into sometable(val) VALUES (3);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE forum_user(
    user_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL UNIQUE,
    user_name VARCHAR NOT NULL,
    password_hash BYTEA NOT NULL,
    password_salt BYTEA NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_updated TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ
);

CREATE INDEX idx_user_email ON forum_user(email);

CREATE TABLE user_session(
    session_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    token VARCHAR NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ,
    PRIMARY KEY (session_id, user_id),
    FOREIGN KEY (user_id) REFERENCES forum_user (user_id)
);

CREATE INDEX idx_session_payload ON user_session(token);

CREATE TABLE topic(
    topic_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    topic_subject VARCHAR NOT NULL,
    topic_description VARCHAR NOT NULL,
    created_by UUID NOT NULL,
    updated_by UUID NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_updated TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ,
    FOREIGN KEY (created_by) REFERENCES forum_user (user_id)
);

CREATE TABLE topic_message(
    topic_message_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL,
    created_by UUID NOT NULL,
    topic_message VARCHAR NOT NULL,
    date_created TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    date_removed TIMESTAMPTZ,
    PRIMARY KEY (topic_id, topic_message_id),
    FOREIGN KEY (created_by) REFERENCES forum_user (user_id)
);
