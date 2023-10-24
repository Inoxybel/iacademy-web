import {
    Box,
    Button,
    Flex,
    Stack,
    useMediaQuery
} from '@chakra-ui/react';
import React, { useState } from 'react';
import CardComponentCursosDisponiveis from './CardComponenteCursosDisponiveis';

const PaginationComponent = ({ items }) => {
    const [isSmOrMd] = useMediaQuery('(max-width: 55em)');
    const cardsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const lastPageIndex = Math.ceil(items.length / cardsPerPage);
  
    const handlePageChange = page => {
      setCurrentPage(page);
    };
  
    const renderCards = () => {
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      return items
        .slice(startIndex, endIndex)
        .map((item, index) => (
          <CardComponentCursosDisponiveis obj={item} key={index} />
        ));
    };
  
    return (
      <div>
        <Box h={isSmOrMd ? "40vh" : "60vh"}>{renderCards()}</Box>
        <Flex direction="row" justifyContent="center">
          <Stack direction="row" spacing={2} mb={4}>
            {Array.from({ length: lastPageIndex }, (_, index) => (
              <Button
                key={index}
                size="sm"
                colorScheme={currentPage === index + 1 ? 'blue' : 'gray'}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Stack>
        </Flex>
      </div>
    );
  };
  
  export default PaginationComponent;