'use client'
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from '@chakra-ui/react'
import { useState } from 'react'

const Item = ({itemName}) => {
    return(
        <MenuItem backgroundColor={"blue.300"} borderRadius={0} _hover={{backgroundColor: "white", color: "black"}}>{itemName}</MenuItem>
    )
}

export default function MenuAction( {optionName} ) {
    
    const [isVisible, setIsVisible] = useState(false)
    return (

        <Menu >
            <MenuButton borderRadius={0} onMouseEnter={() => setIsVisible(true) }
        onMouseLeave={() => setIsVisible(false)}>
                {optionName}
            </MenuButton>
            <MenuList isOpen={isVisible} backgroundColor={"blue.600"}>
                <Item itemName={"Download"}/>
                <Item itemName={"Create a Copy"}/>
                <Item itemName={"Mark as Draft"}/>
                <Item itemName={"Delete"}/>
                <Item itemName={"Attend a Workshop"}/>
            </MenuList>
        </Menu>
    )
}