package uz.anorchat.anorchat.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime time;

    @CreatedBy
    private Long createdBy;

    @Column(nullable = false)
    private String text;

    @JoinColumn(name = "chat_id")
    @JsonBackReference
    @ManyToOne(cascade = CascadeType.REMOVE)
    private Chat chat;

    private boolean seen;
}
