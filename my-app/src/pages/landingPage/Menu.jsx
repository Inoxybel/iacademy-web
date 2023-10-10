import { HamburgerIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, IconButton } from "@chakra-ui/react";
import MenuDropAction from "./menuDropAction";
const menu = ({breakpoints, breakpoint}) => {

    return(
        breakpoint >= breakpoints.md ? <> <Breadcrumb display={["block","block","block","block","block","block"]} p={["0.8rem", "0.8rem", "0.8rem", "0.8rem", "1rem", "1rem"]} separator="" spacing={["1.4rem", "1.8re", "2.0rem", "2.2vw", "2.8vw", "3vw"]} alignSelf="flex-end" fontSize={["0.6rem", "0.7rem", "0.8rem", "0.8rem", "1vw", "1vw"]}>
                        
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <MenuDropAction optionName={"About"} listaNomes={["Missão e visão", "História da empresa", "Equipe"]}></MenuDropAction>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <MenuDropAction optionName={"Contact"} listaNomes={["Whatsapp", "E-mail", "Instagram", "Linkedin"]}></MenuDropAction>
                        </BreadcrumbItem>
                    </Breadcrumb> 

                    <Flex alignSelf="center">
                        <Breadcrumb separator="" >
                            <BreadcrumbItem>
                                <BreadcrumbLink fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.600"} color={"blue.50"} _hover={{ backgroundColor: "blackAlpha.700", color: "white", textDecoration: "none", }} href='/login'>Sign in</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.300"} color={"white"} _hover={{ backgroundColor: "whiteAlpha.900", color: "black", textDecoration: "none", borderColor: "blue.700" }} href='/cadastro'>Sign Up</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Flex></>
                     : 
                     <IconButton
                     background="none"
                     _hover={{ backgroundColor:'blackAlpha.300' }}
                     position="absolute" right={10}
                     icon={<HamburgerIcon w={6} h={6} color="white" />}
                   />
                     
    )
}
export default menu;
