import { useRouter } from "next/router";
import { Component, useCallback } from "react";
import { IconType } from "react-icons";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType
    onClick?: () => void;
    auth?: boolean;
}

// icon: Icon to use it as a Component
const SidebarItem: React.FC<SidebarItemProps> = ({
    label, 
    href, 
    icon: Icon, 
    onClick,
    auth
}) => {
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();
    const handleClick = useCallback(() => {
        if (onClick) {      // Check if onClick exists
            return onClick();
        }

        // If we're authentic if this route is protected and we're not logged in or we don't have the current user
        if (auth && !currentUser) {
            loginModal.onOpen();
        } else if (href) {
            router.push(href);
        }
    }, [router, onClick, href, currentUser, auth, loginModal]);
    
    return(
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
                <Icon size={28} color="white"/>
                <p></p>
            </div>
            
            <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
                <Icon size={24} color="white"/>
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default SidebarItem;