package uz.anorchat.anorchat.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Login {
    @NotBlank(message = "Username bo`sh bo`lishi mumkin emas.")
    private String username;
    @NotBlank(message = "Parol bo`sh bo`lishi mumkin emas.")
    private String password;
}
