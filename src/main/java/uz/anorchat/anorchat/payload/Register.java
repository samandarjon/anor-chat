package uz.anorchat.anorchat.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Register {
    @NotBlank(message = "Username bo`sh bo`lishi mumkin emas.")
    private String username;
    @NotBlank(message = "Ism familiyangiz bo`sh bo`lishi mumkin emas.")
    private String fullName;
    @NotBlank(message = "Parol bo`sh bo`lishi mumkin emas.")
    private String password;
    @NotBlank(message = "Tasqiqlovchi parol bo`sh bo`lishi mumkin emas.")
    private String confirmPassword;

}
