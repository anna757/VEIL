import React from 'react';
import { Box } from '@mui/material';

const PageLayout = ({ children, ...rest  }) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box display="flex" flexDirection="column" justifyContent="center"
                alignItems="center" flex="1" p={2} textAlign="center" {...rest}>
                {children}
            </Box>
        </Box>
    );
};

export default PageLayout;
