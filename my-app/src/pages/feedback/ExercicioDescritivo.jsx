import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
    Flex,
    Text,
    Divider
} from '@chakra-ui/react';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
const customRenderers = {
  code({ node, inline, className, children, ...props }) {
      if (!inline) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
              <SyntaxHighlighter
                  {...props}
                  language={match[1]}
                  style={oneDark}
                  PreTag="div"
              >
                  {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
          ) : (
              <code {...props}>{children}</code>
          );
      }
      return <code {...props}>{children}</code>;
  },
  h1: 'h3'
};




const ExercicioDescritivo =({exercicio})=>{
    return(
      <Flex flexDir="column" w='100%' borderRadius="3px" gap="10px" justify="flex-start" padding="20px" mb={"1rem"}>
        <Text fontSize="16px" fontWeight={"bold"}>{exercicio.identification} - {exercicio.question}</Text>
        <Flex mb='10px' flexDirection="row" justifyContent='space-between' alignItems='center' border="0.5px solid" borderColor={exercicio.isCorrect ? "green" : "red"} borderRadius="5px" bg="var(--background-form)" p="10px" color="grey">
          <Text>{exercicio.answer}</Text>
          {exercicio.isCorrect ? <CheckCircleIcon color="green" /> : <WarningIcon color="red" />}
        </Flex>
        <ReactMarkdown components={customRenderers}>
        {exercicio.feedback}
          </ReactMarkdown> 

        <Divider 
          alignSelf={"center"}
          mt={"2.5rem"}
          w={'100%'}
        />
      </Flex>
    )
  }

 export default ExercicioDescritivo