import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import MenuDropAction from "./MenuDropAction";
import { useState } from 'react';

const MenuLandingPage = ({ breakpoints, breakpoint }) => {

    const [menuLeft, setMenuLeft] = useState({})

    const handleMenuMobile = () => {
        setMenuLeft({
            ...menuLeft,
            transition: "0.4s",
            width: "40%",
            boxShadow: "-5px 0px 5px lightGray"
        })
    }

    return (
        breakpoint >= breakpoints.md ? <>
            <Flex alignSelf="center">
                <Breadcrumb separator="" >
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.400"} color={"blue.50"} _hover={{ backgroundColor: "blackAlpha.700", color: "white", textDecoration: "none", }} href='/login'>Entrar</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.200"} color={"white"} _hover={{ backgroundColor: "whiteAlpha.900", color: "black", textDecoration: "none", borderColor: "blue.700" }} href='/cadastro'>Cadastrar</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Flex></>
            :
            <>
                <Flex alignSelf="center">
                    <Breadcrumb separator="" >
                        <BreadcrumbItem>
                            <Flex alignSelf="center">
                                <Breadcrumb separator="" >
                                    <BreadcrumbItem>
                                        <BreadcrumbLink fontSize={["0.4rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["2vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.400"} color={"blue.50"} _hover={{ backgroundColor: "blackAlpha.700", color: "white", textDecoration: "none", }} href='/login'>Entrar</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink fontSize={["0.4rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["2vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.200"} color={"white"} _hover={{ backgroundColor: "whiteAlpha.900", color: "black", textDecoration: "none", borderColor: "blue.700" }} href='/cadastro'>Cadastrar</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </Breadcrumb>
                            </Flex>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex></>


    )
}
export default MenuLandingPage;
