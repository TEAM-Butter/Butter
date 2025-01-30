import styled from "@emotion/styled";
// npm i framer-motion 설치
import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";

const Nav = styled.nav`
    display: flex;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    height: 55px;
    position: fixed;
    top: 0;
    color: white;
    `;

const Col = styled.div``;

// logo motion(hover 애니메이션)사용
const Logo = styled(motion.div)`
    padding-left: 20px;
    font-size:30px;
    font-weight: bold;
    color: #FEFFE9;
`;

const Items = styled.ul`
    display:flex;
    font-size: 15px;
    font-weight: medium;
    `;

const Item = styled.li`
    width: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Bar = styled(motion.span)`
    position: absolute;
    width: 100px;
    height: 2px;
    background-color: #FEFFE9; 
    bottom: -15px;
    border-radius: 30px;
`;

const logoVariants = {
    normal: {
        opacity: 1,
    },
    active: {
        opacity: 0.8,
    },
}

function Header(){
    const homeMatch = useMatch("");
    const buskingMatch = useMatch("busking");
    const streamMatch = useMatch("stream");
    const crewMatch = useMatch("crew");
    const loginMatch = useMatch("login");
    return (
        <Nav>
            <Col>
                {/* variants, whileHover를 통해 Hover시 동작할 모션 정의 초기값(initial)은 normal*/}
                <Link to="/">
                <Logo 
                    variants={logoVariants}
                    initial="normal"
                    whileHover="active">
                    B
                </Logo>
                </Link>
            </Col>
            <Col>
                <Items>
                    <Link to="/"><Item>HOME { homeMatch && <Bar layoutId="bar" />}</Item></Link>
                    <Link to="/busking"><Item>MAP { buskingMatch && <Bar layoutId="bar" />}</Item></Link>
                    <Link to="/stream"><Item>STREAMING { streamMatch && <Bar layoutId="bar" />}</Item></Link>
                    <Link to="/crew"><Item>CREW { crewMatch && <Bar layoutId="bar" />}</Item></Link>
                    <Link to="/login"><Item>LOGIN { loginMatch && <Bar layoutId="bar" />}</Item></Link>
                </Items>
            </Col>
            <Col>
                Profile
            </Col>
        </Nav>
    );
};

export default Header;