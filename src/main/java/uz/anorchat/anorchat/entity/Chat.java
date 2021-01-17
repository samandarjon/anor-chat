package uz.anorchat.anorchat.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "first_user_id")
    @ManyToOne(cascade = CascadeType.ALL)
    private User firstUser;

    @JoinColumn(name = "second_user_id")
    @ManyToOne(cascade = CascadeType.ALL)
    private User secondUser;

    @OneToMany(mappedBy = "chat", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Message> messages;

}
