package uz.anorchat.anorchat.service.utils;

import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;

public class RequestUtil {
    public static boolean checkValue(MultiValueMap<String, String> queryParams, String key) {
        return queryParams.containsKey(key) && !StringUtils.isEmpty(queryParams.getFirst(key));
    }


}
