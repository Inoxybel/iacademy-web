import {
    Alert,
    AlertIcon,
    AlertTitle
} from "@chakra-ui/react";
import React from "react";



const ErroFormulario = ({ error }) => {
    return (
        <Alert status="error" mb="4" color={"brown"}>
            <AlertIcon />
            <AlertTitle >{error}</AlertTitle>
        </Alert>
    )

}

export default ErroFormulario;