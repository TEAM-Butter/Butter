
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
INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (1, 1, 'user123', 'User One', 'user1@example.com', '1990-01-01', 100, '$2a$12$dQo54URbmGg6L59qXSgLPOk/vuBg45UOfjSbY7MB/VanylMZhhHw2', NULL, 'MALE', NOW(), TRUE);

INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (2, 2, 'user456', 'User Two', 'user2@example.com', '1995-05-15', 200, '$2a$12$XoEzMrF9cwmKafmDaH62P.YcL554rfwGfghxNFH6.CmQZ0S7NUxRW', NULL, 'FEMALE', NOW(), FALSE);

INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (1, 2, 'butter123', '빠다', 'user3@example.com', '1990-01-01', 100, '$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6', NULL, 'MALE', NOW(), FALSE);

-- 더미 데이터 삽입

-- crew 테이블
INSERT INTO crew (donation_amount, name, description, image_url, portfolio_video_url, promotion_url, create_date, update_date) VALUES
                                                                                                                                   (1000, 'Rock Band', 'A rock music crew', 'http://image.url/crew1', 'http://video.url/crew1', 'http://promo.url/crew1', NOW(), NOW()),
                                                                                                                                   (2000, 'Jazz Ensemble', 'A jazz music crew', 'http://image.url/crew2', 'http://video.url/crew2', 'http://promo.url/crew2', NOW(), NOW()),
                                                                                                                                   (1500, 'Pop Group', 'A pop music group', 'http://image.url/crew3', 'http://video.url/crew3', 'http://promo.url/crew3', NOW(), NOW()),
                                                                                                                                   (1800, 'Hip-Hop Squad', 'A hip-hop music crew', 'http://image.url/crew4', 'http://video.url/crew4', 'http://promo.url/crew4', NOW(), NOW()),
                                                                                                                                   (2200, 'Classical Orchestra', 'A classical music crew', 'http://image.url/crew5', 'http://video.url/crew5', 'http://promo.url/crew5', NOW(), NOW()),
                                                                                                                                   (5000, 'Alpha Team', 'Innovative space explorers.', 'http://image.url/crew6', 'http://video.url/crew6', 'http://promo.url/crew6', NOW(), NOW()),
                                                                                                                                   (12000, 'Beta Crew', 'Specialized in AI development.', 'http://image.url/crew7', 'http://video.url/crew7', 'http://promo.url/crew7', NOW(), NOW()),
                                                                                                                                   (7500, 'Gamma Pioneers', 'Leading robotics innovation.', 'http://image.url/crew8', 'http://video.url/crew8', 'http://promo.url/crew8', NOW(), NOW()),
                                                                                                                                   (9800, 'Delta Force', 'Experts in cybersecurity.', 'http://image.url/crew9', 'http://video.url/crew9', 'http://promo.url/crew9', NOW(), NOW()),
                                                                                                                                   (15000, 'Epsilon Group', 'Advancing biotech solutions.', 'http://image.url/crew10', 'http://video.url/crew10', 'http://promo.url/crew10', NOW(), NOW());


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

-- live 테이블 (clip 테이블 참조를 위해 선행 삽입 필요)
INSERT INTO live (crew_id, start_date, end_date, title) VALUES
                                                            (1, NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), 'Live Rock Show'),
                                                            (2, NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), 'Jazz Performance'),
                                                            (3, NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR), 'Pop Music Show'),
                                                            (4, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), 'Hip-Hop Cypher'),
                                                            (5, NOW(), DATE_ADD(NOW(), INTERVAL 5 HOUR), 'Classical Evening');

