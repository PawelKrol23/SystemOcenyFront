    import * as React from 'react';
    import { useTheme } from '@mui/material/styles';
    import Box from '@mui/material/Box';
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell from '@mui/material/TableCell';
    import TableContainer from '@mui/material/TableContainer';
    import TableFooter from '@mui/material/TableFooter';
    import TablePagination from '@mui/material/TablePagination';
    import TableRow from '@mui/material/TableRow';
    import Paper from '@mui/material/Paper';
    import IconButton from '@mui/material/IconButton';
    import FirstPageIcon from '@mui/icons-material/FirstPage';
    import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
    import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
    import LastPageIcon from '@mui/icons-material/LastPage';
    import { useSOP } from '../../Context/ContextProvider';
    import { Achievement } from '../../Interfaces/UserType';
    import TableHead from '@mui/material/TableHead';
    import { colors } from '../../Theme/variables';
    import { DataGrid, GridColDef } from '@mui/x-data-grid';


    interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
    }

    const columns: GridColDef[] = [
        { 
            field: 'idOsiagniecia',
            headerName: 'ID Osiagniecia',
            width: 160,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: 'nazwa',
            headerName: 'Nazwa',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: 'czyZatwierdzone',
            headerName: 'Czy Zatwierdzone?',
            width: 160,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        </Box>
    );
    }

    export const UserAchivHisTable = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { getUserAllAchievements } = useSOP();
    const [AllAchievements, setAllAchievements] = React.useState<Achievement[] | null>(null);

    const setAchivements = async () => {
        const achievements = await getUserAllAchievements();
        setAllAchievements(achievements);
    };

    React.useEffect(() => {
        setAchivements();
    }, []); 

    const createData = (idOsiagniecia: number, nazwa: string, czyZatwierdzone: boolean) => {
        return { idOsiagniecia, nazwa, czyZatwierdzone };
    };

    const rows = AllAchievements?.map((achievement) =>
        createData(achievement.idOsiagniecia, achievement.nazwa, achievement.czyZatwierdzone)
    ).sort((a, b) => (a.idOsiagniecia < b.idOsiagniecia ? -1 : 1));

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (rows?.length || 0)) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
        <DataGrid sx={{ minWidth: 500, background: colors.primary}}
            rows={rows?.map((row, index) => ({ id: index, ...row })) || []}
            columns={columns}
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
            pageSizeOptions={[5, 10, 25]} 
            pagination
        />
    </div>
    );
    };
