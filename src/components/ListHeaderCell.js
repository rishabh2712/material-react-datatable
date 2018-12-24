import React from 'react';
import classnames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// remove the sort icons when not active
const styles = {
    icon: {
        display: 'none',
    },
    active: {
        '& $icon': {
            display: 'inline',
        },
    },
};

export const ListHeaderCell = ({
    classes,
    className,
    field,
    currentSort,
    updateSort,
    resource,
    isSorting,
    translate,
    ...rest
}) => {
    
    return (
        <TableCell
            className={classnames(className, field.props.headerClassName)}
            numeric={field.props.textAlign === 'right'}
           // padding="none"
            variant="head"
            {...rest}
        >
            {field.props.sortable !== false &&
            (field.props.sortBy || field.props.source) ? (
                <Tooltip
                    enterDelay={300}
                >
                    <TableSortLabel
                        active={
                            currentSort.field ===
                            (field.props.sortBy || field.props.source)
                        }
                        direction={currentSort.order === 'ASC' ? 'asc' : 'desc'}
                        data-sort={field.props.sortBy || field.props.source}
                        onClick={updateSort}
                        classes={classes}
                    >
                        {field}
                    </TableSortLabel>
                </Tooltip>
            ) : (
                <div>{field.props.title}</div>
            )}
        </TableCell>
    );
    
}

export default withStyles(styles)(ListHeaderCell);
