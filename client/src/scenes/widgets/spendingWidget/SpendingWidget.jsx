import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext, Replay } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import TransactionTable from "./TransactionTable";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";
import { setTransactions, setMonth, setYear } from "state";
import { useDispatch } from "react-redux";

const SpendingWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const transactions = useSelector((state) => state.transactions);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const viewMonth = useSelector((state) => state.month);
    const viewYear = useSelector((state) => state.year);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    // console.log(userId);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response);
        const data = await response.json();
        setUser(data);
    };

    const getTransactions = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}/transactions`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        dispatch(setTransactions({ transactions: data }));
        // console.log(transactions);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getTransactions();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    // add total spendings
    let sumExpense = 0;
    let sumIncome = 0;
    // console.log(viewMonth);
    if (transactions && transactions.length > 0) {
        transactions.map((transaction) => {
            if (
                parseInt(transaction.date.split("/")[1]) === viewMonth &&
                parseInt(transaction.date.split("/")[2]) === viewYear &&
                transaction.type === "expense"
            ) {
                sumExpense += transaction.amount;
            } else if (
                parseInt(transaction.date.split("/")[1]) === viewMonth &&
                parseInt(transaction.date.split("/")[2]) === viewYear &&
                transaction.type === "income"
            ) {
                sumIncome += transaction.amount;
            }
        });
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <>
            <WidgetWrapper>
                {/* OVERVIEW */}
                <FlexBetween>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                fontWeight="500"
                                sx={{ mr: "2rem" }}
                            >
                                Spendings
                            </Typography>
                            <Typography variant="h2" fontWeight="500">
                                ${sumExpense}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="h4"
                                fontWeight="500"
                            >
                                Earnings
                            </Typography>
                            <Typography variant="h2" fontWeight="500">
                                ${sumIncome}
                            </Typography>
                        </Box>
                    </Box>
                    <TransactionModal />
                </FlexBetween>
                <FlexBetween>
                    <Box
                        sx={{
                            width: "15rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                if (viewMonth === 1) {
                                    dispatch(setMonth({ month: 12 }));
                                    dispatch(setYear({ year: viewYear - 1 }));
                                } else {
                                    dispatch(
                                        setMonth({ month: viewMonth - 1 })
                                    );
                                }
                            }}
                        >
                            <NavigateBefore />
                        </IconButton>
                        <Typography variant="h5" fontWeight="300">
                            {monthNames[viewMonth - 1]} {viewYear}
                        </Typography>
                        <IconButton
                            onClick={() => {
                                if (viewMonth === 12) {
                                    dispatch(setMonth({ month: 1 }));
                                    dispatch(setYear({ year: viewYear + 1 }));
                                } else {
                                    dispatch(
                                        setMonth({ month: viewMonth + 1 })
                                    );
                                }
                            }}
                        >
                            <NavigateNext />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                dispatch(
                                    setMonth({
                                        month: new Date().getMonth() + 1,
                                    })
                                );
                                dispatch(
                                    setYear({
                                        year: new Date().getFullYear(),
                                    })
                                );
                            }}
                        >
                            <Replay />
                        </IconButton>
                    </Box>
                </FlexBetween>
                {/* MONTHLY TRANSACTIONS */}
                <FlexBetween>
                    <Box width="100%" padding="1rem 0">
                        <TransactionTable />
                    </Box>
                </FlexBetween>
            </WidgetWrapper>
        </>
    );
};

export default SpendingWidget;
