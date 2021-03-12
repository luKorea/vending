/**
 * /user/findOtherRole查询用户没有的角色
 GET
 UId String

 /user/findByRole 查询用户下拥有所有角色
 GET
 UId String

 /role/addRole 插入角色
 POST
 "roleName" String 角色名字
 "remark" String 备注

 /role/userRelevanceRole用户关联角色
 POST
 "roleList":[1,2],角色ID
 "userId":"1"用户id

 /role/deRoleByUId删除角色 （有用户关联此角色将无法删除）
 Get
 roleId角色ID

 /role/roleRelevanceCon角色关联权限
 POST
 "controlList":[1,2], 权限ID
 "roleId":1 角色ID

 /role/findAll 查询角色列表
 GET
 "pageNum":1,
 "pageSize":10,
 "roleName":"123"角色名字

 /role/updateRole 修改角色
 "controlList":[1,2],权限列表
 "roleId":1, 角色ID
 "remark":"123" 备注
 */