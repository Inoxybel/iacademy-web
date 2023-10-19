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

function tratarString(str) {
    
    const strSemEspacos = str.replace(/ /g, '_');
  
   
    const strSemAcentos = strSemEspacos.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
    return strSemAcentos;
  }



const Item = ({rota, itemName}) => {
    return(
        <MenuItem as="a" href={rota} backgroundColor={"blue.300"} borderRadius={0} _hover={{backgroundColor: "white", color: "black", borderRadius: "3" }}>{itemName}</MenuItem>
    )
}

export default function MenuDropAction( {rotas, optionName, listaNomes} ) {
    
    const [isVisible, setIsVisible] = useState(false)

 
    return (

        <Menu boxShadow='2xl' p='6' rounded='xl'>
            <MenuButton borderRadius={0}>
                {optionName}
            </MenuButton>
            
            <MenuList style={{transition: "0.2s"}}  backgroundColor={"blue.300"} boxShadow='2xl' rounded='lg' p={1}>
            {listaNomes.map((nome, index) => (
            rotas ? 
            <Item key={index} itemName={nome} rota={rotas[index]} />
            :
            <Item key={index} itemName={nome}/>
        ))}
            </MenuList>
            
        </Menu>
    )
}
