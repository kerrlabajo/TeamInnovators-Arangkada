import { createContext, useState } from "react";

export type User = {
  type: string,
  username: string,
  password: string,
  firstname: string,
  lastname: string, 
  userId: string,
  accountId: string;
}

export type UserContextType = {
  user: User | null,
  handleSetUser: (user: User | null) => void,
}

const getInitialUserState = () => {
  const data = window.localStorage.getItem("ARANGKADA_USER");
  return data !== null? JSON.parse(data): null;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState(getInitialUserState());

  const handleSetUser = (user: User | null) => {
    setUser(user);
  }

  const value = {
    user,
    handleSetUser,
  }

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserContextProvider;