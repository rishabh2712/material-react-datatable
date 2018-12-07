import React, { Component } from 'react'
import List from '../components/List'
import ListField from '../components/ListField';
import { Button } from '@material-ui/core';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export class App extends Component {
  render() {
    return (
      <div
        style= {{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
          <List 
            rows= {rows}
          >
            <ListField field='name' title='Name' />
            <ListField field='calories' title='Calories' />
            <ListField field='fat' title='Fat' />
            <ListField field='carbs' title='Carbs' />
            <Button field = 'action' title = 'Action' variant='contained'>Hi</Button>
          </List>
      </div>
    )
  }
}

export default App
