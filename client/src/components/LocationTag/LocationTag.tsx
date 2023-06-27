import { Text, Box, Flex, Avatar } from '@chakra-ui/react';
import { HiLocationMarker } from 'react-icons/hi';

interface LocationTagProps {
  isSelected: boolean;
  name: string;
  country?: string;
}

export const LocationTag = ({
  isSelected,
  name,
  country,
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
