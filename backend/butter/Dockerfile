FROM openjdk:21-jre

# 빌드 아티팩트의 경로를 빌드 컨텍스트 기준으로 설정
ARG JAR_FILE=build/libs/*.jar

# 컨테이너 내부에 작업 디렉토리 생성 및 설정
WORKDIR /app

# JAR 파일을 컨테이너 내부로 복사
COPY ${JAR_FILE} app.jar

# 애플리케이션이 사용하는 포트 노출
EXPOSE 8080

# 애플리케이션 실행 명령어 설정
ENTRYPOINT ["java", "-jar", "app.jar"]
