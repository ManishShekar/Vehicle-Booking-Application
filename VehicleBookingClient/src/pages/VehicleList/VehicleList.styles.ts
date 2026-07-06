import { styled } from "@mui/material/styles";
import {
    Box,
    Stack,
    Typography,
} from "@mui/material";

export const PageContainer =
    styled(Box)({
        padding: 24,
    });

export const FilterContainer =
    styled(Stack)({
        marginBottom: 24,
    });

export const PageTitle =
    styled(Typography)({
        marginBottom: 24,
        fontWeight: 600,
    });