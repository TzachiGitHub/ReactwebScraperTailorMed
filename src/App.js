import logo from './logo.svg';
import './App.css';
import TableBuilder from "./TableBuilder";
import axios from 'axios'
import './grid.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.setState({
      data: "",
      useStyle: makeStyles({
        table: {
          minWidth: 650,
        }
      })
    })
  }

  componentDidMount(){
    const dataUrl = "http://localhost:3001/"

    axios.get(dataUrl)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              data: res.data,
              useStyle: makeStyles({
                table: {
                  minWidth: 650,
                }
              })
            });
            console.log(res.data)
          }
        })
        .catch(er=>{
          console.log(er)
        })
  }

  updateData = ()=>{
    const updateDBurl = "http://localhost:3001/update";
    axios.get(updateDBurl)
        .then((res) => {
          if (res.status === 200) {
            alert("updated data successfully!")
            window.location.reload();
          }
        })
        .catch(er=>{
          console.log(er)
        })


  }

  populateData = ()=>{
    const populateDBurl = "http://localhost:3001/pupulateDB";
    axios.get(populateDBurl)
        .then((res) => {
          if (res.status === 200) {
            alert("populated data successfully!")
            window.location.reload();
          }
        })
        .catch(er=>{
          console.log(er)
        })

  }

  render(){
    let data = ""
    if(this.state && this.state.data) {
      let data = this.state.data;
      console.log("return data ==")
      console.log(data)
      let classes = this.state.useStyle;
      return (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Max Grant</TableCell>
                  <TableCell align="left">Treatment List(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {row.assistantProgramName}
                      </TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.grantAmount}</TableCell>
                      <TableCell align="left">{row.treatmentList}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
             <div className="col-4 themed-grid-col">
               <button onClick={this.updateData} className="btn btn-primary">
                 Update Funds
               </button>
               <button onClick={this.populateData} className="btn btn-primary">
                 populate data
               </button>
                 </div>
          </TableContainer>
      );
    }else{
      return(
          <div>
            Loading..
          </div>
      )
    }
  }
}