import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { fetchAllPlayers, deletePlayer } from "../Api/api.js";
import { Container, Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Allplayers = () => {
    const [players, setPlayers] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllPlayers() {
            try {
                const APIResponse = await fetchAllPlayers();
                if (APIResponse.success) {
                    const uniquePlayers = removeDuplicates(APIResponse.data.players, "id");
                    setPlayers(uniquePlayers);
                }
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        }
        getAllPlayers();
    }, []);

    const removeDuplicates = (arr, key) => {
        return arr.reduce((prev, curr) => {
            if (!prev.find(item => item[key] === curr[key])) {
                prev.push(curr);
            }
            return prev;
        }, []);
    };

    const handleDeletePlayer = async (id) => {
        try {
            const response = await deletePlayer(id);
            if (response.success) {
                setPlayers(players.filter(player => player.id !== id));
            } else {
                console.error("Failed to delete player:", response.error);
            }
        } catch (error) {
            console.error("Failed to delete player:", error);
        }
    };

    const playersToDisplay = searchParams
        ? players.filter(player =>
            player.name.toLowerCase().includes(searchParams.toLowerCase())
        )
        : players;

    return (
        <Container>
         <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")} sx={{ mt: 2, mb: 2 }}>
                Back to Home
            </Button>
            <Typography variant="h4" gutterBottom>
                Puppies List
            </Typography>
            <TextField
                fullWidth
                label="Search players"
                variant="outlined"
                value={searchParams}
                onChange={e => setSearchParams(e.target.value)}
                sx={{ mb: 2 }}
            />
            <List>
                {playersToDisplay.map(player => (
                    <ListItem key={player.id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePlayer(player.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemAvatar>
                            <Avatar src={player.imageUrl} alt={player.name} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={player.name}
                            secondary={<RouterLink to={`/players/${player.id}`} style={{ textDecoration: 'none' }}>{player.name}</RouterLink>}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Allplayers;
