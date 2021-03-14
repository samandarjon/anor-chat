package uz.anorchat.anorchat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AnorChatApplication {
    public static void main(String[] args) {
        SpringApplication.run(AnorChatApplication.class, args);
    }

}
