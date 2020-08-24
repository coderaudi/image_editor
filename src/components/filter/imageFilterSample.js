import React, { Component } from 'react';

class FilterSamples extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterSamples: [{
                src: "testUrl",
                filterName: "normal"
            },
            {
                src: "testUrl",
                filterName: "grayscale"
            },
            {
                src: "testUrl",
                filterName: "invert"
            },
            {
                src: "testUrl",
                filterName: "contrast"
            },
            {
                src: "testUrl",
                filterName: "blur"
            },
            {
                src: "testUrl",
                filterName: "brightness"
            },
            {
                src: "testUrl",
                filterName: "hue-rotate"
            },
            {
                src: "testUrl",
                filterName: "opacity"
            },
            {
                src: "testUrl",
                filterName: "saturate"
            },
            {
                src: "testUrl",
                filterName: "sepia"
            }]
        }
    }

    filterSamples = () => {
        let res = this.state.filterSamples;
        res = res.map((ele, i) => {
            return <img src={ele.src}
                alt={ele.filterName}
                width="50px" height="50px"
                onClick={() => this.applyFilter(ele.filterName)} />
        })

        return res;
    }


    applyFilter = (filterName) => {
        this.props.filterEffect("filterCover", filterName);
    }

    render() {
        return (
            <div>
              cover filter:  {this.filterSamples()}
            </div>
        );
    }
}

export default FilterSamples;