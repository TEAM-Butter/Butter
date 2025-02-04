
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
                                   ('Lion'),
                                   ('Penguin'),
                                   ('Monkey'),
                                   ('Sparrow'),
                                   ('Elephant'),
                                   ('Shark');

-- member
INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (1, 1, 'user123', 'User One', 'user1@example.com', '1990-01-01', 100, 'encryptedPassword1!', NULL, 'MALE', NOW(), TRUE);

INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (2, 2, 'user456', 'User Two', 'user2@example.com', '1995-05-15', 200, 'encryptedPassword2!', NULL, 'FEMALE', NOW(), FALSE);
