
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

INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (2, 3, 'choco789', '초코', 'user4@example.com', '1998-08-20', 150, '$2a$12$Qj1l2Rv68mGBtW/PyG7qEueUslfh2WZs.Jwo9t8kOi4B9uU7J7D9C', NULL, 'FEMALE', NOW(), TRUE);

INSERT INTO member (member_type_id, avatar_type_id, login_id, nickname, email, birth_date, bread_amount, password, profile_image, gender, create_date, is_extra_info_registered)
VALUES (1, 1, 'straw999', '딸기', 'user5@example.com', '1992-12-10', 180, '$2a$12$Y7LSF6/NwYpMc74uOTn6ZeUOujMPJHMT/FzghyATC08oM8Ykx.JhO', NULL, 'MALE', NOW(), FALSE);


-- 더미 데이터 삽입

-- crew 테이블
INSERT INTO `crew` (`donation_amount`,`create_date`,`crew_id`,`update_date`,`name`,`description`,`image_url`,`portfolio_video_url`,`promotion_url`)
VALUES
    (15000,'2025-02-02 21:59:16.000000',10,'2025-02-12 09:42:34.000000','Epsilon Group','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/21fc03d3-3c3a-4c65-91c5-8998468c9606.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000',8,'2025-02-12 09:42:34.000000','Gamma Pioneers','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a35a4b25-de46-4531-ba44-d28602a2d4f5.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000',3,'2025-02-12 09:42:34.000000','Pop Group','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/55c17e5b-0278-4119-aef7-78203bb338fe.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000',4,'2025-02-12 09:42:34.000000','Hip-Hop Squad','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/79d0211c-3eba-4584-b3c0-69030e50ed95.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000',7,'2025-02-12 09:42:34.000000','Beta Crew','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/6f5b9177-3011-4730-89ee-30da2e68f904.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000',1,'2025-02-12 09:42:34.000000','Rock Band','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4067094e-6364-44ba-80ca-756043c73cc3.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000',6,'2025-02-12 09:42:34.000000','Alpha Team','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/16e1fbfd-2001-4d05-a5a4-b1444a479115.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000',9,'2025-02-12 09:42:34.000000','Delta Force','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/979e090a-e2e7-4e65-a0ec-a1ab15d77547.jpg','http://video.url/crew9','http://promo.url/crew9'),
    (2000,'2024-03-28 17:51:27.000000',2,'2025-02-12 09:42:34.000000','Jazz Ensemble','A jazz music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a77e3349-0888-4a7a-afc3-0cd2345eb708.jpg','http://video.url/crew2','http://promo.url/crew2'),
    (2200,'2024-02-23 16:52:47.000000',5,'2025-02-12 09:42:34.000000','Classical Orchestra','A classical music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4dd3ea96-ffc5-4136-9a01-e392ad63795c.jpg','http://video.url/crew5','http://promo.url/crew5');

INSERT INTO `crew` (`donation_amount`,`create_date`,`update_date`,`name`,`description`,`image_url`,`portfolio_video_url`,`promotion_url`)
VALUES
    -- 발라드 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','감성버스','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/2bef287b-fa94-431d-ad03-e811b41360ac.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','노을빛 멜로디','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ca21626e-442b-465b-b1b1-3f55bf5fc79e.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','담담한 노래들','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/14e47e70-1fed-4481-a942-c2c423acb555.gif','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','여운','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/995af50c-2f30-4aa4-9d35-8ea3b8a28663.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','깊은 밤, 노래 한 곡','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1f90b929-e81c-4ded-ae19-97a9e013e201.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','시간의 흔적','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/37b5dc38-ff8e-486e-a796-3cb5251178fa.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','목소리로 그리는 그림','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1c64cbe2-51dd-433a-8d5a-a0e7de556a4e.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','하모니, 그 순간','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b15297fe-8996-484f-a761-8f685e58a464.jpg','http://video.url/crew9','http://promo.url/crew9'),

    -- 알앤비 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','소울파이어','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/702d0045-523e-4714-90d1-5b5b0382a8b4.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','감성코드','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/751b542b-fe05-46b6-bb22-c63b9b6548fa.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','네온소울','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/6145732b-649b-40da-b725-af085e5ddd02.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','비트앤소울','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/fbd0ace8-f789-4fbe-89cd-19ac9f86102c.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','무드바이브','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b68b9f7b-d478-4734-917c-5c62b5599b0b.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','블루스웨이브','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c29db0eb-c687-401b-8a0c-430ae27a298a.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','루프탑그루브','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b565dabd-226d-4610-b8e0-eb7a6d8733a6.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','미드나잇스웨이','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5864f338-44fc-404f-bde5-5cfdfc9a29ab.jpg','http://video.url/crew9','http://promo.url/crew9'),

    -- 어쿠스틱 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','나무 위의 노래','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a5383b2a-e6c2-498d-8875-82bbbe8caa0d.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','스트링하모니','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/706af792-a1b9-4d05-a378-dcf791045077.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','맑은날 기타','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bbb29f98-6b46-4362-b563-b72c37b28cb1.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','소리바람','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5440f62b-a89e-4296-8675-b5d460c9d033.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','숲속 멜로디','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bba79eaf-9971-4780-b88a-eb524bf56015.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','작은 방의 음악회','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ae2c67af-b77f-40d1-8953-bd83d17f8950.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','우드소울','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/59bc631c-1036-45e8-82ac-c2c3cc5776f2.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','통기타 이야기','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/dc151fc1-408a-493c-a98b-6a7e3f893339.jpg','http://video.url/crew9','http://promo.url/crew9'),

    -- 인디밴드 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','바람의 여정','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b68e3d19-a008-429e-b209-c16e841db11a.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','밤하늘 유랑단','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/68d7c686-a094-4b8c-91c2-8c3bfe6fb144.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','무명은 아름다워','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/8fde11d5-5986-4323-923f-cce11dc7386c.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','도로 위 선율','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f6093f38-f657-4779-8d6d-857c2b427392.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','길거리 시인들','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/54d6e570-2f6a-41e7-827a-8ef281f1316c.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','인디그라운드','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d1cf60a1-5052-44fc-b91f-f0247f5968df.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','색깔있는 소리','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ece04bd2-af61-4fe9-bd58-3f7394392bb6.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','자유음악단','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4ff86549-5641-49d5-92c2-2c68ebdbb34c.jpg','http://video.url/crew9','http://promo.url/crew9'),

    -- 케이팝 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','빛나는 하루','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/43debbde-97d1-4e4b-aba8-e018be6d589a.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','하이라이트 크루','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a396edda-174c-4bf1-9a05-09dd42cf0caf.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','퍼플스테이지','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/59e680f9-a4d8-4aaa-a392-d4cc54d0a0d0.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','스포트라이트','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e40f0d7d-ea16-45d8-af14-81a66ac9a889.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','하트비트','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/53cac171-647a-49ea-8c76-97b0d5f6426c.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','블링버스','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1948f51c-da52-4c79-8696-00a6d0b26260.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','에너제틱','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/2465e65f-6290-473f-97ea-5d96216063ce.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','윙스온더로드','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a8bd990e-6df9-49bf-a48a-15be5dfe4099.jpg','http://video.url/crew9','http://promo.url/crew9'),

    -- 트로트 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','한잔 멜로디','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b66a58f9-1fff-4e29-a3bf-35589731a9dc.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','복고소울','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/9c9094ca-bcf5-4b73-855f-4aa063d48860.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','가락의 향기','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b4fcce61-eced-4ab0-b3c3-a57be64747c7.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','트롯로드','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4e6a29d8-a725-49f9-a879-206355e8c8db.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','감성트롯','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a9fe4180-0d2f-494e-9e94-e3b363095050.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','어게인7080','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/72f91fbb-5f17-4540-920b-d0325a3a0228.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','한밤의 트롯','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b89af8b0-2167-4a05-9b89-2b0a4c1b1b33.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','신바람버스킹','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f8e35442-213c-462d-9c01-db7e8fa1d608.jpg','http://video.url/crew9','http://promo.url/crew9'),

    -- 팝 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','스테리나잇','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d925c90b-7939-48a5-8a12-83adff892b70.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','팝코어','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c3646555-9a91-4dcc-a2a3-5e932dc20aac.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','스트릿팝','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/397a117c-ad12-490a-9a0a-f1f8a5f11e49.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','크리스탈비트','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a73316de-55a2-4d73-bbb7-f232d698c8c7.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','메이저노트','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/72cc9709-f1d1-45c7-9c24-2b8f01371559.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','오픈마이크팝','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/776dda13-cc22-4bf8-92bc-8894a2b2e209.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','빅웨이브','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/80921169-c6bf-4f60-8974-ed3f30a8e3a5.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','업비트크루','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d1d7f0f5-f3f6-4a89-8b41-a99437fd7858.jpg','http://video.url/crew9','http://promo.url/crew9'),

    -- 힙합 크루 8개
    (15000,'2025-02-02 21:59:16.000000','2025-02-12 09:42:34.000000','리듬시티','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e09bcb05-b86f-4f05-9c95-cc21776935f4.jpg','http://video.url/crew10','http://promo.url/crew10'),
    (7500,'2024-12-28 14:01:04.000000','2025-02-12 09:42:34.000000','언더비트','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/dff53ff2-9496-445c-bae3-8cbbc753d035.jpg','http://video.url/crew8','http://promo.url/crew8'),
    (1500,'2024-11-29 19:46:27.000000','2025-02-12 09:42:34.000000','플로우킹즈','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/002783da-4fc0-499c-b4f5-0856212c4d20.jpg','http://video.url/crew3','http://promo.url/crew3'),
    (1800,'2024-11-24 22:07:29.000000','2025-02-12 09:42:34.000000','사이퍼스쿼드','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1816b8df-644e-46bc-9851-6a395e1d6504.jpg','http://video.url/crew4','http://promo.url/crew4'),
    (12000,'2024-10-09 03:44:24.000000','2025-02-12 09:42:34.000000','버스킹헤드','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5f4160b9-9c1c-4c9e-99ba-b50bea9d49fa.jpg','http://video.url/crew7','http://promo.url/crew7'),
    (1000,'2024-05-01 16:31:43.000000','2025-02-12 09:42:34.000000','스트릿라임즈','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/70a87ab7-10de-4e84-baa9-445196020332.jpg','http://video.url/crew1','http://promo.url/crew1'),
    (5000,'2024-04-10 22:42:05.000000','2025-02-12 09:42:34.000000','베이스클랜','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/3c5773b8-f7cc-4dc1-9ad4-4c1dbc2c6407.jpg','http://video.url/crew6','http://promo.url/crew6'),
    (9800,'2024-04-02 12:02:22.000000','2025-02-12 09:42:34.000000','킹오브더스트릿','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/8665ca4e-4711-4444-9879-e9156815bc81.jpg','http://video.url/crew9','http://promo.url/crew9');

