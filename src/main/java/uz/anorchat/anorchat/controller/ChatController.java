package uz.anorchat.anorchat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.security.CurrentUser;
import uz.anorchat.anorchat.service.ChatService;

@RestController
@RequestMapping("/api/chats")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    private ResponseEntity<?> getAllChats(@CurrentUser User user) {
       return ResponseEntity.ok( chatService.getAll(user));
    }


}
