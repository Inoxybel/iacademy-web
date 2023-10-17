import {
    AspectRatio,
    Box,
    Button,
    Container,
    Flex,
    Image,
    Link,
    Text
} from "@chakra-ui/react";
import React from "react";
import Footer from "../FooterLP.jsx";
import Menu from "../Menu";
import {breakpoints, breakpoint} from "../../LandingPage.jsx"

export default function MissaoEVisao ({ breakpoints, breakpoint }) {
    return(

        <Box bg={"white"} w={"100%"} h={"100%"}>
            {/* <Menu breakpoint={breakpoint} breakpoints={breakpoints}></Menu> */}
            <Footer></Footer>

        </Box>
    )
}