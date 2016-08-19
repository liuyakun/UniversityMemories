package com.universityMemories.service;

import com.universityMemories.entity.User;
import com.universityMemories.entityShow.IUserService;
import com.universityMemories.entityVo.UserShowEx;
import com.universityMemories.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.universityMemories.entityShow.UserShow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by 刘亚坤 on 2016/8/15.
 */
@Service
public class UserService implements IUserService {
    private UserRepository userRepository = null;
    @Autowired
    public void setUserRepository(UserRepository userRepository){ this.userRepository = userRepository; }

    /**
     * 通过条件查询用户
     * @param id 用户id
     * @param name 名称
     * @param address 真实姓名
     * @param phone 用户手机号
     * @param currentPage 分页第几页
     * @param pageSize 分页大小
     * @return 用户集合
     */

    @Override
    public Page<UserShow> findByKeys(Integer id, String name, String address, String phone, Integer currentPage, Integer pageSize)throws Exception{
        currentPage = currentPage == null?1:currentPage;
        currentPage = currentPage <= 0?1:currentPage;
        pageSize = pageSize == null?10:pageSize;
        pageSize = pageSize <= 0?10:pageSize;

        name = ("".equals(name))?null : name;
        address = ("".equals(address))?null : address;
        phone = ("".equals(phone))?null : phone;

        Pageable p = new PageRequest(currentPage-1,pageSize);

        Page<User> users;

        users = userRepository.findByKeys(id, name, address, phone, p);

        List<User> userList = users.getContent();
        List<UserShow> list = new ArrayList<>();
        for(User user : userList){
            UserShow userShow = new UserShowEx(user);

            list.add(userShow);
        }

        return new PageImpl<UserShow>(list,p,users.getTotalElements());
    }

}
