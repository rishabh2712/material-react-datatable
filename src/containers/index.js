import React, { Component } from 'react'
import List from '../components/List'
import ListField from '../components/ListField';
import { Button } from '@material-ui/core';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories : { 
      items: {
        value: {
          item: calories
        } 
      } 
  }, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export class App extends Component {
  constructor() {
    super()
    this.state = {data: [], isLoading: false}
  }

  changeRowsPerPage = (num, page) => {
   
  }

  crudGetList = (pagination) => {
    let query = this.buildQuery(pagination)
    this.setState({
      isLoading: true
    })
    fetch(query, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => this.setState({
      data: json, isLoading: false
    }))
  }

  buildQuery = (pagination) => {
    return `http://localhost:4000/users?_page=${pagination.page}&_limit=${pagination.perPage}`
  }

  render() {
    return (
      <div
        style= {{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
          <List 
            rows= {this.state.data}
            onClick = {(row) => console.log(row)}
            setPage = {(page) => console.log(page)}
            pagination = {true}
            isLoading = {this.state.isLoading}
            remote={true}
            changeRowsPerPage = {this.changeRowsPerPage}
            crudGetList= {this.crudGetList}
          >
            <ListField field='userId' title='userId' />
            <ListField field='id' title='id'/>
            <ListField field='title' title='title'/>
            <ListField field='completed' title='completed' dataAccessor = 'city' />
            <button>Setup</button>
          </List>
      </div>
    )
  }
}

export default App
