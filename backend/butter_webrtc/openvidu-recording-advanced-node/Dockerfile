# 1️⃣ Node.js 공식 이미지 사용 (최신 LTS 버전 권장)
FROM node:18

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ package.json과 package-lock.json 복사
COPY package*.json ./

# 4️⃣ 의존성 설치 (프로덕션 환경에서는 `npm ci` 사용)
RUN npm install

# 5️⃣ 애플리케이션 소스 코드 복사
COPY . .

# 6️⃣ 컨테이너 실행 시 노출할 포트
EXPOSE 3000

# 7️⃣ 애플리케이션 실행 명령어
CMD ["node", "server.js"]
