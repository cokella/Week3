import React from 'react';
import ReactDOM from 'react-dom';
import './style/App.css';
import Header from './Header/Header.js';
import Calculator from './Calculator/Calculator.js';
import List from './List/List.js';

//主组件
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            res:[],
            result:'',
            loading:false
        }
    }

    //封装setState
    bindsetState = (obj)=>{
      this.setState(obj);
    }

    render(){
        return(
            <div className="container">
                <Header/>
                <div className="tab-content">
                    <div className="tab-pane" id="home">
                        <div className="contain">
                            <Calculator result={this.state.result} res={this.state.res} bind={this.bindsetState}
                            loading={this.state.loading}/>
                        </div>
                    </div>
                    <div className="tab-pane" id="profile">
                        <List result={this.state.result}/>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));

export default App;

