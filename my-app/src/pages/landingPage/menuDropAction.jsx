'use client'
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Box
} from '@chakra-ui/react'
import { useState } from 'react'

const Item = ({itemName}) => {
    return(
        <MenuItem backgroundColor={"blue.300"} borderRadius={0} _hover={{backgroundColor: "white", color: "black", borderRadius: "3" }}>{itemName}</MenuItem>
    )
}

export default function MenuAction( {optionName, listaNomes} ) {
    
    const [isVisible, setIsVisible] = useState(false)

 
    return (

        <Menu boxShadow='2xl' p='6' rounded='xl'>
            <MenuButton borderRadius={0}>
                {optionName}
            </MenuButton>
            
            <MenuList style={{transition: "0.2s"}}  backgroundColor={"blue.300"} boxShadow='2xl' rounded='lg' p={1}>
                {listaNomes.map((nome, index) => (
                    <Item key={index} itemName={nome}/>
))}
            </MenuList>
            
        </Menu>
    )
}