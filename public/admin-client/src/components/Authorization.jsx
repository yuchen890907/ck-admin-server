import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Authorization = ({ children }) => {
  const { loginState } = useStateContext();

  // 未登入強制轉到login router
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (loginState.isLogin === false) return navigate("/login", { state: location.pathname });
    // eslint-disable-next-line
  }, []);
  return <>{children}</>;
};

export default Authorization;
