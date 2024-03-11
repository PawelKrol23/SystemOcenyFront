import React from 'react';
import { Box, Button, Container, Typography, rgbToHex } from '@mui/material';
import Grid from '@mui/material/Grid';
import TempLogo from "../../../Assets/TempLogo.png";
import { grey } from "@mui/material/colors"
import { colors } from "../../../Theme/variables";


export const Error404Page = () => {
    return (
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: colors.secondary,
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img src={TempLogo} alt="Temporary Logo"/>
          </Grid>
        </Grid>
      </Container>
    </Box>
    );
}