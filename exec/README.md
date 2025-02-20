# 📚포팅 메뉴얼

## 📑목차

### [1. 기술 스택 & 버전 정보](#기술-스택-버전-정보)

### [2. 빌드 방법](#빌드-방법)

### [3. 환경 변수](#환경-변수)

### [4. 외부 서비스 정보](#외부-서비스-정보)

### [5. 기타 설정](#기타-설정)

---

## 🛠기술 스택 & 버전 정보

### 1. 프로젝트 협업 툴

**이슈 관리**: JIRA
**형상 관리**: Gitlab
**커뮤니케이션**: Notion, Mattermost, Discord
**설계**: ERDCloud
**디자인**: Figma

</br>

### 2. 개발환경

#### IDE
**VS Code**: 1.97.1
**IntelliJ**: 11.1.5

#### DB
**MySQL**: 8.0.41
**Redis**: 7.4.1

#### CI/CD
**Jenkins**: 2.492.1
**Docker**: 27.5.1

</br>

### 3. 상세

#### Backend

##### Spring Boot
**JDK**: 21
**Spring Boot**: 3.4.1
**Gradle**: 8.11.1
**JPA**: 3.4.3
**QueryDSL**: 5.0.0
**JWT**: 0.12.6
**OAuth 2.0** 
**Lombok**: 1.18.30

##### Node.js
**JavaScript**: ECMAScript 2024(ES15)
**Node.js**: 22.14.0
**mysql2**: 3.12.0
**OpenVidu**: 3.0.0
**LiveKit Egress**: 1.8.4
**LiveKit Ingress**: 1.4.2

##### Python Packages
**Python**: 3.11.9
**Flask**: 2.3.3
**Flask-SocketIO**: 5.3.4
**numpy**: 1.25.0
**opencv-python**: 4.9.0.60
**torch-cuda**: 2.1.0
**ultralytics**: 8.0.0

#### Frontend

**React**: 18.3.1
**TypeScript**: 5.6.2
**Vite**: 6.0.5
**Emotion**: 11.14.0
**Fullcalendar**: 6.1.15
**LiveKit**: 2.8.1
**Stomp**: 7.0.0
**Axios**: 1.7.9
**Socket.io**: 4.8.1
**Swiper**: 11.2.4
**Zustand**: 5.0.3
**Iamport**: 2.0.13

#### Server
**AWS**: 6.8.0-1021-aws
**Nginx**: 1.18.0
**Amazon S3** 
**Minio**: 2024.10.13-debian-12-r1

#### Mornitoring
**grafana**: 11.3.0

</br>

---

## ⚙빌드 방법

### ◼BE

#### Spring Boot
1. **`backend/butter** 프로젝트 열기
2. JDK 21 버전 확인
3. src/main/java/com/ssafy/butter/ButterApplication 실행

#### Flask
1. **`backend/butter_ai** 로 이동
2. Python 3.11.9 버전 확인
3. run.py 실행

#### Node.js
1. **`backend/butter_webrtc** 로 이동
2. ```npm install``` 실행
3. ```npm start``` 실행

### ◻FE

1. **`frontend/butter`** 프로젝트 열기 이동
2. ```npm install``` 실행
3. ```npm run dev``` 실행

</br>

---

## 🌞환경 변수

### ◼BE

#### Spring Boot
application-secret.yaml
```
custom:
  db:
    url : mysql url
    username: mysql 유저 id
    password: mysql 유저 비밀번호

  redis:
    host: redis url

  transaction:
    default-timeout: timeout 시간 설정
  hikari:
    maximum-pool-size: 최대 pool 크기 설정
    idle-timeout: timeout 시간 설정
    max-lifetime: lifetime 설정
    minimum-idle: minimum-idle 설정

  mail:
    email: 메일 계정 주소
    password: 메일 계정 비밀번호

  aws:
    s3:
      bucket-name: S3 서버 bucket 이름
      access-key: S3 서버 key
      secret-key: S3 서버 secret
      region: S3 서버 지역

  jwt:
    secret-key: JWT key
    expire:
      access: JWT expire access 
      refresh: JWT refresh 토큰

  oauth:
    google:
      client-id: 구글 oauth 아이디
      client-secret: 구글 oauth 비밀번호
    naver:
      client-id: 네이버 oauth 아이디
      client-secret: 네이버 oauth 비밀번호
      redirect-uri: 네이버 url

  iamport:
    api:
      key: 아임포트 key
      secret: 아임포트 secret
```

#### Node.js
.env
```
REACT_APP_KAKAOMAP_KEY = [KAKAOMAP-KEY]

VITE_NAVER_CALLBACK_URL = [NAVER-CALLBACK-URL]
VITE_NAVER_POPUP_URL = [NAVER-POPUP-URL]
VITE_NAVER_CLIENT_ID = [NAVER-CLIENT-ID]
VITE_NAVER_REDIRECT_URI = [NAVER-REDIRECT-URI]

VITE_SPRING_BOOT_SERVER = [SPRING-BOOT-URL]
VITE_NODE_JS_SERVER = [NODE-JS-URL]
VITE_LIVEKIT_SERVER = [LIVEKIT-URL]
VITE_FLASK_SERVER = [FLASK-URL]
```

### ◻FE
.env
```
SERVER_PORT = [SERVER-PORT]

LIVEKIT_URL = [LIVEKIT-URL]
LIVEKIT_API_KEY = [LIVEKIT-KEY]
LIVEKIT_API_SECRET = [LIVEKIT-SECRET]

S3_ENDPOINT = [S3-ENDPOINT]
S3_ACCESS_KEY = [S3-KEY]
S3_SECRET_KEY = [S3-KEY]
AWS_REGION = [AWS-REGION]
S3_BUCKET = [S3-BUCKET]
RECORDINGS_PATH = [RECORDINGS-PATH]
RECORDING_PLAYBACK_STRATEGY = [RECORDING-PLAYBACK-STRATEGY]

MYSQL_ENDPOINT = [MYSQL-ENDPOINT]
MYSQL_USER = [MYSQL-USER]
MYSQL_PASSWORD = [MYSQL-PASSWORD]
MYSQL_DATABASE = [MYSQL-DATABASE]
```


## 💻외부 서비스 정보

#### OpenVidu
> 화상회의 서비스를 위해 OpenVidu 설치 필요

#### Naver OAuth
> 네이버 로그인 서비스를 위해 Naver OAuth 신청 필요

#### IamPort
> 결제 서비스를 위해 IamPort 가입 필요