-- schedule 테이블 (liked_schedule 테이블 참조를 위해 선행 삽입 필요)
INSERT INTO schedule (latitude, longitude, busking_date, create_date, crew_id, update_date, title, content, place) VALUES
                                                                                                                       (37.7749, -122.4194, NOW(), NOW(), 1, NOW(), 'San Francisco Street Performance', 'Enjoy live music', 'San Francisco'),
                                                                                                                       (34.0522, -118.2437, NOW(), NOW(), 2, NOW(), 'Los Angeles Jazz Night', 'Smooth jazz under the stars', 'Los Angeles'),
                                                                                                                       (40.7128, -74.0060, NOW(), NOW(), 3, NOW(), 'New York Pop Concert', 'Pop stars live in NYC', 'New York'),
                                                                                                                       (41.8781, -87.6298, NOW(), NOW(), 4, NOW(), 'Chicago Hip-Hop Festival', 'Hip-hop artists live', 'Chicago'),
                                                                                                                       (48.8566, 2.3522, NOW(), NOW(), 5, NOW(), 'Paris Classical Gala', 'An evening of classical music', 'Paris'),
                                                                                                                       (37.5665, 126.9780, '2025-02-10 18:00:00.123456', '2025-02-01 10:15:30.654321', 1, NOW(), 'Seoul Night Jazz', '편안한 재즈 음악을 선사합니다.', '서울 광장'),
                                                                                                                       (37.5704, 126.9926, '2025-02-12 19:30:00.456789', '2025-02-02 11:30:25.123654', 2, NOW(), 'Acoustic Vibes', '어쿠스틱 기타 연주와 함께하는 힐링 타임.', '인사동 문화거리'),
                                                                                                                       (37.5826, 127.0012, '2025-02-14 17:45:00.789654', '2025-02-03 14:50:55.456321', 3, NOW(), 'Indie Love Songs', '인디 밴드와 함께 감성적인 음악 여행.', '홍대 걷고 싶은 거리'),
                                                                                                                       (37.5546, 126.9706, '2025-02-16 20:00:00.321456', '2025-02-04 09:10:15.789654', 4, NOW(), 'K-pop Dance Night', '트렌디한 K-pop 댄스를 라이브로!', '이태원 클럽 거리'),
                                                                                                                       (37.5662, 126.9824, '2025-02-18 18:30:00.654987', '2025-02-05 12:20:40.321789', 5, NOW(), 'Street Freestyle', '힙합과 자유로운 비트의 만남.', '강남역 M스테이지'),
                                                                                                                       (37.5708, 126.9851, '2025-02-20 19:00:00.987654', '2025-02-06 15:25:33.654123', 6, NOW(), 'Romantic Violin', '낭만적인 바이올린 선율을 느껴보세요.', '청계천 광장'),
                                                                                                                       (37.5590, 126.9425, '2025-02-22 21:15:00.654321', '2025-02-07 10:40:25.321987', 7, NOW(), 'Rock the City', '도시 속 강렬한 락 음악.', '건대 스타시티'),
                                                                                                                       (37.5416, 127.0999, '2025-02-24 17:00:00.321987', '2025-02-08 07:30:50.654321', 8, NOW(), 'Latin Fiesta', '뜨거운 라틴 리듬과 함께 춤을!', '올림픽 공원'),
                                                                                                                       (37.5236, 126.9873, '2025-02-26 19:45:00.654123', '2025-02-09 13:40:10.789654', 9, NOW(), 'Blues Night', '깊은 감성의 블루스 공연.', '남산 서울타워'),
                                                                                                                       (37.5665, 126.9780, '2025-02-28 18:00:00.789654', '2025-02-10 08:35:40.987654', 10, NOW(), 'Busan Soul', '부산에서 열리는 감성 넘치는 소울 공연.', '해운대 해변'),
                                                                                                                       (37.4815, 126.9520, '2025-03-02 20:30:00.123456', '2025-02-11 14:10:15.987654', 1, NOW(), 'Classic Melodies', '클래식 음악의 아름다움을 느껴보세요.', '예술의 전당 야외무대'),
                                                                                                                       (37.4910, 127.0177, '2025-03-04 18:45:00.654789', '2025-02-12 16:50:55.123789', 2, NOW(), 'Folk Song Night', '포크송과 함께하는 감성 저녁.', '삼청동 북촌마을'),
                                                                                                                       (37.5011, 127.0396, '2025-03-06 17:30:00.321654', '2025-02-13 09:15:30.789654', 3, NOW(), 'Funky Beats', '신나는 펑키 음악과 함께.', '서울숲 야외공연장'),
                                                                                                                       (37.5096, 127.0587, '2025-03-08 19:15:00.987321', '2025-02-14 12:50:55.987654', 4, NOW(), 'EDM Party', '최고의 EDM DJ들이 펼치는 라이브!', '한강 반포공원'),
                                                                                                                       (37.5172, 126.9109, '2025-03-10 18:00:00.654123', '2025-02-15 07:45:20.321789', 5, NOW(), 'Traditional Sounds', '전통 국악과 함께하는 특별한 밤.', '국립국악원 야외마당');

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

-- liked_schedule 테이블
INSERT INTO liked_schedule (is_liked, schedule_id, member_id) VALUES
                                                                  (1, 1, 1),
                                                                  (0, 2, 2),
                                                                  (1, 3, 3),
                                                                  (0, 4, 4),
                                                                  (1, 5, 5);

