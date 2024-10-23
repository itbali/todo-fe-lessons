import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {memo, useMemo} from "react";

type TIconButtonProps = {
    iconName: 'edit' | 'delete',
    onClick: () => void
}

const CustomIconButton = ({iconName, onClick}: TIconButtonProps) => {
    const icon = useMemo(() => {
        return iconName === 'edit' ? <ModeEditOutlineIcon/> : <DeleteIcon/>
    }, [iconName])
    return (
        <Button onClick={onClick}>{icon}</Button>
    );
};

export default memo(CustomIconButton);