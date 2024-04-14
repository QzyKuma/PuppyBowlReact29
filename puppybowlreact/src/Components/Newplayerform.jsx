import React, { useState } from "react";
import { createNewPlayer } from "../Api/api.js";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const Newplayerform = () => {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // This replaces the history prop for navigation

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const newPlayer = { name, breed };
            await createNewPlayer(newPlayer);
            navigate("/players"); // Use navigate to redirect
        } catch (err) {
            setError(err.message);
        }
    };

    const handleBack = () => {
        navigate("/"); 
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
                Add New Player
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2, width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Breed"
                        variant="outlined"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button variant="outlined" color="secondary" onClick={handleBack}>
                        Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Player
                    </Button>
                </Box>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </form>
        </Container>
    );
};

export default Newplayerform;
