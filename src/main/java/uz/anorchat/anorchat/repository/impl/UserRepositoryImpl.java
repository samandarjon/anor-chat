package uz.anorchat.anorchat.repository.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ResponseBody;
import uz.anorchat.anorchat.repository.dto.UserDto;
import uz.anorchat.anorchat.service.utils.RequestUtil;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
@AllArgsConstructor
public class UserRepositoryImpl {
    private final EntityManager entityManager;

    public List<UserDto> findUsers(MultiValueMap<String, String> params, Long userId) {
        StringBuilder queryBuilder = getQueryBuilder(params);
        String query = "select u.id,\n" +
                "       u.full_name,\n" +
                "       u.username\n" +
                "from users u\n" +
                "         left outer join chat c on c.first_user_id = u.id or c.second_user_id = u.id\n" +
                "where u.id != :userId\n" +
                "  and c.first_user_id is null\n" +
                queryBuilder + " order by u.username";
        try {
            Query nativeQuery = entityManager.createNativeQuery(query, UserDto.class);
            nativeQuery.setParameter("userId", userId);
            setProperty(nativeQuery, params);
            return nativeQuery.getResultList();

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void setProperty(Query query, MultiValueMap<String, String> queryParams) {
        if(RequestUtil.checkValue(queryParams, "username")) {
            query.setParameter("username", "%" + queryParams.getFirst("username") + "%");
        }
        if(RequestUtil.checkValue(queryParams, "fullName")) {
            query.setParameter("fullName", "%" + queryParams.getFirst("fullName") + "%");
        }
    }


    private StringBuilder getQueryBuilder(MultiValueMap<String, String> queryParams) {
        StringBuilder queryBuilder = new StringBuilder();
        if(RequestUtil.checkValue(queryParams, "username")) {
            queryBuilder.append(" AND u.username like(:username) ");
        }
        if(RequestUtil.checkValue(queryParams, "fullName")) {
            queryBuilder.append(" AND u.full_name like(:fullName) ");
        }
        return queryBuilder;
    }

}
