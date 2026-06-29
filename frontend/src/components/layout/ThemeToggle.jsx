import {
  IconButton,
  Tooltip,
  Box,
  Typography
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function ThemeToggle({

    mode,

    setMode

}) {

    const toggleTheme = () => {

        setMode(

            mode === "light"

                ? "dark"

                : "light"

        );

    };

    return (

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >

            <Typography
                variant="body2"
            >
                Theme
            </Typography>

            <Tooltip
                title={
                    mode === "light"
                        ? "Dark Mode"
                        : "Light Mode"
                }
            >

                <IconButton
                    color="primary"
                    onClick={toggleTheme}
                >

                    {

                        mode === "light"

                            ?

                            <DarkModeIcon />

                            :

                            <LightModeIcon />

                    }

                </IconButton>

            </Tooltip>

        </Box>

    );

}

export default ThemeToggle;