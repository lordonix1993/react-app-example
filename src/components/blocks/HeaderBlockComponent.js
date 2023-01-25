import { Container, Grid } from "@mui/material";

import SelectMultiLangComponent from "../elements/SelectMultiLangComponent";
import ButtonLogoutComponent from "../elements/auth/ButtonLogoutComponent";

function HeaderBlockComponent() {
    return (
        <div className="header">
            <Container maxWidth="lg">
                <Grid
                    rowSpacing={2}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item lg={3}>
                        <SelectMultiLangComponent />
                    </Grid>
                    <Grid item lg={3}>
                        <ButtonLogoutComponent />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default HeaderBlockComponent