import React from 'react';
import Typography from '@material-ui/core/Typography';

const ListField = ({
    className, row, field
}) => {
    console.log(field);
    
    return (
        <Typography
            component="span"
            body1="body1"
            //className={className}
        >
            {row[field]}
        </Typography>
    );
};

export default ListField;
