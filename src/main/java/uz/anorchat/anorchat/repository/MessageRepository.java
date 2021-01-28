package uz.anorchat.anorchat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.anorchat.anorchat.entity.Message;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
//    @Query("select m from Message m where m.chat.id = (select ch from Chat ch where ch.firstUser.id = :id or ch.secondUser.id=:id).id")
//    List<?> findAllByChat(@Param("id") Long userId);

}
