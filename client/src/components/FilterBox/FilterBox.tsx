import { Box, Text, IconButton, Grid, GridItem, useColorModeValue, useDisclosure, Collapse, Icon, As } from '@chakra-ui/react';
import { TiMediaFastForward, TiMediaPlay, TiMediaRewind, TiMediaStop } from 'react-icons/ti';
import { BiArrowToTop, BiArrowToBottom } from 'react-icons/bi';

interface FilterBoxProps {
	title: string,
	icon?: As<any>,
	isTimeFilter?: boolean,
	mode: 'range' | 'value',
}

export const FilterBox = ({ title, mode, isTimeFilter, icon }: FilterBoxProps) => {

	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box
			rounded={'lg'}
			bg={useColorModeValue('white', 'gray.700')}
			border='1px solid gray'
			p={2}>
			<Grid>
				<GridItem>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='space-between'
					>
						<Icon as={icon} />
						<Text fontWeight='bold'>
							{title}
						</Text>
						<IconButton
							bg='none'
							onClick={onToggle}
							border='1px solid black'
							padding='0.25rem'
							size='56px'
							aria-label='collapse/expand'
							icon={isOpen ? <BiArrowToTop /> : <BiArrowToBottom />}
						/>
					</Box>

				</GridItem>
				<Collapse in={isOpen} animateOpacity>
					<GridItem>
						Mode
					</GridItem>
					<GridItem>
						HistTimeline
					</GridItem>
					<GridItem>
						Value(s) Form
					</GridItem>
					<GridItem>
						<Text>Controls</Text>
						<Box display='flex'>
							<TiMediaRewind />
							<TiMediaPlay />
							<TiMediaStop />
							<TiMediaFastForward />
						</Box>
					</GridItem>
				</Collapse>
			</Grid>
		</Box>
	)
}
