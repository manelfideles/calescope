import {
	Flex,
	Stack,
	Link,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { LoginForm } from '../components/Forms/LoginForm';

export const Login = () => {
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'3xl'}>
						Sign in to your account
					</Heading>
				</Stack>
				<LoginForm />
				<Text align='center'>
					Don't have an account yet?
					<Link href='/register' color={'blue.400'} marginLeft={1}>
						Register
					</Link>
				</Text>
			</Stack>
		</Flex>
	);
}