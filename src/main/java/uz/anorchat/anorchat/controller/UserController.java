package uz.anorchat.anorchat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.security.CurrentUser;
import uz.anorchat.anorchat.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> findUserByName(@RequestParam MultiValueMap<String, String> queryParams, @CurrentUser User user) {
        return ResponseEntity.ok(userService.findUserByParam(queryParams, user.getId()));
    }
}
