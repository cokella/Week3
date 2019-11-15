import React from 'react';

class List extends React.Component{
    render(){
        return(
        <div>
            <h2>
            <span>结果是:</span>
            <span>{this.props.result}</span>
            </h2>
        </div>
        )
    }
}

export default List;