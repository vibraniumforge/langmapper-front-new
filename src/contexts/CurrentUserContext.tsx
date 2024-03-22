import { createContext } from "react";
import { CurrentUserInfo } from "../types/CurrentUserInfo";

export const CurrentUserContext = createContext<CurrentUserInfo | null>(null);
