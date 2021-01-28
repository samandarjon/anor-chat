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
        User user = new User(null,"user1","user1",bCryptPasswordEncoder.encode("user1"));
        User user2 = new User(null,"user2","user2",bCryptPasswordEncoder.encode("user2"));
        User user3 = new User(null,"user3","user3",bCryptPasswordEncoder.encode("user3"));
        userRepository.save(user);
        userRepository.save(user2);
        userRepository.save(user3);
    }
}
