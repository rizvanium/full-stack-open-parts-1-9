import { createContext, useContext, useEffect, useReducer } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...action.payload };
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  let [user, userDispatch] = useContext(UserContext);
  useEffect(() => {
    if (user) return;

    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return;
    const currentUser = JSON.parse(currentUserJson);

    userDispatch({
      type: 'SET_USER',
      payload: currentUser,
    });
  }, [user, userDispatch]);

  return user;
};

export const useUserDispatch = () => {
  const [, userDispatch] = useContext(UserContext);
  return userDispatch;
};

export default UserContext;
