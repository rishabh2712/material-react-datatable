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
            padding="default"
            variant="head"
            sortDirection={currentSort.orderBy === field.props.title ? currentSort.order : false}
            {...rest}
        >
        {
            isSorting ? (
                <Tooltip
                title="Sort"
                enterDelay={300}
                >
                    <TableSortLabel
                        hideSortIcon={false}
                        active={
                            currentSort.orderBy === field.props.title
                        }
                        direction={currentSort.order}
                        data-sort={field.props.title}
                        onClick={updateSort}
                        
                    >
                        {field.props.title}
                    </TableSortLabel>
                </Tooltip>
            ) : (
                <div>{field.props.title}</div>
            )
        }
        </TableCell>
    );
    
}

export default withStyles(styles)(ListHeaderCell);
