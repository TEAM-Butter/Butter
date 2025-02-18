import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useState } from "react";

const Container = styled.div`
    display: flex;
`

const ToggleWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr); 
    row-gap: 5px;

    @media (max-width: 1350px) {
        grid-template-columns: repeat(5, 1fr); 


        & > div:nth-child(5) {
            border-radius: 0 30px 30px 0;
        }
        & > div:nth-child(6) {
            border-radius: 30px 0 0 30px;
        }
    }

    border-radius: 30px;
    align-items: center;
    `

const ToggleItem = styled.div<{ isActive: boolean }>`
    background-color: #040a14;
    position: relative;
    width: 120px;
    display: flex;
    justify-content: center;
    
    span {
        padding: 10px 15px;
        font-weight: 300;
        z-index: 15;
        color: ${({ isActive }) => (isActive ? "black" : "white")};
    }

    &:first-child {
        border-radius: 30px 0 0 30px;
    }
    
    &:last-child {
        border-radius: 0 30px 30px 0;
    }
`

const ToggleBar = styled(motion.span)`
    background: var(--liner);
    position: absolute;
    bottom: 3px;
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
        <Container>
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
        </Container>
    )
}