import {Button} from "@mui/material";
import {memo, ReactNode} from "react";

type TCustomButtonProps = {
    children: ReactNode,
    onClick: () => void
}

const CustomButton = ({children, onClick}: TCustomButtonProps) => {
    return (
        <Button fullWidth={true} variant={'contained'} onClick={onClick}>
            {children}
        </Button>
    );
};

export default memo(CustomButton);