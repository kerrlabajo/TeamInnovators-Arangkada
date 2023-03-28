import { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext, UserContextType } from "../helpers/UserContext";

export const DriverRoute = ({ children }: { children: JSX.Element}) => {
  const { user } = useContext(UserContext) as UserContextType;
  if(user !== null) {
    if(user.type === "Driver")
      return children;
    else if(user.type === "Operator")
      return <Navigate to="/operator" replace />;
  }
  return <Navigate to="/" replace />;
}

export const OperatorRoute = ({ children }: { children: JSX.Element}) => {
  const { user } = useContext(UserContext) as UserContextType;
  if(user !== null) {
    if(user.type === "Operator")
      return children;
    else if(user.type === "Driver")
      return <Navigate to="/driver" replace />;
  }
  return <Navigate to="/" replace />;
}

export const PublicRoute = ({ children }: { children: JSX.Element}) => {
  const { user } = useContext(UserContext) as UserContextType;
  if(user !== null) {
    if(user.type === "Operator")
      return <Navigate to="/operator" replace />;
    else if(user.type === "Driver")
      return <Navigate to="/driver" replace />;
  }
  return children;
}


