import { useCallback, useEffect, useRef, useState } from "react";
import { CurrentUserInfo } from "../types/CurrentUserInfo";
import { CurrentUserContext } from "./CurrentUserContext";

export const CurrentUserProvider = (props: any) => {
  const [currentUserInfo, setCurrentUserInfo] = useState<CurrentUserInfo>({
    name: "",
    role: "",
    hasLoaded: false,
  });

  // const getUserInfo = useCallback(async () => {
  //   let userInfo: CurrentUserInfo | null = null;
  //   try {
  //     const data = {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           // name: username,
  //           // password: password,
  //         },
  //       }),
  //     };
  //     userInfo = await fetch(`${import.meta.env.VITE_URL}/auth/login`, data)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.success) {
  //           localStorage.setItem("jwt", res.jwt);
  //         } else {
  //           throw res;
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const token = () => localStorage.getItem("jwt");

  return (
    <CurrentUserContext.Provider value={currentUserInfo}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
