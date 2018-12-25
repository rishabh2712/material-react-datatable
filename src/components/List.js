import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ListHeaderCell from './ListHeaderCell'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListRow from './ListRow'
import TablePaginationActions from './Pagination'
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core';

const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
  table: {
    minWidth: 700,
  },
  listCell: {
    whiteSpace: 'nowrap'
  },
  noData: {
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1em 0em'
  },
  listRow:{

  },

});

class List extends React.Component {
    state = {
        rowsPerPage: 10, page: 0
    }
    rowClick = (row) => {
        this.props.onClick(row)
    }
    componentDidMount() {
        this.updateData()
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
       if(  prevState.rowsPerPage !== this.state.rowsPerPage ||
            prevState.page !== this.state.page
        ) {
            this.updateData()
        }
      }



    handleChangePage = (event, page) => {
        this.setState({
            page
        }, () => {
            if(typeof this.props.handlePageChange === 'function') {
                this.props.handlePageChange(page)
            }
        })
    }

    handleChangeRowsPerPage = (event) => {
       this.setState({
           rowsPerPage: parseInt(event.target.value)
       }, () => {
            if(typeof this.props.changeRowsPerPage === 'function') {
                this.props.changeRowsPerPage(this.state.rowsPerPage, this.state.page)
            }
       })
    }

    updateData = () => {
        if(this.props.remote) {
            const {rowsPerPage, page} = this.state
            const pagination = {
                page: parseInt(page, 10),
                perPage: parseInt(rowsPerPage, 10),
            };
            this.props.crudGetList(
                pagination
            );
        }
    }


    noDataorLoading = (props) => {
        if(props.isLoading) {
           return( 
                <div className={props.classes.noData}>
                    <CircularProgress fontSize = {25} />
                </div>
        )} else if(!props.isLoading && !props.rows.length) {
            return(
                <div className={props.classes.noData}>
                    <Typography>
                        No records found
                    </Typography>
                </div>
            )
        }
    }

    getRows = () => {
        let {rows, remote} = this.props
        let {page, rowsPerPage} = this.state
        if(remote) {
            return rows
        } else {
            return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        }
    }


    render() {
        const { classes, children, rows, totalCount } = this.props; 
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
                    this.getRows().map((row, index) => 
                    <ListRow
                        className={classes.listRow}
                        classes={classes}
                        row={row}
                        key={index}
                        rowClick = {this.rowClick}
                        children={children}
                    />
                )}
                {
                    this.noDataorLoading(this.props)
                }
                </TableBody>
                </Table>
                {
                    this.props.pagination &&
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={totalCount || rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        SelectProps={{
                            native: true,
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
