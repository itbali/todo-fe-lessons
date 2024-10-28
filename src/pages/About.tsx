import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useLayoutEffect, useRef} from "react";
import AboutContent from "../entities/user/ui/AboutContent.tsx";

const About = () => {
    const titleRef = useRef<HTMLSpanElement | null>(null)

    useLayoutEffect(() => {
        console.log(titleRef.current?.innerText)
    }, [])

    return (
        <Box>
            {/*{isMobile && <Typography>I can see you</Typography>}*/}
            <AboutContent ref={titleRef} />
        </Box>
    );
};

export default About;