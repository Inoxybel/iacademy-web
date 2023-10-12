import {
    Radio,
    RadioGroup,
    Text,
    VStack,
    Divider,
    Flex
} from '@chakra-ui/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
const ExercicioUmaRespostas = ({ exercicio }) => {
    const getCorrectOption = () => {
      const answer = exercicio.answer ? exercicio.answer.charAt(0).toLowerCase() : ''; 
      const optionsMap = {
        'a': 0,
        'b': 1,
        'c': 2,
        'd': 3,
        'e': 4,
      };
  
      return optionsMap[answer] !== undefined ? optionsMap[answer] : -1; 
    };
  
    const correctOption = getCorrectOption();
  
    return (
      <Flex flexDir="column"backgroundColor='#2F3142' width='68rem' padding='20px' height='100%' mb={"1rem"}>
        <Text fontSize="16px" fontWeight="bold" mb={'1rem'} >
          {exercicio.identification} - {exercicio.question}
        </Text>
        <RadioGroup mb='10px' value={correctOption} border="0.5px solid" isReadOnly borderColor={exercicio.isCorrect ? "green" : "red"} borderRadius="5px" bg="#262734" p="10px" width="100%" color="grey" padding='10px'>
          <VStack direction='row' alignItems='flex-start'>
            {exercicio.complementation.map((option, index) => (
              <Radio colorScheme={exercicio.isCorrect ? 'green' : 'red'} variant='' key={index} value={index}>
                {option}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>

        <ReactMarkdown components={customRenderers}>
        {exercicio.feedback}
          </ReactMarkdown> 
        <Divider 
          alignSelf={"center"}
          mt={"2.5rem"}
          w={'65rem'}
        />
      </Flex>
    );
  };


export default ExercicioUmaRespostas;