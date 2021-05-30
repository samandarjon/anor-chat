package uz.anorchat.anorchat.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import uz.anorchat.anorchat.entity.Chat;
import uz.anorchat.anorchat.entity.Message;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.repository.ChatRepository;
import uz.anorchat.anorchat.repository.MessageRepository;
import uz.anorchat.anorchat.repository.UserRepository;

import java.util.ArrayList;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void run(String... args) throws Exception {
//        create temp user if user size less zero or equal
        if (userRepository.count() <= 0) {
//           Create user with Builder pattern
            for (int i = 4; i < 10; i++) {
                User fake = User.builder()
                        .fullName("user" + i)
                        .username("user" + i)
                        .password(bCryptPasswordEncoder.encode("user"))
                        .build();
                userRepository.save(fake);
            }
            User user1 = User.builder()
                    .fullName("user1")
                    .username("user1")
                    .password(bCryptPasswordEncoder.encode("user1"))
                    .build();
            User user2 = User.builder()
                    .fullName("user2")
                    .username("user2")
                    .password(bCryptPasswordEncoder.encode("user2"))
                    .build();
            User user3 = User.builder()
                    .fullName("user3")
                    .username("user3")
                    .password(bCryptPasswordEncoder.encode("user3"))
                    .build();
            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            Chat chat = chatRepository.save(new Chat(null, user1, user2, new ArrayList<>()));
            messageRepository.save(Message.builder()
                    .chat(chat)
                    .text("message form user1")
                    .createdBy(user1.getId()).build());
            messageRepository.save(Message.builder()
                    .chat(chat)
                    .text("message form user2")
                    .createdBy(user2.getId()).build());
            messageRepository.save(Message.builder()
                    .chat(chat)
                    .text("Hello")
                    .createdBy(user2.getId()).build());


        }
    }
}
