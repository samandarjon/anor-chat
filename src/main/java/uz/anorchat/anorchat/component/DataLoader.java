package uz.anorchat.anorchat.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void run(String... args) throws Exception {
//        create temp user if user size less zero or equal
        if (userRepository.count() <= 0) {
//           Create user with Builder pattern
            User user = User.builder()
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
            userRepository.save(user);
            userRepository.save(user2);
            userRepository.save(user3);
        }
    }
}
