
import React from "react";
import { deletePlayer } from "../Api/api.js";

const Delete = ({ playerId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await deletePlayer(playerId);
            onDeleteSuccess();
        } catch (error) {
            console.error("Failed to delete player:", error);
        }
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default Delete;