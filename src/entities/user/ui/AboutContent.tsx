import {forwardRef, useState} from 'react';
import Typography from "@mui/material/Typography";
import CustomButton from "../../../shared/ui/kit/CustomButton.tsx";

const AboutContent = forwardRef<HTMLSpanElement | null>((_props,ref) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <Typography variant={'h1'} ref={ref}>
                About
            </Typography>
            <CustomButton onClick={()=>setIsShow(!isShow)}>show</CustomButton>
            {isShow &&
                <Typography variant={'body1'}>
                    This is simple ToDo application
                </Typography>
            }
        </>
    );
});

export default AboutContent;