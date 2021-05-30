package uz.anorchat.anorchat.repository.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserDto {
    @Id
    @JsonProperty("chatUserId")
    private Long id;
    private String username;
    @Column(name = "full_name")
    @JsonProperty("chatUserFullname")
    private String fullName;
}
