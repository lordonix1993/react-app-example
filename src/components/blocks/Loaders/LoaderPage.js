import {Backdrop, CircularProgress} from "@mui/material";

function LoadingPage({ status }) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={status}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}