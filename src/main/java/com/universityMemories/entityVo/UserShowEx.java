package com.universityMemories.entityVo;

import com.universityMemories.entity.User;
import com.universityMemories.entityShow.UserShow;

/**
 * Created by 刘亚坤 on 2016/8/15.
 */
public class UserShowEx extends UserShow {
    public UserShowEx(User user){
        this.setId(user.getId());
        this.setName(user.getName());
        this.setAddress(user.getAddress());
        this.setPhone(user.getPhone());
    }
}
