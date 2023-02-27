import { Box, LinearProgress, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BudgetBar = ({ budget, spent, month, type }) => {
    const [progress, setProgress] = useState(0);
    const transactions = useSelector((state) => state.transactions);
    const theme = useTheme();
    // console.log(budget);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(Math.min((spent / budget) * 100, 100));
        });

        return () => {
            clearTimeout(timer);
        };
    }, [transactions, month]);

    let color = "";

    if (type === "income" || type === "total-income") {
        color = theme.palette.success.main;
    } else if (type === "expense" || type === "total-expense") {
        color = spent > budget? theme.palette.error.main : theme.palette.warning.main;
    }

    return (
        <>
            <Box sx={{ width: "100%", color: { color } }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    color={ type === "income" || type === "total-income" || spent >= budget * 0.8 ? "inherit" : "primary"}
                    sx={{
                        height: type === "total-expense" || type === "total-income" ? 20 : 10,
                        borderRadius: 5,
                    }}
                />
            </Box>
        </>
    );
};

export default BudgetBar;
