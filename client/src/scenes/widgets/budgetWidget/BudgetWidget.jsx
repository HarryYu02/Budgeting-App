import { Box, Typography, useTheme, IconButton, Divider } from "@mui/material";
import { Delete } from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import BudgetModal from "./BudgetModal";
import { setBudgets } from "state";
import BudgetBar from "./BudgetBar";

const BudgetWidget = ({ userId }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const budgets = useSelector((state) => state.budgets);
    const viewMonth = useSelector((state) => state.month);
    const viewYear = useSelector((state) => state.year);
    const transactions = useSelector((state) => state.transactions);
    const dispatch = useDispatch();
    const { palette } = useTheme();

    // console.log(user);

    const getBudgets = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/users/${userId}/budgets`,
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
        dispatch(setBudgets({ budgets: data }));
    };

    useEffect(() => {
        getBudgets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const deleteBudget = async (budgetId) => {
        // console.log(selectionModel);
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/users/${user._id}/budgets/${budgetId}/delete`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        dispatch(setBudgets({ budgets: data }));
    };

    // console.log(budgets);
    const monthlyTransactions =
        transactions.length > 0
            ? transactions.filter(
                  (transaction) =>
                      parseInt(transaction.date.split("/")[1]) === viewMonth &&
                      parseInt(transaction.date.split("/")[2]) === viewYear
              )
            : [];

    let monthlySpent = 0;
    monthlyTransactions.forEach((transaction) => {
        if (transaction.type === "expense") {
            monthlySpent += transaction.amount;
        }
    });

    let monthlyEarned = 0;
    monthlyTransactions.forEach((transaction) => {
        if (transaction.type === "income") {
            monthlyEarned += transaction.amount;
        }
    });

    let monthlyBudget = 0;
    budgets.forEach((budget) => {
        if (budget.type === "expense") {
            monthlyBudget += budget.amount;
        }
    });

    let monthlyGain = 0;
    budgets.forEach((budget) => {
        if (budget.type === "income") {
            monthlyGain += budget.amount;
        }
    });
    return (
        <>
            <WidgetWrapper>
                {/* OVERVIEW */}
                <FlexBetween>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h3" fontWeight="500">
                            Budgets
                        </Typography>
                    </Box>
                    <BudgetModal />
                </FlexBetween>
                <Divider />
                <Box
                    sx={{
                        m: "1rem 0",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="500"
                        sx={{ mb: "0.5rem" }}
                    >
                        Monthly Spent
                    </Typography>
                    <BudgetBar
                        budget={monthlyBudget}
                        spent={monthlySpent}
                        month={viewMonth}
                        type="total-expense"
                    />
                    <Typography>
                        <b>${monthlySpent}</b> of ${monthlyBudget}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        m: "1rem 0",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="500"
                        sx={{ mb: "0.5rem" }}
                    >
                        Monthly Earned
                    </Typography>
                    <BudgetBar
                        budget={monthlyGain}
                        spent={monthlyEarned}
                        month={viewMonth}
                        type="total-income"
                    />
                    <Typography>
                        <b>${monthlyEarned}</b> of ${monthlyGain}
                    </Typography>
                </Box>
                <Divider />
                <Box>
                    {budgets.length > 0 ? (
                        [...budgets]
                            .sort((a, b) => {
                                if (a.category < b.category) {
                                    return -1;
                                }
                                if (a.category > b.category) {
                                    return 1;
                                }
                                return 0;
                            })
                            .map((budget) => {
                                let spent = 0;
                                monthlyTransactions
                                    .filter(
                                        (transaction) =>
                                            transaction.category ===
                                            budget.category
                                    )
                                    .forEach((element) => {
                                        spent += element.amount;
                                    });
                                const amount = budget.amount;
                                const diff = amount - spent;

                                const capitalize = (str) => {
                                    return (
                                        str.charAt(0).toUpperCase() +
                                        str.slice(1)
                                    );
                                };

                                return (
                                    <Box key={budget._id} sx={{ m: "1rem 0" }}>
                                        <FlexBetween>
                                            <Typography variant="h5">
                                                <b>
                                                    {capitalize(
                                                        budget.category
                                                    )}
                                                </b>
                                                :{" "}
                                                {diff >= 0
                                                    ? `$${diff} left`
                                                    : `$${Math.abs(diff)} over`}
                                            </Typography>
                                            <IconButton
                                                onClick={() =>
                                                    deleteBudget(budget._id)
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </FlexBetween>
                                        <Box>
                                            <BudgetBar
                                                budget={amount}
                                                spent={spent}
                                                month={viewMonth}
                                                type={budget.type}
                                            />
                                        </Box>
                                        <Typography>
                                            <b>${spent}</b> of ${budget.amount}
                                        </Typography>
                                    </Box>
                                );
                            })
                    ) : (
                        <Typography
                            variant="h5"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                m: "3rem",
                            }}
                        >
                            There are no budgets yet, create your first budget!
                        </Typography>
                    )}
                </Box>
            </WidgetWrapper>
        </>
    );
};

export default BudgetWidget;
