import i18next from "i18next";
import { createContext, useContext, useEffect, useState } from "react";

export const LocalizeContext = createContext({});
const LocalizeProvider = ({ children })=>{
    const [locale, setLocale] = useState("en");
    useEffect(()=>{
        i18next.changeLanguage(locale);
    }, [locale])
    
    return (
        <LocalizeContext.Provider value={{ locale, setLocale }}>
          <div dir={i18next.dir(locale)}>{children}</div>
        </LocalizeContext.Provider>
    )
}
export default LocalizeProvider;
export const useLocale = ()=> {
    return useContext(LocalizeContext)
}