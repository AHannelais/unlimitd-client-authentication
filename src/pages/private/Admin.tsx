import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { USERS_LIST } from '@/graphql/users/queries';
import LoadingScreen from '@/components/LoadingScreen';
import { useEffect, useState } from 'react';
import { User } from '@/types';

export default function Admin() {
  const [getUsersList, { data, error, loading }] = useLazyQuery(USERS_LIST, {
    nextFetchPolicy: 'cache-and-network',
    refetchWritePolicy: 'overwrite',
  });

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  const columns = [
    { id: 'lastname', label: 'Prénom' },
    { id: 'firstname', label: 'Nom' },
    { id: 'email', label: 'Email' },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <Typography>Une Erreur s&apos;est produite.</Typography>;
  }

  if (!data?.usersList?.length) {
    return <Typography>Aucune donnée à afficher.</Typography>;
  }

  return (
    <Paper sx={{ marginX: '50px', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, width: '100%' }}>
        <Table aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="center">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.usersList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user: User) => (
                <TableRow key={user.id} hover role="checkbox" tabIndex={-1}>
                  {columns.map((column) => {
                    const value = user[column.id as keyof User];
                    return (
                      <TableCell key={column.id} align="center">
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data?.usersList?.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 100]}
      />
    </Paper>
  );
}
