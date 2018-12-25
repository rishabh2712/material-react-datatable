import React, { Component } from 'react'
import List from '../components/List'
import ListField from '../components/ListField';
import { Button } from '@material-ui/core';


export class App extends Component {
  constructor() {
    super()
    this.state = {data: [], isLoading: false, remote: true}
  }

  componentDidMount() {
    if(!this.state.remote) {
      this.crudGetList()
    }
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
    if(pagination) {
      return `http://localhost:4000/users?_page=${pagination.page}&_limit=${pagination.perPage}`
    } else {
      return `http://localhost:4000/users`
    }
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
            remote={this.state.remote}
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
