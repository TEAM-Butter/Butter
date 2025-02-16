import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useState } from "react";

const ToggleWrapper = styled.div`
    display: inline-flex;
    border-radius: 30px;
    overflow: hidden;
    align-items: center;
    position: relative;
    `

const ToggleItem = styled.div<{ isActive: boolean }>`
    background-color: #040a14;
    width: 120px;
    display: flex;
    justify-content: center;
    transition: all ease-in-out 0.2s;
    
    span {
        padding: 10px 15px;
        font-weight: 300;
        z-index: 15;
        color: ${({ isActive }) => (isActive ? "black" : "white")};
    }
`

const ToggleBar = styled(motion.span)`
    background: var(--liner);
    position: absolute;
    top: 3px;
    width: 110px;
    height: 28px;
    border-radius: 30px;
    z-index: 10;
`

interface ToggleProps {
    setGenreToggle: React.Dispatch<React.SetStateAction<string>>;
}

export const GenreToggle = ({ setGenreToggle }: ToggleProps) => {
    const [genreMatch, setGenreMatch] = useState("All")

    const genres = [
        "All",
        "Pop",
        "K-Pop",
        "Ballad",
        "Acoustic",
        "Hip-Hop",
        "R&B",
        "Indie",
        "Trot",
    ];

    return (
        <ToggleWrapper>
            {genres.map(genre =>
                <ToggleItem
                    key={genre}
                    isActive={genreMatch === genre}
                    onClick={() => {
                        setGenreMatch(genre)
                        setGenreToggle(genre)
                    }}>
                    {genreMatch === genre && <ToggleBar layoutId="toggle-bar" />}
                    <span>{genre}</span>
                </ToggleItem>)}
        </ToggleWrapper>
    )
}