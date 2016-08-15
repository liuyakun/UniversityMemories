
create table g_result(
  id int(11) NOT NULL AUTO_INCREMENT COMMENT '成员id',
  name varchar(50)  COMMENT '姓名',
  assignee varchar(50)  COMMENT '所在地',
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成员表';