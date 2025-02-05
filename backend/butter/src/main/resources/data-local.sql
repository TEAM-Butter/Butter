
use butter;

-- member_type
INSERT INTO member_type (member_type_id, name) VALUES (1, 'USER');
INSERT INTO member_type (member_type_id, name) VALUES (2, 'ADMIN');

--genre
INSERT INTO genre (name) VALUES
                             ('All'),
                             ('Ballad'),
                             ('Dance'),
                             ('Pop'),
                             ('K-Pop'),
                             ('Acoustic'),
                             ('Hip-Hop'),
                             ('R&B'),
                             ('Electronic'),
                             ('Rock'),
                             ('Jazz'),
                             ('Indie'),
                             ('Trot');

-- avatar_type
INSERT INTO avatar_type (name) VALUES
                                   ('Avatar1'),
                                   ('Avatar2'),
                                   ('Avatar3'),
                                   ('Avatar4'),
                                   ('Avatar5'),
                                   ('Avatar6');

-- member
-- "password" : "mypassword1!"
INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (1, 1, 'user123', 'User One', 'user1@example.com', '1990-01-01', 100, '$2a$12$3MwPS4LQvrcCCYSzLpMV7usfb9oMYxoH7ByZGlwUB4BbvpitnLlrq', NULL, 'MALE', NOW(), TRUE);

INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (2, 2, 'user456', 'User Two', 'user2@example.com', '1995-05-15', 200, '$2a$12$XoEzMrF9cwmKafmDaH62P.YcL554rfwGfghxNFH6.CmQZ0S7NUxRW', NULL, 'FEMALE', NOW(), FALSE);
