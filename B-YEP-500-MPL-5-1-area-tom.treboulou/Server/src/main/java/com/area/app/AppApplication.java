package com.area.app;

import java.io.FileInputStream;
import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class AppApplication extends SpringBootServletInitializer {
	public static void main(String[] args) throws IOException {
        FileInputStream serviceAccount = new FileInputStream("area-babz-096d792aaf76.json");

        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://area-babz-default-rtdb.firebaseio.com")
            .build();
        FirebaseApp.initializeApp(options);
        serviceAccount.close();
		SpringApplication.run(AppApplication.class, args);
	}
}