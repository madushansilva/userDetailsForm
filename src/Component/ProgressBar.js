import react from 'react';
import { Stack, LinearProgress, Box } from '@mui/material';

const ProgressBar = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{
                position: "fixed",
                left: "0px",
                top: "0px",
                width: "100%",
                height: "100%",
                zIndex: 9999,
            }}



        >

            <Stack sx={{ width: '20%', color: 'grey.500' }} spacing={2}>

                <Box component="h2" color={"grey"} px={13} >Uploading Form</Box>

                <LinearProgress color="primary" />

            </Stack>

        </Box>
    );
}

export default ProgressBar;