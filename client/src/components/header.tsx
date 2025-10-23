import { Box, Heading } from '@chakra-ui/react';
import { ColorModeButton } from './ui/color-mode';

const Header = () => {
  return (
    <Box as="header"  shadow="sm" px={4} py={3}>
    <Heading as="h1" size="lg"   textAlign="center">
      resto-finder.ai
    </Heading>
    <ColorModeButton position="absolute" top={2} right={4} />
    </Box>
  );
};

export default Header;
