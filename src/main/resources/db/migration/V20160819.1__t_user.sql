CREATE TABLE t_user(
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '成员id',
  name varchar(50)  COMMENT '姓名',
  address varchar(50)  COMMENT '所在地',
  phone varchar(20)  COMMENT '所在地',
  PRIMARY KEY (id)
)COMMENT='成员表';


INSERT INTO t_user(name,address,phone) VALUES ('张粉针','广水','13500000001');
INSERT INTO t_user(name,address,phone) VALUES ('张益达','广水','13500000002');