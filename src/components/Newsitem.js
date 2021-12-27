import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {

        let {title,desc,imageUrl,newsUrl,author, date} = this.props
        return (
            <div>
            
            <div className="card">
                            <img className="card-img-top" src={imageUrl} alt="banner"/>
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{desc}</p>
                                <p className="card-text"><small className="text-muted">by {author} on {new Date(date).toGMTString()}</small></p>
    
                                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Go somewhere</a>
                                    
                            </div>
                        </div>
            </div>
        )
    }
}

export default Newsitem
