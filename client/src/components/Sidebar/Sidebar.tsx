import { Box, Text, IconButton, Button } from '@chakra-ui/react'
import { FilterControls } from '../FilterControls'
import { BiArrowToLeft } from 'react-icons/bi'

export const Sidebar = () => {
	return (
		<Box
			maxWidth='20rem'
			minWidth='15rem'
			width='20%'
			display='flex'
			flexDirection='column'
			position='fixed'
			inset='0 0 0'
		>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				padding='0.5rem'
			>
				<Button
					as='a'
					fontSize='sm'
					fontWeight={400}
					variant='link'
					href='/'>
					🔥
				</Button>
				<Text fontWeight='bold'>
					Filters
				</Text>
				<IconButton
					bg='none'
					border='1px solid black'
					padding='0.25rem'
					size='56px'
					aria-label='show/hide'
					icon={<BiArrowToLeft />}
				/>
			</Box>
			<FilterControls />
		</Box>
	)
}
