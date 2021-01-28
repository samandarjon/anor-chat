package uz.anorchat.anorchat.service;

import javassist.tools.web.BadHttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.anorchat.anorchat.entity.Chat;
import uz.anorchat.anorchat.entity.Message;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.exception.ForbiddenException;
import uz.anorchat.anorchat.exception.NotFoundException;
import uz.anorchat.anorchat.payload.MessageRequest;
import uz.anorchat.anorchat.repository.ChatRepository;
import uz.anorchat.anorchat.repository.MessageRepository;
import uz.anorchat.anorchat.repository.UserRepository;

import javax.transaction.Transactional;

@Service
public class MessageService {
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(ChatRepository chatRepository, UserRepository userRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    public Chat getChatMessages(Long chatId, User user) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(() -> new NotFoundException("Sizda bunday chat yo`q."));
        if (chat.getFirstUser().getId().equals(user.getId())
                || chat.getSecondUser().getId().equals(user.getId())) {
            return chat;
        }
        throw new ForbiddenException("Bu chat siziki emas.");
    }


    @Transactional
    public MessageRequest addMessageToChat(User user, MessageRequest message) throws BadHttpRequest {
        if (message.getUserId().equals(user.getId())) {
            throw new BadHttpRequest(new Exception("Aldashga urunmang"));
        }
        User secondUser = userRepository.findById(message.getUserId()).orElseThrow(() -> new NotFoundException("Bunday foydalanuvchi topilamadi"));
        Chat chat = chatRepository.findByUsers(user.getId(), message.getUserId()).orElse(new Chat());
        System.out.println(chat.getId());
        if (chat.getId() == null) {
            chat.setFirstUser(user);
            chat.setSecondUser(secondUser);
            chatRepository.save(chat);
            Message newMessage = new Message();
            newMessage.setText(message.getMessage());
            newMessage.setChat(chat);
            messageRepository.save(newMessage);
            message.setChatId(chat.getId());
            return message;
        }
        Message newMessage = new Message();
        newMessage.setChat(chat);
        newMessage.setText(message.getMessage());
        chat.getMessages().add(newMessage);
        chatRepository.save(chat);
        message.setChatId(chat.getId());
        return message;
    }

}
