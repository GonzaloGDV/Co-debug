import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Butlogout.module.css";

const Butreg = () => {
  const { logout } = useAuth0();
  return (
    <p onClick={() => logout()} className={style.buttonlogout}>
      Log Out
    </p>
  );
};

export default Butreg;
