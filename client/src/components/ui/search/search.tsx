import {
  Box,
  Container,
  Heading,
  Input,
  InputGroup,
  Stack,

} from '@chakra-ui/react';
import { VscSparkleFilled } from "react-icons/vsc";

import SearchResults from './search-results';
import SearchBox from './search-box';

const Search = () => {
  return (
    <>
      <Stack align="center" my={10} gap={30}>
        <Box as="section" textAlign="center" width="100%" display="flex" justifyContent="center">
            <SearchBox />
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
