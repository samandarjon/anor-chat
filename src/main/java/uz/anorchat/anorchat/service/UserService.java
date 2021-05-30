package uz.anorchat.anorchat.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import uz.anorchat.anorchat.repository.dto.UserDto;
import uz.anorchat.anorchat.repository.impl.UserRepositoryImpl;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepositoryImpl userRepository;

    public List<UserDto> findUserByParam(MultiValueMap<String, String> params, Long userId) {
        return userRepository.findUsers(params, userId);
    }
}
