import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import classnames from 'classnames';

const ListCell = ({
    className,
    field,
    row,
    ...rest
}) =>  {
    console.log(field);
    console.log(row)
    return (
        <TableCell
            className={classnames(className, field.props.cellClassName)}
            //numeric={field.props.textAlign === 'right'}
            padding="none"
        >
            {React.cloneElement(field, {
                row
            })}
        </TableCell>
    );
}


export default ListCell;
