import react from 'react';
import { Dialog, DialogContent, IconButton, DialogTitle } from '@mui/material';
import { Grid } from '@material-ui/core';
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from '@mui/icons-material/Mail';
const PopupModal = ({ onClose, show }) => {
    return (
        <Dialog open={show} PaperProps={{
            style: {
                minWidth: '25vw',
                borderRadius: '10px'
            },
        }}>
            <DialogTitle backgroundColor={"#1976d2"} color={'white'} maxWidth="md" display={"flex"}>
                <Grid container alignItems="center" justifyContent='flex-start'>
                    <IconButton aria-label="email" >
                        <MailIcon color='white' />
                    </IconButton>
                    {"Email Sent"}

                </Grid>
                <Grid container alignItems="right" justifyContent='flex-end'>
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>

            <DialogContent
                style={{ display: "flex", flexDirection: "column", padding: "2rem" }}>
                <span>Email is successfully sent,please check your inbox for</span>
                <span>the from details</span>
            </DialogContent>
        </Dialog>
    );
}

export default PopupModal;