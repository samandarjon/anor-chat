package uz.anorchat.anorchat.controller;

import javassist.tools.web.BadHttpRequest;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.exception.NotFoundException;
import uz.anorchat.anorchat.payload.MessageRequest;
import uz.anorchat.anorchat.payload.action.MessagingAction;
import uz.anorchat.anorchat.repository.UserRepository;
import uz.anorchat.anorchat.security.CurrentUser;
import uz.anorchat.anorchat.service.MessageService;


@RestController
public class QueueBrokerController {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;
    private final MessageService messageService;

    public QueueBrokerController(SimpMessagingTemplate messagingTemplate, UserRepository userRepository, MessageService messageService) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.messageService = messageService;
    }

    @MessageMapping("/messaging")
    public void typing(@Payload MessagingAction action, @CurrentUser User user) throws BadHttpRequest {
        if (action.getAction().name().equals("SENT_MESSAGE")) {
            User receiverUser = userRepository.findByUsername(action.getReceiverUsername())
                    .orElseThrow(() -> new NotFoundException("Qabul qilivchi topilmadi..."));
             messageService.addMessageToChat(user, new MessageRequest(receiverUser.getId(), action.getChatId(), action.getContent()));

        }
        messagingTemplate.convertAndSendToUser(action.getReceiverUsername(), "/topic/messaging", action);
    }
}
