import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import classnames from 'classnames';

const ListCell = ({
    className,
    field,
    row,
    ...rest
}) =>  {
    return (
        <TableCell
            className={classnames(className, field.props.cellClassName)}
            //numeric={field.props.textAlign === 'right'}
            ///padding="none"
        >
            {React.cloneElement(field, {
                row
            })}
        </TableCell>
    );
}


export default ListCell;
