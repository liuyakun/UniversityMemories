package com.universityMemories.entityShow;

/**
 * Created by 刘亚坤 on 2016/8/15.
 */
public class UserShow {
    private Integer id;
    private String name;
    private String address;
    private String phone;

    public UserShow() {
    }

    public UserShow(String name, String address, String phone) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
