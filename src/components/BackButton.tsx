import { Button } from "@mui/material"
import { useCallback } from "react";
import { useNavigate } from "react-router"

const BackButton:React.FC = () => {

    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return <Button color="secondary" onClick={onClick} variant="contained">Back </Button>

}

export default BackButton;