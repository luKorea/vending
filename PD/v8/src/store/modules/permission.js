import { asyncRouterMap, constantRoutesStart,asyncRouterMapStr } from '@/router'

import { hasPermission } from '@/utils/auth'


/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    });
    return accessedRouters
}
/**/
const permission = {
    state: {
        routers: constantRoutesStart,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            let constantRoutes = constantRoutesStart.concat(routers)
            state.routers = constantRoutes;
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                let accessedRouters;
                let abc={
                    abc:[...asyncRouterMap]
                }
                accessedRouters = filterAsyncRouter(abc.abc, roles)
                console.log('asyncRouterMap1',asyncRouterMap);
                console.log('asyncRouterMap2',[...asyncRouterMap]);
                console.log('asyncRouterMapStr',JSON.parse(asyncRouterMapStr));
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission
