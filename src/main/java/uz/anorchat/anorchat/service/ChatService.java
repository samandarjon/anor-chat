package uz.anorchat.anorchat.service;

import org.springframework.stereotype.Service;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.repository.impl.ChatRepositoryImpl;

import java.util.List;

@Service
public class ChatService {
    private final ChatRepositoryImpl chatRepository;

    public ChatService(ChatRepositoryImpl chatRepository) {
        this.chatRepository = chatRepository;
    }


    public List<?> getAll(User user) {
        return chatRepository.findAllUserChat(user.getId());
    }
}
