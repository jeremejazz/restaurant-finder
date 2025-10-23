import {
  Box,
  Card,
  Container,
  Flex,
  For,
  Heading,
  Input,
  InputGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';
import SearchResults from './search-results';

const Search = () => {
  return (
    <>
      <Stack align="center" my={10} gap={30}>
        <Box as="section" textAlign="center" width="100%" display="flex" justifyContent="center">
          <Stack gap={6} width={{ base: '90%', md: '500px' }}>
            <Heading as="h1" textAlign="center" size="2xl">
              Search
            </Heading>

            {/* Input group with an icon */}
            <InputGroup >
              <Input
          type="text"
          placeholder="Search here..."
          borderRadius="full"
          boxShadow="md"
          _focus={{
            borderColor: 'blue.400',
            boxShadow: 'outline',
          }}
              />
            </InputGroup>
          </Stack>
        </Box>
        <Container>
          <Stack gap="4" direction="row" wrap="wrap">
            <SearchResults />
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default Search;
