package uz.anorchat.anorchat.component;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import uz.anorchat.anorchat.security.CurrentUser;

@Component
public class WebsocketSchedule {
    private final SimpMessagingTemplate messagingTemplate;

    public WebsocketSchedule(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedDelay = 1000, initialDelay = 3000)
    public void cronJobSch() {
        messagingTemplate.convertAndSendToUser("user1", "/topic/messaging", "hello");
    }}
