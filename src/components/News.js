import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }


    nextHandler = async () => {
        this.updateFunc(this.state.page + 1)


    }
    prevHandler = async () => {
        this.updateFunc(this.state.page - 1)

    }

    updateFunc = async (pageNo) => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ce64e369691487d9d8e8b953c3e3d2a&page=${pageNo}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            page: pageNo,
            loading: false

        })


    }

    constructor() {
        super();
        console.log('constructor from news');
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }
    async componentDidMount() {
        this.setState({
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ce64e369691487d9d8e8b953c3e3d2a&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            page: 1,
            totalResults: parsedData.totalResults,
            loading: false,

        })
    }

    render() {
        return (
            <div className='container '>

                {this.state.loading && <Spinner />}
                <div className="row my-3">

                    {!this.state.loading && this.state.articles.map((ele) => {
                        return <div key={ele.url} className="col-md-4">
                            <Newsitem author={ele.author} date={ele.publishedAt} title={ele.title} desc={ele.description} imageUrl={ele.urlToImage} newsUrl={ele.url} />
                        </div>


                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1 ? true : false} onClick={this.prevHandler} className="btn btn-dark">&larr; Prev</button>
                    <button type="button" onClick={this.nextHandler} disabled={(Math.ceil(this.state.totalResults / this.props.pageSize) > this.state.page) ? false : true} className="btn btn-dark">&rarr; Next</button>
                </div>



            </div>
        )
    }
}

export default News
