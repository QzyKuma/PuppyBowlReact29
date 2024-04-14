import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllPlayers } from "../Api/api.js";
import { Typography, Button, Card, CardMedia, CardContent, Grid, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";

const HomeContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center"
}));

const FeaturedPlayer = styled(Card)(({ theme, active }) => ({
  display: active ? "block" : "none",
  margin: "auto",
  maxWidth: 345,
}));

const Home = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchAllPlayers();
        if (response.success) {
          setPlayers(response.data.players);
        } else {
          console.error("Failed to fetch players:", response.error);
        }
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    }, 3000); // Change player every 3 seconds

    return () => clearInterval(interval);
  }, [players.length]);

  return (
    <HomeContainer>
      <Typography variant="h2" gutterBottom>THE ULTIMATE PUPPY BOWL</Typography>
      <Typography variant="h5">Welcome</Typography>
      <Typography paragraph>Select the options below</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Button variant="contained" component={Link} to="/players">View Puppies</Button>
        <Button variant="contained" component={Link} to="/players/new">Add New Puppies</Button>
      </Grid>
      <Typography variant="h4" gutterBottom>Featured Puppers</Typography>
      <AnimatePresence>
        {players.length > 0 && (
          <motion.div
            key={players[currentPlayerIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <FeaturedPlayer active>
              <CardMedia
                component="img"
                height="140"
                image={players[currentPlayerIndex].imageUrl}
                alt={players[currentPlayerIndex].name}
              />
              <CardContent>
                <Typography variant="h6" component={Link} to={`/players/${players[currentPlayerIndex].id}`}>
                  {players[currentPlayerIndex].name}
                </Typography>
                <Typography color="textSecondary">
                  {players[currentPlayerIndex].position}
                </Typography>
              </CardContent>
            </FeaturedPlayer>
          </motion.div>
        )}
      </AnimatePresence>
    </HomeContainer>
  );
};

export default Home;
