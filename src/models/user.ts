import { ImmerReducer, Effect } from 'umi';
import { SubscriptionsMapObject } from 'dva';
import { getUserInfo } from '@/services/user';

export interface UserInfo {
  name?: string;
}

export interface UserModelState {
  info: UserInfo;
  token: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchUser: Effect;
  };
  reducers: {
    setUserInfo: ImmerReducer<UserModelState>;
    setToken: ImmerReducer<UserModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    info: {},
    token: '',
  },
  effects: {
    // 获取用户信息
    *fetchUser(_, { call, put }) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'setUserInfo',
        payload: response,
      });
    },
  },
  reducers: {
    // 修改用户信息
    setUserInfo(state, { payload }) {
      state.info = payload;
    },
    // 修改 token
    setToken(state, { payload }) {
      state.token = payload || '';
    },
  },
  subscriptions: {},
};

export default UserModel;
