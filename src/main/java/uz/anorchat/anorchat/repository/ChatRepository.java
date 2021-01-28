package uz.anorchat.anorchat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.anorchat.anorchat.entity.Chat;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("select ch from Chat as ch" +
            " where (ch.firstUser.id = ?1 and ch.secondUser.id =?2) or " +
            "(ch.firstUser.id = ?2 and ch.secondUser.id =?1)")
    Optional<Chat> findByUsers(Long firstUser_id, Long secondUser_id);


    List<Chat> findAllByFirstUserIdOrSecondUserId(Long firstUser_id, Long secondUser_id);
}
