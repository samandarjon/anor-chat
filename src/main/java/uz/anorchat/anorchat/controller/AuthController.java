package uz.anorchat.anorchat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.anorchat.anorchat.exception.NotFoundException;
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

    /**
     * {@code POST  /api/auth/login} : login user.
     * d
     *
     * @param login the login to create.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the token response,
     * or with status {@code 400 (Bad Request)} if the username and password is blank.
     * @throws InternalAuthenticationServiceException if the username and password doesn't match with database row.
     */
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid Login login) {
        return ResponseEntity.ok(userService.loginUser(login));
    }

    /**
     * {@code POST  /api/auth/singup} : register user.
     *
     * @param register the register to create.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ApiResponse,
     * or with status {@code 400 (Bad Request)} if  confirm password isn't match with password.
     * @throws NotFoundException if the user not found form db.
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> register(@RequestBody @Valid Register register) {
        ApiResponse apiResponse = userService.registerUser(register);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

}
