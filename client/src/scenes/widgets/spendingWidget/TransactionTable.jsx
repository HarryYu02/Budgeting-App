import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { useTheme, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setTransactions } from "state";

const TransactionTable = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const transactions = useSelector((state) => state.transactions);
    const viewMonth = useSelector((state) => state.month);
    const viewYear = useSelector((state) => state.year);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const [selectionModel, setSelectionModel] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            field: "id",
            headerName: "Transaction ID",
            flex: 1,
            hide: true,
            hideable: false,
        },
        { field: "date", headerName: "Date", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "amount", headerName: "Amount", flex: 1 },
    ];

    // console.log(transactions);


    // push transactions in current month to array
    // console.log(transactions);
    const rows = [];
    for (let i = 0; i < transactions.length; i++) {
        if (parseInt(transactions[i].date.split("/")[1]) === viewMonth && parseInt(transactions[i].date.split("/")[2]) === viewYear) {
            rows.push({
                id: transactions[i]._id,
                date: transactions[i].date,
                description: transactions[i].description,
                category: transactions[i].category,
                amount: transactions[i].amount,
            });
        }
    }

    // console.log(rows);

    // sort by date (newest to oldest)
    rows.sort((a, b) => {
        var aa = a.date.split("/").reverse().join(),
            bb = b.date.split("/").reverse().join();
        return aa < bb ? 1 : aa > bb ? -1 : 0;
    });

    // console.log(rows);

    const deleteSelected = async () => {
        setLoading(true);
        // console.log(selectionModel);
        for (let i = 0; i < selectionModel.length; i++) {
            // console.log(user._id);
            // console.log(selectionModel[i]);
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/users/${user._id}/transactions/${selectionModel[i]}/delete`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            dispatch(setTransactions({ transactions: data }));
        }
        setLoading(false);
    };

    return (
        <>
            {selectionModel.length > 0 && (
                <>
                    <Button
                        sx={{
                            fontSize: "0.75rem",
                            mb: "1rem",
                            mr: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                        }}
                        startIcon={<Delete />}
                        variant="contained"
                        onClick={deleteSelected}
                    >
                        DELETE
                    </Button>
                </>
            )}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                autoHeight
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                    // console.log(newSelectionModel);
                }}
                selectionModel={selectionModel}
                loading={loading}
            />
        </>
    );
};

export default TransactionTable;
