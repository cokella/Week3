import React from 'react';

//Header组件显示顶部和tab
class Header extends React.Component{
    render(){
        return(
            <div>
                <header>
                    <span className="glyphicon glyphicon-send" aria-hidden="true"></span>
                    <span>每天进步一点点,离目标更近一点点！</span>
                    <span className="name">段惠乾</span>
                    <span className="exit"><a>退出</a></span>
                </header>
                <ul className="nav nav-tabs">
                    <li><a href="#home" aria-controls="home" data-toggle="tab">首页</a></li>
                    <li><a href="#profile" aria-controls="profile" data-toggle="tab">计算结果</a></li>
                </ul>
            </div>
        )
    }
}

export default Header;
