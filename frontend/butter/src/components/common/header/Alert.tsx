import styled from "@emotion/styled";
import { motion } from "framer-motion";

const AlertWrapper = styled(motion.div)`
    position: fixed;
    top: 55px;
    margin-top: 3px;
    right: -300px; /* 처음엔 화면 밖 */
    width: 250px;
    height: 450px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 100;
`;

interface AlertProps {
    isToggle: boolean;
}

export const Alert = ({ isToggle }: AlertProps) => {
    return (
        <AlertWrapper
            animate={{ right: isToggle ? "3px" : "-300px" }}
            transition={{ type: "spring", stiffness: 50 }}
        >
            <p>알림</p>
        </AlertWrapper>
    );
};
