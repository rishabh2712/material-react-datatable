import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';

import ListCell from './ListCell';

class ListRow extends Component {
    handleToggle = event => {
        this.props.onToggleItem(this.props.id);
        event.stopPropagation();
    };

    handleClick = (row) => {
        this.props.rowClick(this.props.row)
    };

    render() {
        const {
            basePath,
            children,
            classes,
            className,
            hasBulkActions,
            hover,
            id,
            row,
            resource,
            selected,
            style,
            styles,
            ...rest
        } = this.props
        return (
            <TableRow
                className={className}
                key={id}
                style={style}
                hover={hover}
                onClick={this.handleClick}
            >
                {React.Children.map(
                    children,
                    (field, index) =>
                        field ? (
                            <ListCell
                                key={index}
                                row={row}
                                field = {field}
                                id={id}
                                {...{ field, basePath, resource }}
                            />
                        ) : null
                )}
            </TableRow>
        );
    }
}

export default ListRow
