import './App.css';
import React, { Component, Fragment } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";  

export default class App extends Component {
  state = {
    progress :0
  }
  setProgress = (progress) => { 
    this.setState({
      progress : progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Fragment>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        shadow={true}
        height={3}
      />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={5} country="in" category="general" />}> </Route>
          <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={5} country="in" category="general" />}> </Route>
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={5} country="in" category="business" />}> </Route>
          <Route exact path="/entertainment" element={ <News setProgress={this.setProgress} key="entertainment" pageSize={5} country="in" category="entertainment" />}></Route>         
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={5} country="in" category="health" />} > </Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={5} country="in" category="science" />} > </Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={5} country="in" category="sports" />} > </Route>
          <Route exact path="/technology" element={ <News setProgress={this.setProgress} key="technology" pageSize={5} country="in" category="technology" />} ></Route>         
        </Routes>
        </Fragment>
        </Router>
      </div>
    )
  }
}

