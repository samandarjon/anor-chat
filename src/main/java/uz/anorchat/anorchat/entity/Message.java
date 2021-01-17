package uz.anorchat.anorchat.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @ColumnDefault("now()")
    private Date time;

    @CreatedBy
    private Long createdBy;

    private String text;

    @JsonIgnore
    @JoinColumn(name = "char_id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Chat chat;
    private boolean seen;
}
