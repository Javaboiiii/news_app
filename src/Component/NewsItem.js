import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageurl, newsUrl, date, time, author} = this.props
    return (
      <>
        <span className="badge rounded-pill text-bg-danger">{author}</span>
        <div className="card" style={{width: "18rem"}}>
       
  <img src={imageurl} className="card-img-top" alt="" /> 
  <div className="card-body">
    <h4 className="card-title">{title}</h4>
    <h6 className="card-title">Date : {date}</h6>
    <h6 className="card-title">Time : {time}</h6>
    <p className="card-text">{description}</p>
    <a href={newsUrl}  className='btn btn-sm btn-primary'>Read More</a>
  </div>
</div>
      </>
    )
  }
}

export default NewsItem