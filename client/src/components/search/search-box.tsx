import { Heading, Input, InputGroup, Stack } from '@chakra-ui/react';
import { VscSparkleFilled } from 'react-icons/vsc';
import _ from 'lodash';

const SearchBox = () => {
  const randomPlaceholder = _.sample([
    "Cheap ramen near Cebu City that's open now",
    'Best sushi in Tokyo',
    'Pizza places open late in New York',
    'Affordable mediterranean restaurant near Ayala Makati'
  ]);

  return (
    <Stack gap={6} width={{ base: '90%', md: '500px' }}>
      <Heading as="h1" textAlign="center" size="2xl">
        Find the perfect spot
      </Heading>
      <InputGroup startElement={<VscSparkleFilled />}>
        <Input
          type="text"
          placeholder={randomPlaceholder}
          borderRadius="full"
          boxShadow="md"
          _focus={{
            borderColor: 'blue.400',
            boxShadow: 'outline',
          }}
        />
      </InputGroup>
    </Stack>
  );
};

export default SearchBox;
