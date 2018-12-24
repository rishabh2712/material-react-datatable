import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ListHeaderCell from './ListHeaderCell'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ListCell } from './ListCell';
import ListRow from './ListRow'
import TablePaginationActions from './Pagination'
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
  table: {
    minWidth: 700,
  },
});

class List extends React.Component {
    state = {
        rowsPerPage: 10
    }
    rowClick = (row) => {
        this.props.onClick(row)
    }

    handleChangePage = (event, page) => {
        if(this.props.handlePageChange) {
            this.props.handlePageChange(page)
        }
    }

    handleChangeRowsPerPage = (event, page) => {
       this.setState({
           rowsPerPage: event.target.value
       })
       if(this.props.changeRowsPerPage) {
        this.props.changeRowsPerPage(event.target.value)
       }
    }

    render() {
        const { classes, children, rows } = this.props; 
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {React.Children.map(
                            children,
                            (field, index) =>
                                field ? (
                                    <ListHeaderCell
                                        className={classes.headerCell}
                                        field={field}
                                        key={field.props.source || index}
                                    />
                                ) : null
                        )}
                    </TableRow>
                </TableHead>
                <TableBody> 
                {
                    rows.map((row, index) => 
                    <ListRow
                        row={row}
                        key={index}
                        rowClick = {this.rowClick}
                        children={children}
                    />
                )}               
                </TableBody>
                </Table>
                {
                    this.props.pagination &&
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={1}
                        SelectProps={{
                        native: false,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                }
            </Paper>
        );
    }
}

export default withStyles(styles)(List);
