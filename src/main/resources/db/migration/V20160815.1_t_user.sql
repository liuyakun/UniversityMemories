
create table t_user(
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '成员id',
  name varchar(50)  COMMENT '姓名',
  address varchar(50)  COMMENT '所在地',
  phone varchar(20)  COMMENT '所在地',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成员表';


INSERT INTO t_user(id,name, address,phone) VALUES (0,'张粉针','广水','13500000001');
INSERT INTO t_user(id,name, address,phone) VALUES (1,'张益达','广水','13500000002');