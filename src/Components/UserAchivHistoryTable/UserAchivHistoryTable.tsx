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


    interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
    }

    interface Column {
        id: 'ID Osiagniecia' | 'Nazwa' | 'Czy Zatwierdzone?';
        label: string;
        minWidth?: number;
        align?: 'center' | 'left' | 'right';
        format?: (value: number) => string;
      }
      
    const columns: readonly Column[] = [
        { id: 'ID Osiagniecia', label: 'ID Osiagniecia', minWidth: 100, align: 'left'},
        { id: 'Nazwa', label: 'Nazwa', minWidth: 150, align: 'left' },
        {
          id: 'Czy Zatwierdzone?',
          label: 'Czy Zatwierdzone?',
          minWidth: 70,
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
        <TableContainer component={Paper} sx={{marginRight:"50px"}}>
        <Table sx={{ minWidth: 500, background: colors.primary}} aria-label="custom pagination table">
        <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            )?.map((row) => (
                <TableRow key={row.idOsiagniecia}>
                <TableCell style={{ width: 160 }} align="left">
                    {row.idOsiagniecia}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.nazwa}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                    {row.czyZatwierdzone ? 'Tak' : 'Nie'}
                </TableCell>
                </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    );
    };