import {
    Alert,
    AlertIcon,
    AlertTitle
} from "@chakra-ui/react";
import React from "react";



const ErroFormulario = ({ error }) => {
    return (
        <Alert status="error" mb="2" color={"brown"}>
            <AlertIcon />
            <AlertTitle fontSize="0.8rem" >{error}</AlertTitle>
        </Alert>
    )

}

export default ErroFormulario;