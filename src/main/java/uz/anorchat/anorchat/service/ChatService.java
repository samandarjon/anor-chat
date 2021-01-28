package uz.anorchat.anorchat.service;

import org.springframework.stereotype.Service;
import uz.anorchat.anorchat.entity.Chat;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.repository.ChatRepository;

import java.util.List;

@Service
public class ChatService {
    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public List<Chat> getAll(User user) {
        return chatRepository.findAllByFirstUserIdOrSecondUserId(user.getId(), user.getId());
    }
}
