package uz.anorchat.anorchat.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.anorchat.anorchat.entity.Message;
import uz.anorchat.anorchat.entity.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private Long id;
    private User user1;
    private User user2;
    private Message message;

}
