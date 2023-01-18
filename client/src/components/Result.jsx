import React from 'react';
import { Box } from '@mui/material';

const Result = ({ status, showMessage, errorMessage }) => {
    return (
        showMessage ?
            status === 201 ?
                <Box component="div"
                    sx={{
                        border: 1,
                        borderColor: 'success.light',
                        color: 'white',
                        bgcolor: 'success.light',
                        width: '100%',
                        pt: 1, pb: 1,
                        borderRadius: 1
                    }}>{errorMessage}</Box> :
                <Box component="div"
                    sx={{
                        border: 1,
                        borderColor: 'error.main',
                        color: 'white',
                        bgcolor: 'error.main',
                        width: '100%',
                        pt: 1, pb: 1,
                        borderRadius: 1
                    }}>{errorMessage}</Box> :
            null
    );
}

export default Result;