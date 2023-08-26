import { useState } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { createContext } from "react";
const SIDEBAR_WIDTH_CLOSED=60;
const SIDEBAR_WIDTH_OPENED=300;
export const SidebarContext = createContext({});
export function useSidebarContext () {
    return useContext(SidebarContext);
}
export function SidebarProvider ({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarWidth = useMemo(
        ()=>(isOpen ? SIDEBAR_WIDTH_OPENED : SIDEBAR_WIDTH_CLOSED )
        ,[isOpen]
    );
    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen, sidebarWidth }}>
            {children}
        </SidebarContext.Provider>
    )
}