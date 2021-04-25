package uz.anorchat.anorchat.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {
    @Id
    @Column(name = "chat_id")
    private Long chatId;
    @Column(name = "message_id")
    private Long messageId;
    @Column(name = "message")
    private String message;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "created_by")
    private Long createdBy;
    @Column(name = "is_seen")
    private boolean isSeen;
    @Column(name = "chat_user_id")
    private Long chatUserId;
    @Column(name = "chat_user_fullname")
    private String chatUserFullname;
}
