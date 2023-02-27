import { Box, Typography, Modal, useTheme, IconButton } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { useState } from "react";
import TransactionForm from "./TransactionForm";

const TransactionModal = () => {
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Add sx={{ fontSize: "25px" }} />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-budget"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "0.75rem",
                        width: "50%",
                        bgcolor: "background.paper",
                        boxShadow: 6,
                        p: 4,
                    }}
                >
                    <FlexBetween sx={{ mb: "1rem" }}>
                        <Typography variant="h5">
                            Add a Transaction
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <Close/>
                        </IconButton>
                    </FlexBetween>
                    <TransactionForm />
                </Box>
            </Modal>
        </>
    );
};

export default TransactionModal;
