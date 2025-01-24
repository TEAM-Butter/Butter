# Step 1: Use an official JDK image as the base image
FROM eclipse-temurin:21-jdk AS build

# Step 2: Set working directory
WORKDIR backend/butter/app

# Step 3: Copy the application files
COPY . .

# Step 4: Build the application
RUN ./backend/butter/gradlew clean build -x test

# Step 5: Use a lightweight JRE image for the final container
FROM eclipse-temurin:21-jre

# Step 6: Set working directory for the final container
WORKDIR backend/butter/app

# Step 7: Copy the built JAR file from the previous stage
COPY --from=build backend/butter/app/build/libs/*.jar app.jar

# Step 8: Expose the application port
EXPOSE 8080

# Step 9: Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