-- crew_notice 테이블
INSERT INTO crew_notice (create_date, crew_id, crew_notice_id, update_date, title, content, image_url)
VALUES
    ('2025-02-01 10:15:30.654321', 1, 1, '2025-02-05 14:30:00.654987', 'New Busking Schedule!', '다음 주 새로운 버스킹 일정이 업데이트되었습니다.', '/assets/notice1.jpg'),
    ('2025-02-02 11:30:25.123654', 2, 2, '2025-02-06 16:45:10.321987', 'Practice Session Update', '연습 시간이 변경되었습니다. 확인해 주세요.', '/assets/notice2.jpg'),
    ('2025-02-03 14:50:55.456321', 3, 3, '2025-02-07 13:20:30.654789', 'Live Performance Tonight!', '오늘 저녁 특별 공연이 진행됩니다!', '/assets/notice3.jpg'),
    ('2025-02-04 09:10:15.789654', 4, 4, '2025-02-08 15:10:45.987321', 'New Crew Member!', '새로운 크루 멤버를 소개합니다!', '/assets/notice4.jpg'),
    ('2025-02-05 12:20:40.321789', 5, 5, '2025-02-09 18:55:20.123654', 'Busking Location Change', '공연 장소가 변경되었습니다.', '/assets/notice5.jpg'),
    ('2025-02-06 15:25:33.654123', 6, 6, '2025-02-10 07:45:20.987321', 'Thank You for Your Support!', '모두의 성원에 감사드립니다!', '/assets/notice6.jpg'),
    ('2025-02-07 10:40:25.321987', 7, 7, '2025-02-11 12:30:55.987654', 'Merchandise Update', '새로운 굿즈가 출시되었습니다.', '/assets/notice7.jpg'),
    ('2025-02-08 07:30:50.654321', 8, 8, '2025-02-12 14:50:20.456321', 'Live Streaming Event!', '온라인으로 함께 공연을 즐기세요.', '/assets/notice8.jpg'),
    ('2025-02-09 13:40:10.789654', 9, 9, '2025-02-13 10:10:25.321987', 'Special Guest Announcement', '이번 공연의 스페셜 게스트를 소개합니다!', '/assets/notice9.jpg'),
    ('2025-02-10 08:35:40.987654', 10, 10, '2025-02-14 11:45:33.654321', 'Rehearsal Schedule', '이번 주 리허설 일정이 공지되었습니다.', '/assets/notice10.jpg'),
    ('2025-02-11 14:10:15.987654', 1, 11, '2025-02-15 15:30:55.321654', 'Crowdfunding Project!', '크라우드 펀딩 프로젝트가 시작되었습니다.', '/assets/notice11.jpg'),
    ('2025-02-12 16:50:55.123789', 2, 12, '2025-02-16 06:45:25.654321', 'Fan Meeting Event', '팬들과의 특별한 만남을 준비했습니다.', '/assets/notice12.jpg'),
    ('2025-02-13 09:15:30.789654', 3, 13, '2025-02-17 21:30:15.654987', 'Performance Highlights', '지난 공연의 하이라이트 영상이 업로드되었습니다.', '/assets/notice13.jpg'),
    ('2025-02-14 12:50:55.987654', 4, 14, '2025-02-18 16:10:25.321456', 'Winter Festival Performance!', '겨울 페스티벌 공연 일정이 추가되었습니다.', '/assets/notice14.jpg'),
    ('2025-02-15 07:45:20.321789', 5, 15, '2025-02-19 11:45:33.987654', 'New Collaboration', '특별한 아티스트와의 협업이 예정되어 있습니다.', '/assets/notice15.jpg'),
    ('2025-02-16 10:20:30.123654', 6, 16, '2025-02-20 14:30:45.654789', 'Behind the Scenes', '무대 뒤 이야기를 공유합니다.', '/assets/notice16.jpg'),
    ('2025-02-17 08:55:40.321987', 7, 17, '2025-02-21 10:10:55.123456', 'New Music Release!', '새로운 곡이 발매되었습니다!', '/assets/notice17.jpg'),
    ('2025-02-18 15:30:20.456321', 8, 18, '2025-02-22 13:45:40.789654', 'Interview Feature', '인터뷰 영상이 공개되었습니다.', '/assets/notice18.jpg'),
    ('2025-02-19 11:40:10.789654', 9, 19, '2025-02-23 07:55:30.654321', 'Limited Edition Merch', '한정판 굿즈가 출시되었습니다!', '/assets/notice19.jpg'),
    ('2025-02-20 14:50:55.321987', 10, 20, '2025-02-24 12:20:15.987654', 'Concert Ticket Sales', '콘서트 티켓 예매가 시작되었습니다.', '/assets/notice20.jpg');