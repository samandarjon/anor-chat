package uz.anorchat.anorchat.payload.action;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NotNull
public class MessagingAction {
    private String senderUsername;
    private String receiverUsername;
    private Long chatId;
    private Action action;
    private String content;
}
