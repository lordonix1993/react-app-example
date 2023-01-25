import { Container, Grid } from "@mui/material";

import SelectMultiLangComponent from "../elements/SelectMultiLangComponent";
import ButtonLogoutComponent from "../elements/auth/ButtonLogoutComponent";

function HeaderBlockComponent({ showLogOut }) {
    return (
        <div className="header">
            <Container maxWidth={ false }>
                <Grid
                    rowSpacing={2}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item lg={1}>
                        <SelectMultiLangComponent />
                    </Grid>
                    <Grid item lg={9}></Grid>
                    <Grid item lg={2}>
                        {showLogOut && (
                            <ButtonLogoutComponent />
                        )}

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default HeaderBlockComponent