-- CrewMember 더미 데이터 INSERT
INSERT INTO crew_member (crew_id, member_id, is_crew_admin) VALUES
                                                                (8, 3, TRUE),     -- butter123을 크루장(admin)으로 지정
                                                                (8, 4, FALSE);   -- choco789를 일반 멤버로 지정

-- bread_log_type 테이블
INSERT INTO bread_log_type (name) VALUES
                                      ('Recharge'),
                                      ('Donate'),
                                      ('Settle');


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
INSERT INTO clip (hit_count, crew_id, title, video_name) VALUES
                                                             (100, 1, 'Rock Performance', 'http://video.url/clip1'),
                                                             (200, 1, 'Jazz Solo', 'http://video.url/clip2'),
                                                             (150, 2, 'Pop Star Performance', 'http://video.url/clip3'),
                                                             (180, 2, 'Hip-Hop Freestyle', 'http://video.url/clip4'),
                                                             (220, 2, 'Classical Sonata', 'http://video.url/clip5');

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
    ('2025-02-01 10:15:30.654321', 1, 1, '2025-02-05 14:30:00.654987', 'New Busking Schedule!', '다음 주 새로운 버스킹 일정이 업데이트되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c2620a7c-fa94-4726-a67f-176704549bb8.jpg'),
    ('2025-02-02 11:30:25.123654', 2, 2, '2025-02-06 16:45:10.321987', 'Practice Session Update', '연습 시간이 변경되었습니다. 확인해 주세요.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4e0e0a60-ec5d-44e7-974a-4c279fed6a56.jpg'),
    ('2025-02-03 14:50:55.456321', 3, 3, '2025-02-07 13:20:30.654789', 'Live Performance Tonight!', '오늘 저녁 특별 공연이 진행됩니다!', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/40a43d2d-c330-4480-8957-602040074488.jpg'),
    ('2025-02-04 09:10:15.789654', 4, 4, '2025-02-08 15:10:45.987321', 'New Crew Member!', '새로운 크루 멤버를 소개합니다!', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5bf78906-cb36-4ff7-b5a8-e1901d2333db.jpg'),
    ('2025-02-05 12:20:40.321789', 5, 5, '2025-02-09 18:55:20.123654', 'Busking Location Change', '공연 장소가 변경되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/abc48305-8f9d-4e59-81c1-6df316430f61.jpg'),
    ('2025-02-06 15:25:33.654123', 6, 6, '2025-02-10 07:45:20.987321', 'Thank You for Your Support!', '모두의 성원에 감사드립니다!', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/0f722d62-d262-4edf-a65e-b6e7c3208b22.jpg'),
    ('2025-02-07 10:40:25.321987', 7, 7, '2025-02-11 12:30:55.987654', 'Merchandise Update', '새로운 굿즈가 출시되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ab40fa82-38b7-49c1-a24f-cf21cefeacfe.jpg'),
    ('2025-02-08 07:30:50.654321', 8, 8, '2025-02-12 14:50:20.456321', 'Live Streaming Event!', '온라인으로 함께 공연을 즐기세요.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bb11a127-da3f-4d88-8619-b9aed75f5260.jpg'),
    ('2025-02-09 13:40:10.789654', 9, 9, '2025-02-13 10:10:25.321987', 'Special Guest Announcement', '이번 공연의 스페셜 게스트를 소개합니다!', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/73ae9d7b-4984-400d-b1a0-f59d77257f6b.jpg'),
    ('2025-02-10 08:35:40.987654', 10, 10, '2025-02-14 11:45:33.654321', 'Rehearsal Schedule', '이번 주 리허설 일정이 공지되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/02a2f2d1-776f-49a3-84bf-2d251ad67c79.jpg'),
    ('2025-02-11 14:10:15.987654', 1, 11, '2025-02-15 15:30:55.321654', 'Crowdfunding Project!', '크라우드 펀딩 프로젝트가 시작되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b9391f09-be0c-4a12-8da8-c999293969c6.jpg'),
    ('2025-02-12 16:50:55.123789', 2, 12, '2025-02-16 06:45:25.654321', 'Fan Meeting Event', '팬들과의 특별한 만남을 준비했습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/58fd91eb-c695-4cf5-9c39-88b349336a5c.jpg'),
    ('2025-02-13 09:15:30.789654', 3, 13, '2025-02-17 21:30:15.654987', 'Performance Highlights', '지난 공연의 하이라이트 영상이 업로드되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d452059f-0092-44e8-a99b-6157f997d3a2.jpg'),
    ('2025-02-14 12:50:55.987654', 4, 14, '2025-02-18 16:10:25.321456', 'Winter Festival Performance!', '겨울 페스티벌 공연 일정이 추가되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1743884a-f8a4-44c3-90d3-80cad59734df.jpg'),
    ('2025-02-15 07:45:20.321789', 5, 15, '2025-02-19 11:45:33.987654', 'New Collaboration', '특별한 아티스트와의 협업이 예정되어 있습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f285cbe4-719e-4961-8252-4e62c4a0b63e.jpg'),
    ('2025-02-16 10:20:30.123654', 6, 16, '2025-02-20 14:30:45.654789', 'Behind the Scenes', '무대 뒤 이야기를 공유합니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e115de6e-2379-4888-bcc9-07aec7287dfa.jpg'),
    ('2025-02-17 08:55:40.321987', 7, 17, '2025-02-21 10:10:55.123456', 'New Music Release!', '새로운 곡이 발매되었습니다!', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b6d80a38-cb4b-4064-952e-da70fb7880da.jpg'),
    ('2025-02-18 15:30:20.456321', 8, 18, '2025-02-22 13:45:40.789654', 'Interview Feature', '인터뷰 영상이 공개되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/74f022f2-22d0-4395-bc53-cf60e0de7e9f.jpg'),
    ('2025-02-19 11:40:10.789654', 9, 19, '2025-02-23 07:55:30.654321', 'Limited Edition Merch', '한정판 굿즈가 출시되었습니다!', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5bfb2c5f-929b-40e8-a20e-e2a32061bfa3.jpg'),
    ('2025-02-20 14:50:55.321987', 10, 20, '2025-02-24 12:20:15.987654', 'Concert Ticket Sales', '콘서트 티켓 예매가 시작되었습니다.', 'https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f6e24a02-750d-4e08-aded-af22861cd586.jpg');

-- schedule 테이블 (서울 2025-02-11)
INSERT INTO schedule (latitude, longitude, busking_date, create_date, crew_id, update_date, title, content, place) VALUES
                                                                                                                       (37.5665, 126.9780, '2025-02-11 12:00:00', '2025-02-01 09:00:00', 1, '2025-02-01 09:00:00', '어쿠스틱 공연', '감성적인 어쿠스틱 커버곡 공연', '서울 시청 광장'),
                                                                                                                       (37.5276, 127.0443, '2025-02-11 13:30:00', '2025-02-01 10:15:00', 2, '2025-02-01 10:15:00', '힙합 쇼케이스', '언더그라운드 힙합 공연', '잠실 롯데월드몰 광장'),
                                                                                                                       (37.5139, 127.0605, '2025-02-11 14:00:00', '2025-02-01 11:30:00', 3, '2025-02-01 11:30:00', '재즈 트리오', '클래식 재즈 공연', '강남 코엑스 광장'),
                                                                                                                       (37.5586, 126.9254, '2025-02-11 15:00:00', '2025-02-01 13:00:00', 4, '2025-02-01 13:00:00', '밴드 공연', '인디 록밴드 라이브', '홍대 걷고싶은거리'),
                                                                                                                       (37.5707, 126.9926, '2025-02-11 16:30:00', '2025-02-01 14:20:00', 5, '2025-02-01 14:20:00', '팝 커버', '인기 팝송 메들리', '명동 중앙무대'),
                                                                                                                       (37.5565, 126.9404, '2025-02-11 17:00:00', '2025-02-01 15:00:00', 6, '2025-02-01 15:00:00', '퍼포먼스', '비보이 댄스 공연', '신촌 연세로'),
                                                                                                                       (37.5411, 127.0679, '2025-02-11 13:00:00', '2025-02-01 16:30:00', 7, '2025-02-01 16:30:00', '어쿠스틱 듀오', '감성 발라드 공연', '삼성동 코엑스 밀레니엄 광장'),
                                                                                                                       (37.5582, 126.9977, '2025-02-11 14:30:00', '2025-02-01 17:45:00', 8, '2025-02-01 17:45:00', '클래식 연주', '현악 4중주', '을지로 지하상가'),
                                                                                                                       (37.5273, 127.0276, '2025-02-11 15:30:00', '2025-02-01 18:20:00', 9, '2025-02-01 18:20:00', '트로트 메들리', '신나는 트로트 공연', '신천 잠실새내역'),
                                                                                                                       (37.5612, 127.0359, '2025-02-11 16:00:00', '2025-02-02 09:00:00', 10, '2025-02-02 09:00:00', 'K-POP 커버', '아이돌 댄스 커버', '건대입구역 광장'),
                                                                                                                       (37.5432, 126.9508, '2025-02-11 17:30:00', '2025-02-02 10:30:00', 1, '2025-02-02 10:30:00', '락밴드 공연', '오리지널 곡 발표', '상수동 카페거리'),
                                                                                                                       (37.5641, 127.0084, '2025-02-11 18:00:00', '2025-02-02 11:45:00', 2, '2025-02-02 11:45:00', '포크송 공연', '70-80년대 포크송', '왕십리 광장'),
                                                                                                                       (37.5249, 127.0364, '2025-02-11 12:30:00', '2025-02-02 13:15:00', 3, '2025-02-02 13:15:00', '플루트 연주', '클래식 명곡 연주', '석촌호수 공원'),
                                                                                                                       (37.5591, 127.0410, '2025-02-11 13:45:00', '2025-02-02 14:30:00', 4, '2025-02-02 14:30:00', '힙합 공연', '프리스타일 랩 배틀', '군자역 광장'),
                                                                                                                       (37.5489, 126.9217, '2025-02-11 14:15:00', '2025-02-02 15:45:00', 5, '2025-02-02 15:45:00', '재즈 공연', '스윙 재즈 공연', '합정 메세나폴리스'),
                                                                                                                       (37.5383, 127.0825, '2025-02-11 15:45:00', '2025-02-02 16:20:00', 6, '2025-02-02 16:20:00', '어쿠스틱 공연', '감성 포크 공연', '천호역 광장'),
                                                                                                                       (37.5492, 126.9138, '2025-02-11 16:15:00', '2025-02-02 17:00:00', 7, '2025-02-02 17:00:00', '팝 페스티벌', '팝송 메들리', '망원 한강공원'),
                                                                                                                       (37.5615, 127.0366, '2025-02-11 17:45:00', '2025-02-02 18:30:00', 8, '2025-02-02 18:30:00', '밴드 공연', '락밴드 커버곡', '건대 로데오거리'),
                                                                                                                       (37.5577, 126.9236, '2025-02-11 18:15:00', '2025-02-02 19:00:00', 9, '2025-02-02 19:00:00', '퍼포먼스', '마임 퍼포먼스', '연남동 경의선숲길'),
                                                                                                                       (37.5512, 127.1047, '2025-02-11 12:45:00', '2025-02-02 20:15:00', 10, '2025-02-02 20:15:00', '클래식', '피아노 독주회', '길동 생태공원');

-- schedule 테이블 (서울 2025-02-12)
INSERT INTO schedule (latitude, longitude, busking_date, create_date, crew_id, update_date, title, content, place) VALUES
                                                                                                                       (37.5665, 126.9780, '2025-02-12 12:00:00', '2025-02-02 09:00:00', 1, '2025-02-02 09:00:00', '힙합 공연', '언더그라운드 힙합', '서울 시청 광장'),
                                                                                                                       (37.5276, 127.0443, '2025-02-12 13:30:00', '2025-02-02 10:15:00', 2, '2025-02-02 10:15:00', '재즈 퀄텟', '모던 재즈 공연', '잠실 롯데월드몰 광장'),
                                                                                                                       (37.5139, 127.0605, '2025-02-12 14:00:00', '2025-02-02 11:30:00', 3, '2025-02-02 11:30:00', '어쿠스틱 공연', '기타 솔로 공연', '강남 코엑스 광장'),
                                                                                                                       (37.5586, 126.9254, '2025-02-12 15:00:00', '2025-02-02 13:00:00', 4, '2025-02-02 13:00:00', '락밴드', '헤비메탈 공연', '홍대 걷고싶은거리'),
                                                                                                                       (37.5707, 126.9926, '2025-02-12 16:30:00', '2025-02-02 14:20:00', 5, '2025-02-02 14:20:00', 'K-POP 커버', '여자아이돌 댄스', '명동 중앙무대'),
                                                                                                                       (37.5565, 126.9404, '2025-02-12 17:00:00', '2025-02-02 15:00:00', 6, '2025-02-02 15:00:00', '스트릿 댄스', '팝핀 댄스 공연', '신촌 연세로'),
                                                                                                                       (37.5411, 127.0679, '2025-02-12 13:00:00', '2025-02-02 16:30:00', 7, '2025-02-02 16:30:00', '클래식', '바이올린 독주', '삼성동 코엑스 밀레니엄 광장'),
                                                                                                                       (37.5582, 126.9977, '2025-02-12 14:30:00', '2025-02-02 17:45:00', 8, '2025-02-02 17:45:00', '포크송', '통기타 공연', '을지로 지하상가'),
                                                                                                                       (37.5273, 127.0276, '2025-02-12 15:30:00', '2025-02-02 18:20:00', 9, '2025-02-02 18:20:00', '트로트', '신세대 트로트', '신천 잠실새내역'),
                                                                                                                       (37.5612, 127.0359, '2025-02-12 16:00:00', '2025-02-03 09:00:00', 10, '2025-02-03 09:00:00', '팝 커버', '빌보드 히트곡', '건대입구역 광장'),
                                                                                                                       (37.5432, 126.9508, '2025-02-12 17:30:00', '2025-02-03 10:30:00', 1, '2025-02-03 10:30:00', '인디밴드', '인디음악 공연', '상수동 카페거리'),
                                                                                                                       (37.5641, 127.0084, '2025-02-12 18:00:00', '2025-02-03 11:45:00', 2, '2025-02-03 11:45:00', '발라드', '감성 발라드', '왕십리 광장'),
                                                                                                                       (37.5249, 127.0364, '2025-02-12 12:30:00', '2025-02-03 13:15:00', 3, '2025-02-03 13:15:00', '색소폰 연주', '재즈 스탠다드', '석촌호수 공원'),
                                                                                                                       (37.5591, 127.0410, '2025-02-12 13:45:00', '2025-02-03 14:30:00', 4, '2025-02-03 14:30:00', '비보잉', '브레이크 댄스', '군자역 광장'),
                                                                                                                       (37.5489, 126.9217, '2025-02-12 14:15:00', '2025-02-03 15:45:00', 5, '2025-02-03 15:45:00', '퓨전 재즈', '현대 재즈', '합정 메세나폴리스'),
                                                                                                                       (37.5383, 127.0825, '2025-02-12 15:45:00', '2025-02-03 16:20:00', 6, '2025-02-03 16:20:00', '포크 공연', '어쿠스틱 포크', '천호역 광장'),
                                                                                                                       (37.5492, 126.9138, '2025-02-12 16:15:00', '2025-02-03 17:00:00', 7, '2025-02-03 17:00:00', '팝 페스티벌', '팝송 커버', '망원 한강공원'),
                                                                                                                       (37.5615, 127.0366, '2025-02-12 17:45:00', '2025-02-03 18:30:00', 8, '2025-02-03 18:30:00', '록 페스티벌', '클래식 록', '건대 로데오거리'),
                                                                                                                       (37.5577, 126.9236, '2025-02-12 18:15:00', '2025-02-03 19:00:00', 9, '2025-02-03 19:00:00', '스트릿 댄스', '현대무용', '연남동 경의선숲길'),
                                                                                                                       (37.5512, 127.1047, '2025-02-12 12:45:00', '2025-02-03 20:15:00', 10, '2025-02-03 20:15:00', '클래식', '첼로 독주회', '길동 생태공원');

-- schedule 테이블 (서울 2025-02-13)
INSERT INTO schedule (latitude, longitude, busking_date, create_date, crew_id, update_date, title, content, place) VALUES
                                                                                                                       (37.5665, 126.9780, '2025-02-13 12:00:00', '2025-02-03 09:00:00', 1, '2025-02-03 09:00:00', '클래식 기타', '스페인 기타곡 연주회', '서울 시청 광장'),
                                                                                                                       (37.5276, 127.0443, '2025-02-13 13:30:00', '2025-02-03 10:15:00', 2, '2025-02-03 10:15:00', '힙합 공연', '알앤비 힙합 쇼', '잠실 롯데월드몰 광장'),
                                                                                                                       (37.5139, 127.0605, '2025-02-13 14:00:00', '2025-02-03 11:30:00', 3, '2025-02-03 11:30:00', '보컬 그룹', '아카펠라 공연', '강남 코엑스 광장'),
                                                                                                                       (37.5586, 126.9254, '2025-02-13 15:00:00', '2025-02-03 13:00:00', 4, '2025-02-03 13:00:00', '인디밴드', '얼터너티브 록', '홍대 걷고싶은거리'),
                                                                                                                       (37.5707, 126.9926, '2025-02-13 16:30:00', '2025-02-03 14:20:00', 5, '2025-02-03 14:20:00', '힙합댄스', '스트릿 댄스 배틀', '명동 중앙무대'),
                                                                                                                       (37.5565, 126.9404, '2025-02-13 17:00:00', '2025-02-03 15:00:00', 6, '2025-02-03 15:00:00', '어쿠스틱 밴드', '컨트리 음악', '신촌 연세로'),
                                                                                                                       (37.5411, 127.0679, '2025-02-13 13:00:00', '2025-02-03 16:30:00', 7, '2025-02-03 16:30:00', '재즈밴드', '빅밴드 재즈', '삼성동 코엑스 밀레니엄 광장'),
                                                                                                                       (37.5582, 126.9977, '2025-02-13 14:30:00', '2025-02-03 17:45:00', 8, '2025-02-03 17:45:00', '피아노 트리오', '클래식 앙상블', '을지로 지하상가'),
                                                                                                                       (37.5273, 127.0276, '2025-02-13 15:30:00', '2025-02-03 18:20:00', 9, '2025-02-03 18:20:00', '퓨전국악', '전통음악 재해석', '신천 잠실새내역'),
                                                                                                                       (37.5612, 127.0359, '2025-02-13 16:00:00', '2025-02-04 09:00:00', 10, '2025-02-04 09:00:00', '스트릿 댄스', '팝핀 퍼포먼스', '건대입구역 광장'),
                                                                                                                       (37.5432, 126.9508, '2025-02-13 17:30:00', '2025-02-04 10:30:00', 1, '2025-02-04 10:30:00', '어쿠스틱 듀오', '포크 발라드', '상수동 카페거리'),
                                                                                                                       (37.5641, 127.0084, '2025-02-13 18:00:00', '2025-02-04 11:45:00', 2, '2025-02-04 11:45:00', '플루트 앙상블', '클래식 명곡', '왕십리 광장'),
                                                                                                                       (37.5249, 127.0364, '2025-02-13 12:30:00', '2025-02-04 13:15:00', 3, '2025-02-04 13:15:00', '록밴드', '브릿팝 커버', '석촌호수 공원'),
                                                                                                                       (37.5591, 127.0410, '2025-02-13 13:45:00', '2025-02-04 14:30:00', 4, '2025-02-04 14:30:00', '비보이', '힙합 퍼포먼스', '군자역 광장'),
                                                                                                                       (37.5489, 126.9217, '2025-02-13 14:15:00', '2025-02-04 15:45:00', 5, '2025-02-04 15:45:00', '재즈 퀄텟', '라틴 재즈', '합정 메세나폴리스'),
                                                                                                                       (37.5383, 127.0825, '2025-02-13 15:45:00', '2025-02-04 16:20:00', 6, '2025-02-04 16:20:00', '싱어송라이터', '오리지널 곡', '천호역 광장'),
                                                                                                                       (37.5492, 126.9138, '2025-02-13 16:15:00', '2025-02-04 17:00:00', 7, '2025-02-04 17:00:00', '디제잉', '일렉트로닉 세트', '망원 한강공원'),
                                                                                                                       (37.5615, 127.0366, '2025-02-13 17:45:00', '2025-02-04 18:30:00', 8, '2025-02-04 18:30:00', '밴드 공연', '얼터너티브 메탈', '건대 로데오거리'),
                                                                                                                       (37.5577, 126.9236, '2025-02-13 18:15:00', '2025-02-04 19:00:00', 9, '2025-02-04 19:00:00', '마술 퍼포먼스', '스트릿 매직쇼', '연남동 경의선숲길'),
                                                                                                                       (37.5512, 127.1047, '2025-02-13 12:45:00', '2025-02-04 20:15:00', 10, '2025-02-04 20:15:00', '현악 앙상블', '실내악 공연', '길동 생태공원');

-- schedule 테이블
INSERT INTO schedule (latitude, longitude, busking_date, create_date, crew_id, update_date, title, content, place)
VALUES
    -- 2025-02-20, 서울
    (37.5665, 126.9780, '2025-02-20 18:00:00.000000', '2025-02-10 12:00:00.000000', 3, '2025-02-10 12:30:00.000000', '홍대 거리공연', '홍대 앞에서 진행하는 버스킹 공연입니다.', '서울'),
    (37.5704, 126.9923, '2025-02-20 19:30:00.000000', '2025-02-10 13:00:00.000000', 7, '2025-02-10 13:30:00.000000', '인사동 전통공연', '인사동 거리에서 전통 음악과 함께하는 공연.', '서울'),
    (37.5348, 126.9946, '2025-02-20 20:00:00.000000', '2025-02-10 14:00:00.000000', 2, '2025-02-10 14:30:00.000000', '한강 야경 버스킹', '한강 공원에서 낭만적인 버스킹 공연.', '서울'),
    (37.5610, 127.0017, '2025-02-20 18:30:00.000000', '2025-02-10 15:00:00.000000', 9, '2025-02-10 15:30:00.000000', '명동 스트릿 공연', '명동 거리에서 다양한 장르의 음악을 감상하세요.', '서울'),
    (37.5803, 127.0024, '2025-02-20 19:00:00.000000', '2025-02-10 16:00:00.000000', 5, '2025-02-10 16:30:00.000000', '대학로 버스킹', '대학로에서 펼쳐지는 감성적인 라이브 공연.', '서울'),
    (37.5103, 127.0600, '2025-02-20 21:00:00.000000', '2025-02-10 17:00:00.000000', 1, '2025-02-10 17:30:00.000000', '강남역 거리공연', '강남역 주변에서 흥겨운 거리 공연.', '서울'),
    (37.5663, 126.9779, '2025-02-20 20:30:00.000000', '2025-02-10 18:00:00.000000', 6, '2025-02-10 18:30:00.000000', '광화문 버스킹', '광화문 광장에서 펼쳐지는 감동적인 라이브.', '서울'),
    (37.5074, 126.9603, '2025-02-20 22:00:00.000000', '2025-02-10 19:00:00.000000', 10, '2025-02-10 19:30:00.000000', '이태원 야간 버스킹', '이태원 거리에서 신나는 밤 공연.', '서울'),

    -- 2025-02-21, 서울
    (37.5551, 126.9368, '2025-02-21 18:00:00.000000', '2025-02-11 12:00:00.000000', 4, '2025-02-11 12:30:00.000000', '신촌 버스킹', '신촌에서 펼쳐지는 감성적인 라이브 공연.', '서울'),
    (37.5273, 126.9279, '2025-02-21 19:00:00.000000', '2025-02-11 13:00:00.000000', 8, '2025-02-11 13:30:00.000000', '합정 거리공연', '합정역 주변에서 열리는 자유로운 분위기의 공연.', '서울'),
    (37.5035, 127.0247, '2025-02-21 20:00:00.000000', '2025-02-11 14:00:00.000000', 2, '2025-02-11 14:30:00.000000', '코엑스 야외 버스킹', '코엑스 앞 광장에서 진행하는 음악 공연.', '서울'),
    (37.5423, 127.0571, '2025-02-21 18:30:00.000000', '2025-02-11 15:00:00.000000', 6, '2025-02-11 15:30:00.000000', '잠실 석촌호수 버스킹', '석촌호수 주변에서 감성적인 음악 공연.', '서울'),
    (37.5796, 126.9770, '2025-02-21 19:30:00.000000', '2025-02-11 16:00:00.000000', 1, '2025-02-11 16:30:00.000000', '경복궁 앞 전통공연', '경복궁 앞에서 펼쳐지는 전통음악과 춤.', '서울'),
    (37.5229, 126.9245, '2025-02-21 21:00:00.000000', '2025-02-11 17:00:00.000000', 9, '2025-02-11 17:30:00.000000', '당산역 거리공연', '당산역 주변에서 펼쳐지는 신나는 거리 공연.', '서울'),
    (37.5621, 126.9950, '2025-02-21 20:30:00.000000', '2025-02-11 18:00:00.000000', 3, '2025-02-11 18:30:00.000000', '동대문 야시장 버스킹', '동대문 야시장 앞에서 열리는 야간 공연.', '서울'),
    (37.5086, 127.0631, '2025-02-21 22:00:00.000000', '2025-02-11 19:00:00.000000', 10, '2025-02-11 19:30:00.000000', '삼성역 거리공연', '삼성역 주변에서 즐기는 버스킹 무대.', '서울'),

    -- 2025-02-20, 강원도
    (37.8854, 127.7298, '2025-02-20 18:00:00.000000', '2025-02-10 12:00:00.000000', 2, '2025-02-10 12:30:00.000000', '춘천 호반 버스킹', '춘천 호반 근처에서 펼쳐지는 감성적인 라이브 공연.', '강원도'),
    (37.7556, 128.8961, '2025-02-20 19:00:00.000000', '2025-02-10 13:00:00.000000', 5, '2025-02-10 13:30:00.000000', '속초 해변 거리공연', '속초 해변에서 바다를 배경으로 열리는 버스킹 공연.', '강원도'),
    (37.3704, 128.3909, '2025-02-20 20:00:00.000000', '2025-02-10 14:00:00.000000', 8, '2025-02-10 14:30:00.000000', '원주 문화의 거리 버스킹', '원주 문화의 거리에서 다양한 장르의 음악 공연.', '강원도'),
    (38.1064, 128.6220, '2025-02-20 18:30:00.000000', '2025-02-10 15:00:00.000000', 1, '2025-02-10 15:30:00.000000', '강릉 경포대 버스킹', '경포대 해변에서 펼쳐지는 감미로운 라이브 무대.', '강원도'),
    (38.3800, 128.4670, '2025-02-20 19:30:00.000000', '2025-02-10 16:00:00.000000', 6, '2025-02-10 16:30:00.000000', '양양 서핑 거리공연', '양양 서핑 해변에서 자유로운 분위기의 공연.', '강원도'),
    (37.6831, 127.8853, '2025-02-20 21:00:00.000000', '2025-02-10 17:00:00.000000', 9, '2025-02-10 17:30:00.000000', '홍천 강변 버스킹', '홍천 강변에서 감성적인 음악과 함께하는 버스킹.', '강원도'),
    (37.6899, 128.7576, '2025-02-20 20:30:00.000000', '2025-02-10 18:00:00.000000', 3, '2025-02-10 18:30:00.000000', '정선 아리랑 시장 공연', '정선 아리랑 시장에서 전통과 현대가 어우러진 공연.', '강원도'),
    (38.2070, 128.5919, '2025-02-20 22:00:00.000000', '2025-02-10 19:00:00.000000', 7, '2025-02-10 19:30:00.000000', '동해 묵호항 버스킹', '묵호항에서 펼쳐지는 감성적인 거리 공연.', '강원도'),

    -- 2025-02-21, 강원도
    (37.8854, 127.7298, '2025-02-21 18:00:00.000000', '2025-02-11 12:00:00.000000', 4, '2025-02-11 12:30:00.000000', '춘천 남이섬 버스킹', '남이섬에서 펼쳐지는 감성적인 라이브 공연.', '강원도'),
    (37.7556, 128.8961, '2025-02-21 19:00:00.000000', '2025-02-11 13:00:00.000000', 6, '2025-02-11 13:30:00.000000', '속초 중앙시장 공연', '속초 중앙시장에서 다양한 장르의 버스킹 공연.', '강원도'),
    (37.3704, 128.3909, '2025-02-21 20:00:00.000000', '2025-02-11 14:00:00.000000', 9, '2025-02-11 14:30:00.000000', '원주 무실공원 공연', '원주 무실공원에서 자유로운 분위기의 거리 공연.', '강원도'),
    (38.1064, 128.6220, '2025-02-21 18:30:00.000000', '2025-02-11 15:00:00.000000', 1, '2025-02-11 15:30:00.000000', '강릉 안목해변 버스킹', '강릉 안목해변에서 펼쳐지는 감미로운 음악 무대.', '강원도'),
    (38.3800, 128.4670, '2025-02-21 19:30:00.000000', '2025-02-11 16:00:00.000000', 5, '2025-02-11 16:30:00.000000', '양양 서핑 해변 공연', '양양의 서핑 해변에서 펼쳐지는 버스킹 무대.', '강원도'),
    (37.6831, 127.8853, '2025-02-21 21:00:00.000000', '2025-02-11 17:00:00.000000', 8, '2025-02-11 17:30:00.000000', '홍천 비발디파크 거리공연', '홍천 비발디파크에서 신나는 음악 공연.', '강원도'),
    (37.6899, 128.7576, '2025-02-21 20:30:00.000000', '2025-02-11 18:00:00.000000', 2, '2025-02-11 18:30:00.000000', '정선 레일바이크 공연', '정선 레일바이크 종점에서 즐기는 감성적인 공연.', '강원도'),
    (38.2070, 128.5919, '2025-02-21 22:00:00.000000', '2025-02-11 19:00:00.000000', 10, '2025-02-11 19:30:00.000000', '동해 추암 촛대바위 버스킹', '추암 촛대바위 해변에서 펼쳐지는 감성적인 거리 공연.', '강원도'),

    -- 2025-02-20, 대전
    (36.3504, 127.3845, '2025-02-20 18:00:00.000000', '2025-02-11 12:00:00.000000', 2, '2025-02-11 12:30:00.000000', '대전 으능정이 거리 버스킹', '대전 으능정이 거리에서 펼쳐지는 감미로운 라이브 공연.', '대전'),
    (36.3552, 127.2985, '2025-02-20 19:00:00.000000', '2025-02-11 13:00:00.000000', 5, '2025-02-11 13:30:00.000000', '유성 온천공원 거리공연', '유성 온천공원에서 진행되는 감성적인 버스킹 공연.', '대전'),
    (36.3790, 127.3292, '2025-02-20 20:00:00.000000', '2025-02-11 14:00:00.000000', 8, '2025-02-11 14:30:00.000000', '엑스포 과학공원 공연', '대전 엑스포 과학공원에서 펼쳐지는 신나는 거리 공연.', '대전'),
    (36.3178, 127.3845, '2025-02-20 18:30:00.000000', '2025-02-11 15:00:00.000000', 1, '2025-02-11 15:30:00.000000', '대전 한밭수목원 버스킹', '한밭수목원에서 자연과 함께하는 여유로운 라이브 공연.', '대전'),
    (36.2974, 127.2892, '2025-02-20 19:30:00.000000', '2025-02-11 16:00:00.000000', 3, '2025-02-11 16:30:00.000000', '대청호 전망대 거리공연', '대청호 전망대에서 펼쳐지는 감성적인 거리 공연.', '대전'),
    (36.3457, 127.4525, '2025-02-20 21:00:00.000000', '2025-02-11 17:00:00.000000', 7, '2025-02-11 17:30:00.000000', '대전 보라매공원 버스킹', '보라매공원에서 펼쳐지는 자유로운 음악 공연.', '대전'),
    (36.3622, 127.4175, '2025-02-20 20:30:00.000000', '2025-02-11 18:00:00.000000', 4, '2025-02-11 18:30:00.000000', '대전 중앙시장 공연', '대전 중앙시장에서 활기찬 분위기의 버스킹 공연.', '대전'),
    (36.3335, 127.3953, '2025-02-20 22:00:00.000000', '2025-02-11 19:00:00.000000', 9, '2025-02-11 19:30:00.000000', '대전 카이스트 앞 버스킹', '대전 카이스트 앞 거리에서 진행되는 감성적인 공연.', '대전'),

    -- 2025-02-21, 대전
    (36.3504, 127.3845, '2025-02-21 18:00:00.000000', '2025-02-11 12:00:00.000000', 3, '2025-02-11 12:30:00.000000', '대전 으능정이 거리 버스킹', '대전 으능정이 거리에서 펼쳐지는 감미로운 라이브 공연.', '대전'),
    (36.3552, 127.2985, '2025-02-21 19:00:00.000000', '2025-02-11 13:00:00.000000', 7, '2025-02-11 13:30:00.000000', '유성 온천공원 거리공연', '유성 온천공원에서 진행되는 감성적인 버스킹 공연.', '대전'),
    (36.3790, 127.3292, '2025-02-21 20:00:00.000000', '2025-02-11 14:00:00.000000', 5, '2025-02-11 14:30:00.000000', '엑스포 과학공원 공연', '대전 엑스포 과학공원에서 펼쳐지는 신나는 거리 공연.', '대전'),
    (36.3178, 127.3845, '2025-02-21 18:30:00.000000', '2025-02-11 15:00:00.000000', 9, '2025-02-11 15:30:00.000000', '대전 한밭수목원 버스킹', '한밭수목원에서 자연과 함께하는 여유로운 라이브 공연.', '대전'),
    (36.2974, 127.2892, '2025-02-21 19:30:00.000000', '2025-02-11 16:00:00.000000', 1, '2025-02-11 16:30:00.000000', '대청호 전망대 거리공연', '대청호 전망대에서 펼쳐지는 감성적인 거리 공연.', '대전'),
    (36.3457, 127.4525, '2025-02-21 21:00:00.000000', '2025-02-11 17:00:00.000000', 6, '2025-02-11 17:30:00.000000', '대전 보라매공원 버스킹', '보라매공원에서 펼쳐지는 자유로운 음악 공연.', '대전'),
    (36.3622, 127.4175, '2025-02-21 20:30:00.000000', '2025-02-11 18:00:00.000000', 2, '2025-02-11 18:30:00.000000', '대전 중앙시장 공연', '대전 중앙시장에서 활기찬 분위기의 버스킹 공연.', '대전'),
    (36.3335, 127.3953, '2025-02-21 22:00:00.000000', '2025-02-11 19:00:00.000000', 4, '2025-02-11 19:30:00.000000', '대전 카이스트 앞 버스킹', '대전 카이스트 앞 거리에서 진행되는 감성적인 공연.', '대전'),

    -- 2025-02-20, 광주
    (35.1595, 126.8526, '2025-02-20 18:00:00.000000', '2025-02-11 12:00:00.000000', 3, '2025-02-11 12:30:00.000000', '광주 충장로 버스킹', '광주 충장로에서 펼쳐지는 감미로운 라이브 공연.', '광주'),
    (35.1528, 126.8918, '2025-02-20 19:00:00.000000', '2025-02-11 13:00:00.000000', 7, '2025-02-11 13:30:00.000000', '광주 국립아시아문화전당 공연', '국립아시아문화전당 앞에서 열리는 특별한 거리 공연.', '광주'),
    (35.1767, 126.9083, '2025-02-20 20:00:00.000000', '2025-02-11 14:00:00.000000', 5, '2025-02-11 14:30:00.000000', '광주 송정역 시장 거리공연', '송정역 시장 앞에서 펼쳐지는 신나는 공연.', '광주'),
    (35.1365, 126.9021, '2025-02-20 18:30:00.000000', '2025-02-11 15:00:00.000000', 9, '2025-02-11 15:30:00.000000', '광주 양림동 역사문화마을 버스킹', '광주의 역사가 깃든 양림동에서 감성적인 공연.', '광주'),
    (35.1873, 126.8531, '2025-02-20 19:30:00.000000', '2025-02-11 16:00:00.000000', 1, '2025-02-11 16:30:00.000000', '광주 풍암호수공원 거리공연', '자연과 함께하는 힐링 라이브 공연.', '광주'),
    (35.1401, 126.8787, '2025-02-20 21:00:00.000000', '2025-02-11 17:00:00.000000', 6, '2025-02-11 17:30:00.000000', '광주 기아 챔피언스 필드 공연', '경기장 앞에서 펼쳐지는 열정 넘치는 버스킹.', '광주'),
    (35.1298, 126.9065, '2025-02-20 20:30:00.000000', '2025-02-11 18:00:00.000000', 2, '2025-02-11 18:30:00.000000', '광주 전남대 후문 거리공연', '대학생들과 함께하는 자유로운 분위기의 공연.', '광주'),
    (35.1740, 126.9153, '2025-02-20 22:00:00.000000', '2025-02-11 19:00:00.000000', 4, '2025-02-11 19:30:00.000000', '광주 첨단지구 버스킹', '광주 첨단지구에서 펼쳐지는 트렌디한 라이브 공연.', '광주'),

    -- 2025-02-21, 광주
    (35.1595, 126.8526, '2025-02-21 18:00:00.000000', '2025-02-11 12:00:00.000000', 8, '2025-02-11 12:30:00.000000', '광주 충장로 야간 버스킹', '광주 충장로에서 펼쳐지는 감미로운 밤 거리 공연.', '광주'),
    (35.1528, 126.8918, '2025-02-21 19:00:00.000000', '2025-02-11 13:00:00.000000', 2, '2025-02-11 13:30:00.000000', '광주 국립아시아문화전당 공연', '국립아시아문화전당 앞에서 열리는 특별한 거리 공연.', '광주'),
    (35.1767, 126.9083, '2025-02-21 20:00:00.000000', '2025-02-11 14:00:00.000000', 5, '2025-02-11 14:30:00.000000', '광주 송정역 시장 거리공연', '송정역 시장 앞에서 펼쳐지는 신나는 공연.', '광주'),
    (35.1365, 126.9021, '2025-02-21 18:30:00.000000', '2025-02-11 15:00:00.000000', 9, '2025-02-11 15:30:00.000000', '광주 양림동 문화마을 버스킹', '광주의 역사가 깃든 양림동에서 감성적인 공연.', '광주'),
    (35.1873, 126.8531, '2025-02-21 19:30:00.000000', '2025-02-11 16:00:00.000000', 1, '2025-02-11 16:30:00.000000', '광주 풍암호수공원 거리공연', '자연과 함께하는 힐링 라이브 공연.', '광주'),
    (35.1401, 126.8787, '2025-02-21 21:00:00.000000', '2025-02-11 17:00:00.000000', 6, '2025-02-11 17:30:00.000000', '광주 기아 챔피언스 필드 공연', '경기장 앞에서 펼쳐지는 열정 넘치는 버스킹.', '광주'),
    (35.1298, 126.9065, '2025-02-21 20:30:00.000000', '2025-02-11 18:00:00.000000', 3, '2025-02-11 18:30:00.000000', '광주 전남대 후문 거리공연', '대학생들과 함께하는 자유로운 분위기의 공연.', '광주'),
    (35.1740, 126.9153, '2025-02-21 22:00:00.000000', '2025-02-11 19:00:00.000000', 4, '2025-02-11 19:30:00.000000', '광주 첨단지구 버스킹', '광주 첨단지구에서 펼쳐지는 트렌디한 라이브 공연.', '광주'),

    -- 2025-02-20, 녹산
    (35.0923, 128.8557, '2025-02-20 18:00:00.000000', '2025-02-11 12:00:00.000000', 1, '2025-02-11 12:30:00.000000', '녹산 공원 버스킹', '녹산 공원에서 펼쳐지는 감미로운 버스킹 공연.', '녹산'),
    (35.0954, 128.8621, '2025-02-20 19:00:00.000000', '2025-02-11 13:00:00.000000', 3, '2025-02-11 13:30:00.000000', '녹산 해변가 거리공연', '녹산 해변에서 낭만적인 라이브 음악.', '녹산'),
    (35.0876, 128.8493, '2025-02-20 20:00:00.000000', '2025-02-11 14:00:00.000000', 7, '2025-02-11 14:30:00.000000', '녹산 야외무대 버스킹', '녹산 야외무대에서 펼쳐지는 신나는 공연.', '녹산'),
    (35.1011, 128.8587, '2025-02-20 18:30:00.000000', '2025-02-11 15:00:00.000000', 5, '2025-02-11 15:30:00.000000', '녹산 광장 음악회', '녹산 광장에서 열리는 특별한 거리 공연.', '녹산'),
    (35.0978, 128.8655, '2025-02-20 19:30:00.000000', '2025-02-11 16:00:00.000000', 9, '2025-02-11 16:30:00.000000', '녹산 문화거리 버스킹', '녹산 문화거리에서 감성적인 공연.', '녹산'),
    (35.0853, 128.8412, '2025-02-20 21:00:00.000000', '2025-02-11 17:00:00.000000', 6, '2025-02-11 17:30:00.000000', '녹산 호수공원 공연', '자연과 함께하는 힐링 라이브 공연.', '녹산'),
    (35.0905, 128.8518, '2025-02-20 20:30:00.000000', '2025-02-11 18:00:00.000000', 2, '2025-02-11 18:30:00.000000', '녹산 도서관 앞 버스킹', '녹산 도서관 앞에서 펼쳐지는 조용한 감성 무대.', '녹산'),
    (35.0999, 128.8599, '2025-02-20 22:00:00.000000', '2025-02-11 19:00:00.000000', 4, '2025-02-11 19:30:00.000000', '녹산 야경 속 거리공연', '야경을 배경으로 펼쳐지는 낭만적인 버스킹.', '녹산'),

    -- 2025-02-21, 녹산
    (35.0923, 128.8557, '2025-02-21 18:00:00.000000', '2025-02-11 12:00:00.000000', 8, '2025-02-11 12:30:00.000000', '녹산 공원 야간 버스킹', '녹산 공원에서 펼쳐지는 감미로운 밤 거리 공연.', '녹산'),
    (35.0954, 128.8621, '2025-02-21 19:00:00.000000', '2025-02-11 13:00:00.000000', 3, '2025-02-11 13:30:00.000000', '녹산 해변가 버스킹', '녹산 해변에서 펼쳐지는 낭만적인 라이브 음악.', '녹산'),
    (35.0876, 128.8493, '2025-02-21 20:00:00.000000', '2025-02-11 14:00:00.000000', 5, '2025-02-11 14:30:00.000000', '녹산 야외무대 버스킹', '녹산 야외무대에서 펼쳐지는 신나는 공연.', '녹산'),
    (35.1011, 128.8587, '2025-02-21 18:30:00.000000', '2025-02-11 15:00:00.000000', 9, '2025-02-11 15:30:00.000000', '녹산 광장 음악회', '녹산 광장에서 열리는 특별한 거리 공연.', '녹산'),
    (35.0978, 128.8655, '2025-02-21 19:30:00.000000', '2025-02-11 16:00:00.000000', 1, '2025-02-11 16:30:00.000000', '녹산 문화거리 버스킹', '녹산 문화거리에서 감성적인 공연.', '녹산'),
    (35.0853, 128.8412, '2025-02-21 21:00:00.000000', '2025-02-11 17:00:00.000000', 7, '2025-02-11 17:30:00.000000', '녹산 호수공원 공연', '자연과 함께하는 힐링 라이브 공연.', '녹산'),
    (35.0905, 128.8518, '2025-02-21 20:30:00.000000', '2025-02-11 18:00:00.000000', 6, '2025-02-11 18:30:00.000000', '녹산 도서관 앞 버스킹', '녹산 도서관 앞에서 펼쳐지는 조용한 감성 무대.', '녹산'),
    (35.0999, 128.8599, '2025-02-21 22:00:00.000000', '2025-02-11 19:00:00.000000', 4, '2025-02-11 19:30:00.000000', '녹산 야경 속 거리공연', '야경을 배경으로 펼쳐지는 낭만적인 버스킹.', '녹산');

-- live 테이블 (clip 테이블 참조를 위해 선행 삽입 필요)
INSERT INTO live (crew_id, end_date, schedule_id, start_date, title)
VALUES
    (1, '2025-02-12 10:30:00.000000', 1, '2025-02-12 09:00:00.000000', 'Live Title 1'),
    (1, NULL, 6, '2025-02-12 11:00:00.000000', 'Live Title 2'),
    (1, '2025-02-12 14:15:00.000000', 16, '2025-02-12 12:45:00.000000', 'Live Title 3'),
    (1, '2025-02-12 16:45:00.000000', 21, '2025-02-12 15:00:00.000000', 'Live Title 4'),
    (2, '2025-02-12 18:30:00.000000', 2, '2025-02-12 17:00:00.000000', 'Live Title 5'),
    (2, NULL, 7, '2025-02-12 19:00:00.000000', 'Live Title 6'),
    (2, '2025-02-12 22:15:00.000000', 17, '2025-02-12 20:45:00.000000', 'Live Title 7'),
    (3, '2025-02-13 01:15:00.000000', 3, '2025-02-13 00:00:00.000000', 'Live Title 8'),
    (3, NULL, 8, '2025-02-13 02:00:00.000000', 'Live Title 9'),
    (3, '2025-02-13 05:00:00.000000', 18, '2025-02-13 03:30:00.000000', 'Live Title 10'),
    (4, '2025-02-13 07:30:00.000000', 4, '2025-02-13 06:00:00.000000', 'Live Title 11'),
    (4, NULL, 9, '2025-02-13 08:30:00.000000', 'Live Title 12'),
    (5, '2025-02-13 11:45:00.000000', 5, '2025-02-13 10:15:00.000000', 'Live Title 13'),
    (5, '2025-02-13 13:30:00.000000', 10, '2025-02-13 12:00:00.000000', 'Live Title 14'),
    (6, NULL, 11, '2025-02-13 15:00:00.000000', 'Live Title 15'),
    (6, '2025-02-13 17:45:00.000000', 26, '2025-02-13 16:15:00.000000', 'Live Title 16'),
    (7, '2025-02-13 19:30:00.000000', 12, '2025-02-13 18:00:00.000000', 'Live Title 17'),
    (8, "2025-02-13 21:00:00.000000", 13, '2025-02-13 21:00:00.000000', 'Live Title 18'),
    (9, '2025-02-13 23:45:00.000000', 14, '2025-02-13 22:15:00.000000', 'Live Title 19'),
    (10, '2025-02-14 02:00:00.000000', 15, '2025-02-14 00:30:00.000000', 'Live Title 20');

-- crew_genre 테이블
INSERT INTO crew_genre (crew_genre_id, crew_id, genre_id)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 1, 3),
    (4, 1, 4),

    (5, 2, 5),
    (6, 2, 6),
    (7, 2, 7),
    (8, 2, 8),

    (9, 3, 9),
    (10, 3, 10),
    (11, 3, 11),
    (12, 3, 12),

    (13, 4, 13),
    (14, 4, 1),
    (15, 4, 2),
    (16, 4, 3),

    (17, 5, 4),
    (18, 5, 5),
    (19, 5, 6),
    (20, 5, 7),

    (21, 6, 8),
    (22, 6, 9),
    (23, 6, 10),
    (24, 6, 11),

    (25, 7, 12),
    (26, 7, 13),
    (27, 7, 1),
    (28, 7, 2),

    (29, 8, 3),
    (30, 8, 4),
    (31, 8, 5),
    (32, 8, 6),

    (33, 9, 7),
    (34, 9, 8),
    (35, 9, 9),
    (36, 9, 10),

    (37, 10, 11),
    (38, 10, 12),
    (39, 10, 13),
    (40, 10, 1);

-- follow 테이블
INSERT INTO `follow` (`is_followed`,`crew_id`,`follow_id`,`member_id`)
VALUES
    (1,1,2,2), (1,1,4,3), (1,1,1,4), (1,1,3,5),
    (1,2,6,1), (1,2,5,3), (1,2,7,5),
    (1,3,8,1), (1,3,11,3), (1,3,10,4), (1,3,9,5),
    (1,4,12,1), (1,4,15,2), (1,4,14,4), (1,4,13,5),
    (1,5,19,2), (1,5,17,3), (1,5,18,4), (1,5,16,5),
    (1,6,22,2), (1,6,20,3), (1,6,21,5),
    (1,7,25,1), (1,7,24,4), (1,7,23,5),
    (1,8,27,1), (1,8,26,2), (1,8,28,3),
    (1,9,31,1), (1,9,30,2), (1,9,29,5),
    (1,10,32,2);
