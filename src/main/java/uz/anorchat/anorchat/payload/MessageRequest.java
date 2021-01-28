package uz.anorchat.anorchat.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {
    @NotBlank(message = "User tanlanmagan.")
    private Long userId;
    private Long chatId;
    @NotBlank(message = "Xabar bo`sh bo`lishi mumkin emas.")
    private String message;
}
