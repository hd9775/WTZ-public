# FROM gradle:8-jdk11 as builder
# WORKDIR /app

# COPY build.gradle /app
# COPY src ./src
# RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

# FROM openjdk:11
# COPY --from=builder /app/build/libs/*.jar /app/app.jar
# EXPOSE 8080
# ENTRYPOINT ["java","-jar","/app/app.jar"]

# 1단계: 애플리케이션 빌드
FROM gradle:8-jdk11 as builder
WORKDIR /app

# Gradle 빌드에 필요한 파일들 복사
COPY build.gradle settings.gradle /app/
COPY src /app/src

# 빌드 수행
RUN gradle build -x test --parallel --continue

# 2단계: 실행 가능한 JAR 파일 빌드
FROM openjdk:11

# 이전 단계에서 빌드된 JAR 파일을 복사
COPY --from=builder /app/build/libs/*.jar /app/app.jar

# 포트 노출 및 애플리케이션 실행
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
