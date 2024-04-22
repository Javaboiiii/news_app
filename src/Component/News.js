import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import LoadingBar from 'react-top-loading-bar'



export class News extends Component {
  static defaultProps = { 
    country: "in",
    pageSize: 8,
    cateogory : "general",
  }
  static propTypes = { 
    country: PropTypes.string,
    pageSize: PropTypes.number,
    cateogory: PropTypes.string,
  }
    
    constructor() { 
        super();
        console.log("Hello I am a constructor from News Component");
        this.state = {
            articles : [],
            loading: false,
            page : 1 ,
            totalSize: 0,
            progress : 100
        }
    }
    async updateNews() {
      console.log("cdm")
      this.props.setProgress(0)
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5403ebbfd6c84ed1b540c99442164fb3&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading : true})
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        articles : parsedData.articles, 
        totalSize : parsedData.totalResults,
        loading : false,
      })
      this.props.setProgress(100)
    }

    async componentDidMount() { 
      this.updateNews()
    }

    handleNxt = async  () => {
      console.log("Next")
      this.props.setProgress(0)

      if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        
      
    
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5403ebbfd6c84ed1b540c99442164fb3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({
        loading : true
      })
      let data = await fetch(url)
      let parsedData = await data.json()
      
      this.setState({
        page: this.state.page + 1 ,
        articles : parsedData.articles,
        loading : false,
      })
    }
    this.props.setProgress(100)
    }
    handlePrev = async () => {
      this.props.setProgress(0)
      console.log("Previous")   
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5403ebbfd6c84ed1b540c99442164fb3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
      this.setState({
        loading: true
      })
      let data = await fetch(url)
      let parsedData = await data.json()
      
      this.setState({
        page: this.state.page - 1 ,
        articles : parsedData.articles,
        loading : false,
      })
      this.props.setProgress(100)
    }
    fetchMoreData =async () => {  
      console.log("cdm")
      this.setState({
        page: this.state.page + 1
       });
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5403ebbfd6c84ed1b540c99442164fb3&page=${this.state.page}&pageSize=${this.props.pageSize}`
    
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        articles : this.state.articles.concat(parsedData.articles),
        totalSize : parsedData.totalResults
      })
    
    }
  
  render() {
    console.log("render")
    return (
      <div className='container my-3'>
        <h2 className="heading" style={{
          margin : "20px",
          padding : "50px"
        }}>News Fetching Web App</h2>
        {this.state.loading === true ? <Spinner/> : ""}
        <div className="row">
        {this.state.articles.length  && this.state.articles.map((element) => {
          return <div className="col-md-3 my-3 mx-3" key={element.url}>
          <NewsItem title={element.title != null ? element.title : ""} date={element.publishedAt.split("T")[0]} time={element.publishedAt.split("T")[1]} author={element.author!= null ? element.author : "Anonymous"} description={element.description != null ? element.description: ""} imageurl={element.urlToImage} newsUrl={element.url} />
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between my-3">
        <button disabled = {this.state.page<= 1}type="button" className="btn btn-success" onClick={this.handlePrev}>&larr; Prev</button> 
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNxt}>Next &rarr;</button> 
        </div>
      </div>
    )
  }
}

export default News
