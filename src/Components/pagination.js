import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            elements: [],
            perPage: 10,
            currentPage: 0,
        };

    }

    receiveData = async () => {
        const data = await axios(`https://ihsavru.me/Demo/uploads.json`);
        this.setState({
            data: data.data.course.uploads,
            pageCount: Math.ceil(data.data.course.uploads.length / this.state.perPage)
        }, () => this.setElementsForCurrentPage())
    }

    componentDidMount() {
        this.receiveData();
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
            this.setElementsForCurrentPage();
        });
    }

    setElementsForCurrentPage() {
            let elements = this.state.data
                .slice(this.state.offset, this.state.offset + this.state.perPage)
                .map(post =>
            ( <img src="{post.thumburl}" />)
        );
        this.setState({ elements: elements });
        }

    render() {
        let paginationElement;
        if (this.state.pageCount > 1) {
            paginationElement = (
                <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={<span className="gap">...</span>}
                pageCount={this.state.pageCount}
                onPageChange={this.handlePageClick}
                forcePage={this.state.currentPage}
                containerClassName={"pagination"}
                previousLinkClassName={"previous_page"}
                nextLinkClassName={"next_page"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
            />
            );
        }
        return (
            <div className="App">
                {paginationElement}
            </div>
        );
    }
}

export default componentName