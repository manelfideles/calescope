import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Box } from '@chakra-ui/react';

interface PageTemplateProps {
  pageContent: React.ReactNode;
  hasFixedHeight?: boolean;
  footerBgColor?: string;
}

export const PageTemplate = ({
  pageContent,
  hasFixedHeight = true,
  footerBgColor,
}: PageTemplateProps) => {
  return (
    <>
      <Navbar />
      <Box height={!hasFixedHeight ? 'fit-content' : 'calc(100vh - 5rem)'}>
        {pageContent}
      </Box>
      <Footer bgColor={footerBgColor} />
    </>
  );
};
