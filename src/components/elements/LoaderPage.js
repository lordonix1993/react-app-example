import {Backdrop, CircularProgress} from "@mui/material";

function LoaderPage({ status }) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={status}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoaderPage