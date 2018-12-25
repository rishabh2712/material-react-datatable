import React from 'react';
import Typography from '@material-ui/core/Typography';



function dataAccessor(model, path, def) {
    path = path || '';
    model = model || {};
    def = typeof def === 'undefined' ? '' : def;
    var parts = path.split('.');
    if (parts.length > 1 && typeof model[parts[0]] === 'object') {
      return dataAccessor(model[parts[0]], parts.splice(1).join('.'), def);
    } else {
      return model[parts[0]] || def;
    }
  } 



const ListField = (props) => {
    let {
        field,
        row,
        dataAccessor: path
    } = props
    if(row) {
        let data = typeof row[field] === 'object' ? dataAccessor(row[field], path) : row[field]
        return (
            <Typography
                component="span"
                body1="body1"
                //className={className}
            >
                {data}
            </Typography>
        );
    } else {
        return null
    }
};

export default ListField;
 