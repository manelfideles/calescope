import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  VStack,
  Container,
} from '@chakra-ui/react';

export const Home = () => {
  return (
    <Box>
      <Container maxW='container.lg' py={20}>
        <Heading as='h1' size='2xl' textAlign='center' mb={4}>
          Welcome to CaleScope
        </Heading>
        <Text fontSize='lg' textAlign='center' mb={8}>
          Explore and visualize climate data with ease using CaleScope.
        </Text>
        <Flex justifyContent='center'>
          <Button colorScheme='teal' size='lg'>
            Get Started
          </Button>
        </Flex>
      </Container>

      <Box bg='gray.100' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h2' size='xl' textAlign='center' mb={12}>
            How CaleScope Works
          </Heading>
          <Stack direction={['column', 'column', 'row']} spacing={8}>
            <VStack
              align='center'
              spacing={4}
              flex='1'
              rounded='lg'
              padding={3}
            >
              <Box color='teal.500' fontSize='3xl'>
                Step 1
              </Box>
              <Heading as='h3' size='md'>
                Measure Climate Variables
              </Heading>
              <Text textAlign='center'>
                Use a drone to measure climate variables such as humidity or
                temperature
              </Text>
            </VStack>
            <VStack align='center' spacing={4} flex='1'>
              <Box color='teal.500' fontSize='3xl'>
                Step 2
              </Box>
              <Heading as='h3' size='md'>
                Upload Data to CaleScope
              </Heading>
              <Text textAlign='center'>
                Easily upload the drone-measured data to the CaleScope platform
              </Text>
            </VStack>
            <VStack align='center' spacing={4} flex='1'>
              <Box color='teal.500' fontSize='3xl'>
                Step 3
              </Box>
              <Heading as='h3' size='md'>
                Analyze and Explore
              </Heading>
              <Text textAlign='center'>
                Analyze and explore the data to find key insights about the
                climate variables
              </Text>
            </VStack>
          </Stack>
        </Container>
      </Box>

      <Container maxW='container.lg' py={20}>
        <Heading as='h2' size='xl' textAlign='center' mb={12}>
          Benefits of Using CaleScope
        </Heading>
        <Stack spacing={6} align='center'>
          <Box>
            <Text fontWeight='bold' fontSize='xl'>
              Field Data Upload
            </Text>
            <Text textAlign='center'>
              CaleScope allows you to quickly upload drone-measured data while
              on the field.
            </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' fontSize='xl'>
              A-Posteriori Analysis
            </Text>
            <Text textAlign='center'>
              Derive valuable insights on gathered data using CaleScope's
              analysis tools.
            </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' fontSize='xl'>
              Centralized Data Management
            </Text>
            <Text textAlign='center'>
              Keep all your climate data organized in one singular place with
              CaleScope.
            </Text>
          </Box>
        </Stack>
      </Container>

      <Box bg='teal.500' color='white' py={16} textAlign='center'>
        <Heading as='h2' size='xl' mb={4}>
          Start exploring climate data with CaleScope today!
        </Heading>
        <Button colorScheme='whiteAlpha' size='lg'>
          Get Started
        </Button>
      </Box>
    </Box>
  );
};
