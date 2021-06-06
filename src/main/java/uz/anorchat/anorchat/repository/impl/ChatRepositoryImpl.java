package uz.anorchat.anorchat.repository.impl;

import org.springframework.stereotype.Repository;
import uz.anorchat.anorchat.repository.dto.ChatDto;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class ChatRepositoryImpl {
    private final EntityManager entityManager;

    public ChatRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<?> findAllUserChat(Long currentUser) {
        Query query = entityManager.createNativeQuery("select chat_id     as chat_id,\n" +
                "       m.id        as message_id,\n" +
                "\n" +
                "       text        as message,\n" +
                "       time        as created_at,\n" +
                "       created_by  as created_by,\n" +
                "       seen        as is_seen,\n" +
                "       u.id        as chat_user_id,\n" +
                "       u.full_name as chat_user_fullname\n" +
                "\n" +
                "from message m\n" +
                "         left join chat c on c.id = m.chat_id\n" +
                "         left join users u\n" +
                "                   on case\n" +
                "                          when first_user_id = :current_user_id\n" +
                "                              then u.id = c.second_user_id\n" +
                "                          else u.id = c.first_user_id end\n" +
                "where (c.first_user_id = :current_user_id\n" +
                "    or c.second_user_id = :current_user_id)\n" +
                "  and m.id in (select m.id\n" +
                "               from message m\n" +
                "                        join chat c on c.id = m.chat_id\n" +
                "               where (c.first_user_id = :current_user_id\n" +
                "                   or c.second_user_id = :current_user_id)\n" +
                "                 and time = (select max(time) from message me where me.chat_id = m.chat_id group by m.chat_id)\n" +
                "               group by m.chat_id, m.id, time\n" +
                "               order by chat_id\n" +
                ")\n" +
                "order by time desc ", ChatDto.class);
        query.setParameter("current_user_id", currentUser);
        return query.getResultList();
    }
}
