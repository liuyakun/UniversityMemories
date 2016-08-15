package com.universityMemories.entityShow;


import org.springframework.data.domain.Page;

/**
 * Created by 刘亚坤 on 2016/8/15.
 */
public interface IUserService {


    /**
     * 通过条件查询用户
     * @param id 用户id
     * @param name 名称
     * @param address 真实姓名
     * @param phone 用户手机号
     * @return 用户集合
     */
    Page<UserShow> findByKeys(Integer id, String name, String address, String phone, Integer currentPage, Integer pageSize)throws Exception;
}
