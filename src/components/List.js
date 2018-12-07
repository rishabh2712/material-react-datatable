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

    rowClick = (row) => {
        console.log(row)
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
            </Paper>
        );
    }
}

export default withStyles(styles)(List);
