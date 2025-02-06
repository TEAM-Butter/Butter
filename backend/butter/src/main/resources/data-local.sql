
use butter;

---------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------- [Default Data] -------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------

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


---------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------- [Dummy Data] ---------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------

-- crew 테이블
INSERT INTO crew (donation_amount, name, description, image_url, portfolio_video_url, promotion_url) VALUES
                                                                                                         (1000, 'Rock Band', 'A rock music crew', 'http://image.url/crew1', 'http://video.url/crew1', 'http://promo.url/crew1'),
                                                                                                         (2000, 'Jazz Ensemble', 'A jazz music crew', 'http://image.url/crew2', 'http://video.url/crew2', 'http://promo.url/crew2'),
                                                                                                         (1500, 'Pop Group', 'A pop music group', 'http://image.url/crew3', 'http://video.url/crew3', 'http://promo.url/crew3'),
                                                                                                         (1800, 'Hip-Hop Squad', 'A hip-hop music crew', 'http://image.url/crew4', 'http://video.url/crew4', 'http://promo.url/crew4'),
                                                                                                         (2200, 'Classical Orchestra', 'A classical music crew', 'http://image.url/crew5', 'http://video.url/crew5', 'http://promo.url/crew5');

-- bread_log_type 테이블
INSERT INTO bread_log_type (name) VALUES
                                      ('Deposit'),
                                      ('Withdrawal'),
                                      ('Transfer'),
                                      ('Bonus'),
                                      ('Penalty');

-- member 테이블
INSERT INTO member (create_date, is_extra_info_registered, email, nickname, password, login_id, gender) VALUES
                                                                                                            (NOW(), 1, 'user1@example.com', 'UserOne', 'password1', 'userone', 'MALE'),
                                                                                                            (NOW(), 1, 'user2@example.com', 'UserTwo', 'password2', 'usertwo', 'FEMALE'),
                                                                                                            (NOW(), 1, 'user3@example.com', 'UserThree', 'password3', 'userthree', 'MALE'),
                                                                                                            (NOW(), 1, 'user4@example.com', 'UserFour', 'password4', 'userfour', 'FEMALE'),
                                                                                                            (NOW(), 1, 'user5@example.com', 'UserFive', 'password5', 'userfive', 'MALE');

-- bread_log 테이블
INSERT INTO bread_log (bread_log_type_id, crew_id, member_id) VALUES
                                                                  (1, 1, 1),
                                                                  (2, 2, 2),
                                                                  (3, 3, 3),
                                                                  (4, 4, 4),
                                                                  (5, 5, 5);

-- crew_genre 테이블
INSERT INTO crew_genre (crew_id, genre_id) VALUES
                                               (1, 1),
                                               (2, 2),
                                               (3, 3),
                                               (4, 4),
                                               (5, 5);

-- crew_member 테이블
INSERT INTO crew_member (is_crew_admin, crew_id, member_id) VALUES
                                                                (1, 1, 1),
                                                                (0, 2, 2),
                                                                (1, 3, 3),
                                                                (0, 4, 4),
                                                                (1, 5, 5);

-- crew_notice 테이블
INSERT INTO crew_notice (create_date, crew_id, update_date, title, content, image_url) VALUES
                                                                                           (NOW(), 1, NOW(), 'Rock Concert Announcement', 'Join us for a rock concert', 'http://image.url/notice1'),
                                                                                           (NOW(), 2, NOW(), 'Jazz Night', 'Enjoy an evening of jazz', 'http://image.url/notice2'),
                                                                                           (NOW(), 3, NOW(), 'Pop Music Event', 'Pop music night special', 'http://image.url/notice3'),
                                                                                           (NOW(), 4, NOW(), 'Hip-Hop Battle', 'Freestyle rap battle', 'http://image.url/notice4'),
                                                                                           (NOW(), 5, NOW(), 'Classical Symphony', 'A night of classical music', 'http://image.url/notice5');

-- follow 테이블
INSERT INTO follow (is_followed, crew_id, member_id) VALUES
                                                         (1, 1, 2),
                                                         (0, 2, 1),
                                                         (1, 3, 3),
                                                         (0, 4, 4),
                                                         (1, 5, 5);

-- live 테이블 (clip 테이블 참조를 위해 선행 삽입 필요)
INSERT INTO live (crew_id, start_date, end_date, title) VALUES
                                                            (1, NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), 'Live Rock Show'),
                                                            (2, NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), 'Jazz Performance'),
                                                            (3, NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR), 'Pop Music Show'),
                                                            (4, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), 'Hip-Hop Cypher'),
                                                            (5, NOW(), DATE_ADD(NOW(), INTERVAL 5 HOUR), 'Classical Evening');

-- clip 테이블
INSERT INTO clip (hit_count, live_id, title, video_url) VALUES
                                                            (100, 1, 'Rock Performance', 'http://video.url/clip1'),
                                                            (200, 2, 'Jazz Solo', 'http://video.url/clip2'),
                                                            (150, 3, 'Pop Star Performance', 'http://video.url/clip3'),
                                                            (180, 4, 'Hip-Hop Freestyle', 'http://video.url/clip4'),
                                                            (220, 5, 'Classical Sonata', 'http://video.url/clip5');

-- liked_clip 테이블
INSERT INTO liked_clip (is_liked, clip_id, member_id) VALUES
                                                          (1, 1, 1),
                                                          (0, 2, 2),
                                                          (1, 3, 3),
                                                          (0, 4, 4),
                                                          (1, 5, 5);

-- schedule 테이블
INSERT INTO schedule (latitude, longitude, busking_date, create_date, crew_id, update_date, title, content, place) VALUES
                                                                                                                       (37.7749, -122.4194, NOW(), NOW(), 1, NOW(), 'San Francisco Street Performance', 'Enjoy live music', 'San Francisco'),
                                                                                                                       (34.0522, -118.2437, NOW(), NOW(), 2, NOW(), 'Los Angeles Jazz Night', 'Smooth jazz under the stars', 'Los Angeles'),
                                                                                                                       (40.7128, -74.0060, NOW(), NOW(), 3, NOW(), 'New York Pop Concert', 'Pop stars live in NYC', 'New York'),
                                                                                                                       (41.8781, -87.6298, NOW(), NOW(), 4, NOW(), 'Chicago Hip-Hop Festival', 'Hip-hop artists live', 'Chicago'),
                                                                                                                       (48.8566, 2.3522, NOW(), NOW(), 5, NOW(), 'Paris Classical Gala', 'An evening of classical music', 'Paris');

-- liked_schedule 테이블
INSERT INTO liked_schedule (is_liked, schedule_id, member_id) VALUES
                                                                  (1, 1, 1),
                                                                  (0, 2, 2),
                                                                  (1, 3, 3),
                                                                  (0, 4, 4),
                                                                  (1, 5, 5);

-- notification 테이블
INSERT INTO notification (member_id, content) VALUES
                                                  (1, 'Your event is coming up soon!'),
                                                  (2, 'New message from admin.'),
                                                  (3, 'Your performance was liked!'),
                                                  (4, 'New event scheduled!'),
                                                  (5, 'Update from your followed crew.');


