import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Link,
  Text
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineClipboardCheck, HiOutlineClipboardList } from "react-icons/hi";


const ItemPendencia = ({ obj, onSetExercicioPendente }) => {
  return (
    <>
      <Divider />
      <Flex w='100%' alignItems='center' justifyContent='flex-start' gap='1rem'>
        {obj.status === 'WaitingToDo' ? <WarningIcon color='yellow' /> : <CheckCircleIcon color='green' />}
        <Link onClick={() => { onSetExercicioPendente(obj.id) }}>
          <p>{obj.topicIndex} - {obj.title}</p>
        </Link>
        <Box display='flex' alignItems='center' gap='0.3rem' flexDir='row' ml='auto'>
          <Text color="#5762C0">{obj.exercises.length}</Text>
          {obj.status === 'WaitingToDo' ? (<HiOutlineClipboardList color="#5762C0" />) : (<HiOutlineClipboardCheck color="#5762C0" />)}
        </Box>
      </Flex>
    </>
  )
}

export default ItemPendencia;