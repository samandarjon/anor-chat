package uz.anorchat.anorchat.controller;

import javassist.tools.web.BadHttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.anorchat.anorchat.entity.Chat;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.payload.MessageRequest;
import uz.anorchat.anorchat.security.CurrentUser;
import uz.anorchat.anorchat.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> getChatMessages(@CurrentUser User user, @PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(messageService.getChatMessages(chatId, user));
    }

    @PostMapping
    public ResponseEntity<MessageRequest> addMessageToChat(@CurrentUser User user, @RequestBody MessageRequest message) throws BadHttpRequest {
        return ResponseEntity.ok(messageService.addMessageToChat(user, message));
    }


}
