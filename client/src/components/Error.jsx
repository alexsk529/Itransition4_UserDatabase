import React from 'react';
import { Box } from '@mui/material';

const Error = ({ status, errorMessage, showMessage }) => {
    if (!status) return null
    if (status && status !== 200 && showMessage) return <Box component="div"
        sx={{
            border: 1,
            borderColor: 'error.main',
            color: 'white', bgcolor: 'error.main',
            width: '50%',
            pt: 1, pb: 1,
            borderRadius: 1
        }}>{errorMessage}</Box>
}

export default Error;