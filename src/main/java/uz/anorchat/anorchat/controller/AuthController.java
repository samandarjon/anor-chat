package uz.anorchat.anorchat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.anorchat.anorchat.payload.ApiResponse;
import uz.anorchat.anorchat.payload.Login;
import uz.anorchat.anorchat.payload.Register;
import uz.anorchat.anorchat.payload.TokenResponse;
import uz.anorchat.anorchat.service.UserService;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid Login login) {
        return ResponseEntity.ok(userService.loginUser(login));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> register(@RequestBody @Valid Register register) {
        ApiResponse apiResponse = userService.registerUser(register);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

}
