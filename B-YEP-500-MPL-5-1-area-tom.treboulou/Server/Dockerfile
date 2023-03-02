FROM gradle:6.7.1-jdk8

RUN mkdir -p /serv

COPY . /serv/

WORKDIR /serv

RUN gradle clean build

ARG JAR_FILE=build/libs/*.jar

RUN cp ${JAR_FILE} /app.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "/app.jar" ]