package uz.anorchat.anorchat.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uz.anorchat.anorchat.entity.User;
import uz.anorchat.anorchat.exception.LoginException;
import uz.anorchat.anorchat.exception.NotFoundException;
import uz.anorchat.anorchat.payload.ApiResponse;
import uz.anorchat.anorchat.payload.Login;
import uz.anorchat.anorchat.payload.Register;
import uz.anorchat.anorchat.payload.TokenResponse;
import uz.anorchat.anorchat.repository.UserRepository;
import uz.anorchat.anorchat.security.JwtAuthenticationProvider;

import javax.transaction.Transactional;

@Service
public class UserAuthService implements UserDetailsService {
    private final Logger logger = LoggerFactory.getLogger(UserAuthService.class);
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    public UserAuthService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManager authenticationManager, @Lazy JwtAuthenticationProvider jwtAuthenticationProvider) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtAuthenticationProvider = jwtAuthenticationProvider;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("Username yoki parol xato"));
    }

    @Transactional
    public User loadUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("Foydalanuvchi topilamadi."));
    }

    public ApiResponse registerUser(Register register) {
        if (!userRepository.existsByUsername(register.getUsername())) {
            if (register.getConfirmPassword().equals(register.getPassword())) {
                try {
                    User user = new User(null,
                            register.getFullName(),
                            register.getUsername(),
                            bCryptPasswordEncoder.encode(register.getPassword()));
                    userRepository.save(user);
                    return new ApiResponse("Foydalanuvchi muvoffaqiyatli ro`yxatdan o`tdi.", 201);
                } catch (NotFoundException e) {
                    logger.error(e.getLocalizedMessage());
                    throw e;
                } catch (Exception e) {
                    logger.error(e.getLocalizedMessage());
                    e.printStackTrace();
                    return new ApiResponse(e.getLocalizedMessage(), 500);
                }
            }
            return new ApiResponse("Tasdiqlovchi parol mos kelmadi.", 400);
        }
        return new ApiResponse("Bu foydalanuvchi oldindan mavjud.", 400);
    }

    public TokenResponse loginUser(Login login) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    login.getUsername(),
                    login.getPassword()
            ));
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String token = jwtAuthenticationProvider.generateToken(authenticate);
            return new TokenResponse(token, "Bearer");
        } catch (InternalAuthenticationServiceException e) {
            logger.error(e.getLocalizedMessage());
            throw new NotFoundException(e.getMessage());
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            e.printStackTrace();
            throw new LoginException("Nimadir xato bo`ldi");

        }

    }
}
