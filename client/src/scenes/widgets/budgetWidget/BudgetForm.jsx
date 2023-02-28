import {
    Box,
    Button,
    TextField,
    useTheme,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
    useMediaQuery,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListSubheader,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { setBudgets } from "state";

const budgetSchema = yup.object().shape({
    type: yup.string().required("Type is required"),
    amount: yup.number().positive().required("Amount is required"),
    category: yup.string().required("Category is required"),
});

const initialValuesBudgets = {
    type: "",
    amount: 0,
    category: "",
};

const BudgetForm = () => {
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/users/${_id}/new-budget`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: _id,
                    type: values.type,
                    amount: values.amount,
                    category: values.category,
                }),
            }
        );
        // console.log(response);
        const data = await response.json();
        // console.log(user);
        dispatch(setBudgets({ budgets: data }));
        handleClickOpen();
        // alert("Your transaction has been added");
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesBudgets}
            validationSchema={budgetSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="15px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: "span 2",
                            },
                        }}
                    >
                        <FormControl>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                onBlur={handleBlur}
                                value={values.type}
                                name="type"
                                onChange={handleChange}
                                error={touched.type && Boolean(errors.type)}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </Select>
                            <FormHelperText>
                                {touched.type && errors.type}
                            </FormHelperText>
                        </FormControl>
                        <TextField
                            label="Amount"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.amount}
                            name="amount"
                            error={touched.amount && Boolean(errors.amount)}
                            helperText={touched.amount && errors.amount}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <FormControl>
                            <InputLabel id="category-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="category-label"
                                onBlur={handleBlur}
                                value={values.category}
                                name="category"
                                onChange={handleChange}
                                error={
                                    touched.category && Boolean(errors.category)
                                }
                                sx={{ gridColumn: "span 2" }}
                            >
                                <ListSubheader>Expense</ListSubheader>
                                <MenuItem value="housing">Housing</MenuItem>
                                <MenuItem value="transportation">
                                    Transportation
                                </MenuItem>
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="utilities">Utilities</MenuItem>
                                <MenuItem value="insurance">Insurance</MenuItem>
                                <MenuItem value="medical and healthcare">
                                    Medical & Healthcare
                                </MenuItem>
                                <MenuItem value="investment">
                                    Investment
                                </MenuItem>
                                <MenuItem value="personal spending">
                                    Personal Spending
                                </MenuItem>
                                <MenuItem value="recreation and entertainment">
                                    Recreation & Entertainment
                                </MenuItem>
                                <MenuItem value="miscellaneous">
                                    Miscellaneous
                                </MenuItem>
                                <ListSubheader>Income</ListSubheader>
                                <MenuItem value="paycheck">
                                    Paycheck
                                </MenuItem>
                                <MenuItem value="interest income">
                                    Interest Income
                                </MenuItem>
                                <MenuItem value="rental income">
                                    Rental Income
                                </MenuItem>
                                <MenuItem value="bonus">
                                    Bonus
                                </MenuItem>
                                <MenuItem value="returned purchase">
                                    Returned Purchase
                                </MenuItem>
                            </Select>
                            <FormHelperText>
                                {touched.category && errors.category}
                            </FormHelperText>
                        </FormControl>
                        {/* SUBMIT BUTTON */}
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            mt: "2rem",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                        }}
                    >
                        CREATE BUDGET
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Create a Budget"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Your budget was successful created. 
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Okay
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            )}
        </Formik>
    );
};

export default BudgetForm;
