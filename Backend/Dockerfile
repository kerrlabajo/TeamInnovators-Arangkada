# Fetching latest version of Java
FROM openjdk:17
 
# Setting up work directory
WORKDIR /app

# Copy the jar file into our app
COPY ./target/Arangkada-0.0.1-SNAPSHOT.jar /app

EXPOSE 8080

# Starting the application
CMD ["java", "-jar", "Arangkada-0.0.1-SNAPSHOT.jar"]