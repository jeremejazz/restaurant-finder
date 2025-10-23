import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box as="header"  shadow="sm" px={4} py={3}>
    <Heading as="h1" size="lg" color="white" textAlign="center">
      Restaurant Finder
    </Heading>
    </Box>
  );
};

export default Header;
