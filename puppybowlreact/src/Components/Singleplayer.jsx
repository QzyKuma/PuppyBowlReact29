import React from "react";
import { useParams } from "react-router-dom";
import { fetchPlayerById } from "../Api/api.js";

const SinglePlayer = () => {
    const { id } = useParams();

    const [player, setPlayer] = React.useState(null);

    React.useEffect(() => {
        async function getPlayerDetails() {
            try {
                const APIResponse = await fetchPlayerById(id);

                if (APIResponse.success) {
                    setPlayer(APIResponse.data.player);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getPlayerDetails();
    }, [id]);

    if (!player) return <div>Loading...</div>;

    return (
        <div>
            <h2>{player.name}</h2>
            <p>Breed: {player.breed}</p>
            <img src={player.image} alt={player.name} style={{ maxWidth: "300px" }} />
        </div>
    );
};

export default SinglePlayer;