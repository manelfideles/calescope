import {
	Flex,
	Stack,
	Heading,
	Text,
	Link
} from '@chakra-ui/react';
import { RegisterForm } from '../components/Forms/RegisterForm';

export const Register = () => {
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'3xl'} textAlign={'center'}>
						Sign up
					</Heading>
					<Text fontSize='md' color='gray.600'>
						to leverage the full power of Calescope 🔥
					</Text>
				</Stack>
				<RegisterForm />
				<Text align='center'>
					Already a user?
					<Link href='/login' color={'blue.400'} marginLeft={1}>
						Login
					</Link>
				</Text>
			</Stack>
		</Flex>
	);
}