import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import BudgetWidget from "scenes/widgets/budgetWidget/BudgetWidget";
import SpendingWidget from "scenes/widgets/spendingWidget/SpendingWidget";
import { persistor } from "index"; 

const HomePage = () => {
    const { _id } = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    // console.log(_id);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap="0.5rem"
            >
                {/* <button
                    onClick={() => {
                        persistor.purge();
                    }}
                >
                    purge state
                </button> */}
                <Box>
                    <SpendingWidget userId={_id} />
                </Box>
                <Box>
                    <BudgetWidget userId={_id} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
