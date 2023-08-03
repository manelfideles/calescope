import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  VStack,
  Container,
  GridItem,
  Grid,
  Image,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const StepCard = ({
  stepNumber,
  headingText,
  description,
}: {
  stepNumber: number;
  headingText: string;
  description: string;
}) => (
  <VStack align='center' spacing={4} flex='1' rounded='lg' padding={3}>
    <Flex
      color='white'
      bgColor='purple.500'
      fontSize='3xl'
      rounded='100px'
      w='50px'
      h='50px'
      alignItems='center'
      justifyContent='center'
      fontWeight='bold'
    >
      {stepNumber}
    </Flex>
    <Heading as='h3' size='md'>
      {headingText}
    </Heading>
    <Text textAlign='center'>{description}</Text>
  </VStack>
);

const BenefitsCard = ({
  title,
  description,
  imgSrc,
}: {
  title: string;
  description: string;
  imgSrc: string;
}) => (
  <Flex
    border='1px solid lightgray'
    rounded='lg'
    textAlign='center'
    boxShadow='md'
    justifyContent='center'
    flexDir='column'
    alignItems='center'
    gap={1}
    width='15rem'
    p={5}
  >
    <Image src={imgSrc} width='20rem' height='20rem' objectFit='scale-down' />
    <Text fontWeight='bold' fontSize='xl' justifySelf='flex-end'>
      {title}
    </Text>
    <Text>{description}</Text>
  </Flex>
);

export const Home = () => {
  const navigate = useNavigate();
  const {
    authState: { isLoggedIn },
  } = useAuth();
  return (
    <Box>
      {/* Hero */}
      <Grid templateColumns='repeat(2, 1fr)'>
        <GridItem maxW='container.sm' mt={32} ml={12} w='90%'>
          <Heading as='h1' size='2xl' mb={4}>
            Explore data, your way.
          </Heading>
          <Text fontSize='2xl' mb={8} color='gray.400' fontWeight='semibold'>
            <u>Calescope</u> empowers you to measure, analyze, and make sense of
            crucial climate variables, all at your fingertips. Dive into a world
            of key insights.
          </Text>
          <Flex gap={1} flexDir='column'>
            <Button
              colorScheme='purple'
              size='lg'
              w='38.5%'
              onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}
            >
              Get Started
            </Button>
            <Flex gap={1} mt={2} color='gray'>
              Already have an account?
              <Link as={RouterLink} to='/login'>
                <u>Sign in.</u>
              </Link>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem mt={-10}>
          <Image src='src/assets/hero-illustration.jpg' loading='eager' />
        </GridItem>
      </Grid>

      {/* Steps */}
      <Box bg='gray.50' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h2' size='xl' textAlign='center' mb={12}>
            How does it work? <br />
            It's as easy as 1-2-3
          </Heading>
          <Stack direction={['column', 'column', 'row']} spacing={8}>
            <StepCard
              stepNumber={1}
              headingText='Measure Climate Variables'
              description='Use a drone to measure climate variables such as humidity or temperature'
            />
            <StepCard
              stepNumber={2}
              headingText='Upload Data'
              description='Easily upload the drone-measured data to the CaleScope platform'
            />
            <StepCard
              stepNumber={3}
              headingText='Analyze and Explore'
              description='Analyze and explore the data to find key insights about the
              climate variables'
            />
          </Stack>
        </Container>
      </Box>

      {/* Benefits */}
      <Grid
        maxW='container.lg'
        py={20}
        templateColumns='1fr 3fr'
        margin='auto'
        gap={5}
      >
        <GridItem display='flex' flexDir='column' justifyContent='flex-end'>
          <Heading as='h2' size='lg' mb={3}>
            Take the leap
          </Heading>
          <Text w='80%'>
            We provide the tools, you bring the curiosity - together, we unlock
            your data's true potential.
          </Text>
        </GridItem>
        <GridItem
          display='flex'
          gap={3}
          justifyContent='center'
          alignItems='center'
        >
          <BenefitsCard
            imgSrc='src/assets/drone.jpg'
            title='Field Data Upload'
            description='Quickly upload data measured by your drone while on the field.'
          />
          <BenefitsCard
            imgSrc='src/assets/analysis.jpg'
            title='A-Posteriori Analysis'
            description="Derive valuable insights on gathered data using CaleScope's analysis tools."
          />
          <BenefitsCard
            imgSrc='src/assets/workforce-organization.jpg'
            title='Centralized Data'
            description='Keep all your data organized in one single powerful platform.'
          />
        </GridItem>
      </Grid>

      {/* Bottom CTA */}
      <Flex
        bg='purple.500'
        color='white'
        py={16}
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        gap={2}
      >
        <Heading as='h2' size='xl' mb={4}>
          Supercharge your insights now with Calescope
        </Heading>
        <Flex flexDir='column' gap={2}>
          <Button
            colorScheme='whiteAlpha'
            size='lg'
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}
          >
            Get Started
          </Button>
          Calescope is free to use for everyone, as it is an open source
          project.
        </Flex>
      </Flex>
    </Box>
  );
};
