import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Box } from '@chakra-ui/react';

interface PageTemplateProps {
  pageContent: React.ReactNode;
}

export const PageTemplate = ({ pageContent }: PageTemplateProps) => {
  return (
    <>
      <Navbar />
      <Box height='calc(100vh - 5rem)'>{pageContent}</Box>
      <Footer />
    </>
  );
};
