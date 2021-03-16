package uz.anorchat.anorchat.component;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class WebsocketSchedule {
    private final SimpMessagingTemplate messagingTemplate;

    public WebsocketSchedule(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedDelay = 1000, initialDelay = 1000)
    public void cronJobSch() {
      //  System.out.println("sent Message over websocket");
        messagingTemplate.convertAndSendToUser("user2", "/topic/periodic", "hello");
/*
        messagingTemplate.convertAndSendToUser("user1", "/topic/periodic", "hello");
        messagingTemplate.convertAndSendToUser("user3", "/topic/periodic", "hello");
*/
    }
}
