import styled from "@emotion/styled";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keyframes } from "@emotion/react";

import Home1Page from "./Home1Page";
import Home2Page from "./Home2Page";
import Home3Page from "./Home3Page";
import Home4Page from "./Home4Page";

const HomeWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
`

const HomeNav = styled.div`
    display: flex;
    position: absolute;
    top: 35px;
    left: 50px;
    z-index: 5;
    gap: -10px;
`

const NavItem = styled.div`
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.2);
    backdrop-filter: blur(8px);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.2);
    font-weight: 500;
    color: var(--darkgray);
    
    &:not(:first-child) {
        margin-left: -10px; /* 👈 위쪽 마진을 음수로 설정해서 겹치게 만듦 */
    }
    
    &:hover{
        background-color: rgba(255,255,255,0.4);
    }
    `

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState("home1");

    return (
        <>
            <HomeNav>
                <NavItem onClick={() => setCurrentPage("home1")}>1</NavItem>
                <NavItem onClick={() => setCurrentPage("home2")}>2</NavItem>
                <NavItem onClick={() => setCurrentPage("home3")}>3</NavItem>
                <NavItem onClick={() => setCurrentPage("home4")}>4</NavItem>
            </HomeNav>
            <AnimatePresence>
                <HomeWrapper
                    key={currentPage} // 컴포넌트 변경 감지
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4 }}
                >
                    {currentPage === "home1" && <Home1Page />}
                    {currentPage === "home2" && <Home2Page />}
                    {currentPage === "home3" && <Home3Page />}
                    {currentPage === "home4" && <Home4Page />}
                </HomeWrapper>
            </AnimatePresence>
        </>
    )
}

export default HomePage;