import React from "react";
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                     Puppy Bowl CLASS: 2310-FSA-ET-WEB-PT-SF - Marquez
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
