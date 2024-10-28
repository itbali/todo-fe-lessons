import {MutableRefObject, forwardRef} from 'react';
import Typography from "@mui/material/Typography";

const AboutContent = forwardRef<HTMLSpanElement | null>((_props,ref) => {
    return (
        <>
            <Typography variant={'h1'} ref={ref}>
                About
            </Typography>
            <Typography variant={'body1'}>
                This is simple ToDo application
            </Typography>
        </>
    );
});

export default AboutContent;