import { Card, For } from "@chakra-ui/react";


const SearchResults = () => {

    return (
            <For each={['subtle', 'outline', 'elevated', 'filled', 'ghost','1', '2','3','4','5']}>
              {(variant) => (
                <Card.Root width={{ base: "100%", md: "320px" }} variant={'outline'} key={variant}>
                  <Card.Body gap="2">
                    <Card.Title mb="2">Nue Camp</Card.Title>
                    <Card.Description>
                      This is the card body. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit.
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer justifyContent="flex-end"></Card.Footer>
                </Card.Root>
              )}
            </For>
    );
};

export default SearchResults;