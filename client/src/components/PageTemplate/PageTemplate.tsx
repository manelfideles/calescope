import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Box } from '@chakra-ui/react';

interface PageTemplateProps {
  pageContent: React.ReactNode;
  hasFixedHeight?: boolean;
}

export const PageTemplate = ({
  pageContent,
  hasFixedHeight = true,
}: PageTemplateProps) => {
  return (
    <>
      <Navbar />
      <Box height={!hasFixedHeight ? 'fit-content' : 'calc(100vh - 5rem)'}>
        {pageContent}
      </Box>
      <Footer />
    </>
  );
};
