import { Text, Box, Flex, Avatar } from '@chakra-ui/react';
import { HiLocationMarker } from 'react-icons/hi';

interface LocationTagProps {
  name: string;
  isSelected: boolean;
  country?: string;
}

export const LocationTag = ({
  name,
  country,
  isSelected,
}: LocationTagProps) => {
  return (
    <Flex p='1rem' margin='0' alignItems='center'>
      <Avatar
        size='sm'
        bg={isSelected ? 'green.100' : undefined}
        icon={<HiLocationMarker color={isSelected ? 'green' : undefined} />}
        marginRight={2}
      />
      <Box>
        <Text>
          <b>{name}</b>
          {country && `, ${country}`}
        </Text>
      </Box>
    </Flex>
  );
};
