import React from 'react';

//Loading组件
function Loading(){
    return(
        <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

/**
 * le
 * 2019/11/12
 * 主组件Number
 */
class Calculator extends React.Component{

    /**
     * le
     * 2019/11/12
     * 按钮点击事件
     */
    handleClick = (e) =>{
        let res = this.props.res;
        let clickValue = e.target.value;
        let txt = this.refs.txt;
        //清零
        if(clickValue === "C"){
            txt.value= "";
            res=[];
        }
        //取反运算
        if(clickValue==="+/-"&&txt.value!==""){
            if(txt.value>0){
                txt.value = "-"+txt.value;
            }else{
                txt.value = Math.abs(txt.value);
            }
            return; 
         } 
        //取百分位
        if(clickValue==="%"){
            txt.value = txt.value / 100;
            return;
        }else{
            //判断输入的数字或小数点情况
            if(!isNaN(clickValue) || clickValue==="."){
                if(txt.value.indexOf(".")!==-1){
                    //判断存在小数点的情况存在
                    if(clickValue!=="."){
                        //若再次输入为非小数点则允许拼接
                        txt.value+=clickValue;
                    }
                }else{
                    //没有点存在直接拼接
                    txt.value+=clickValue;
                }
            }else{
                if(clickValue!=="="){
                    res[res.length] = txt.value;
                    //存符号
                    res[res.length] = clickValue;
                    //清屏
                    txt.value="";
                } 
            }
        }
    }

    /**
     * le
     * 2019/11/14
     * 等于事件
     */
    equal = (e) =>{
        let bind = this.props.bind;
        let res = this.props.res;
        let clickValue = e.target.value;
        let txt = this.refs.txt;
        if(clickValue === "="){
            //修改loading控制加载条显示
            bind({
                loading:true
            })
            setTimeout(()=>{
                bind({
                    loading:false
                })
            },1500);
            setTimeout(()=>{
                //loading结束显示结果
                //封装方法解决小数0.1+0.2问题
                Math.formatFloat = function(f,digit) { 
                    var m = Math.pow(10,digit); 
                    return parseInt(f*m)/m;
                }
                res[res.length] = txt.value;
                //eval计算表达式的值;
                txt.value = Math.formatFloat(eval(res.join("")),9);
                res[res.length] = txt.value;

                //发送请求
                if (window.XMLHttpRequest){
                    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行的代码
                    var xmlhttp=new XMLHttpRequest();
                }
                xmlhttp.onreadystatechange=function(){
                    if(xmlhttp.readyState===4 && xmlhttp.status===200){
                        //将后台返回的结果渲染到页面
                        bind({
                        result:xmlhttp.responseText
                        })
                    }
                }
                //通过GET将数据提交至后台
                xmlhttp.open("GET","http://localhost:80/index.php?q="+res,true);
                xmlhttp.send();
                bind({
                    res:[]
                })
            },1500)
        }
    }
    
    render(){
        let isLoading;
        //判断loading状态控制加载条显示
        if(this.props.loading){
            isLoading = <Loading></Loading>
        }
        return(
        <div>
            <div className="show">
                <div className="show-left">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="show-right">
                    <input type="text" className="txt" ref="txt" readOnly = {true}/>
                </div>
            </div>
            <div className="tab">
               <input type="button" value="C" className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="+/-" className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="%"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="/"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="7"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="8"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="9"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="*"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="4"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="5"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="6"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="-"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="1"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="2"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="3"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="+"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="0"  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="."  className="btn" onClick={(e)=>this.handleClick(e)}/>
               <input type="button" value="="  className="btn" onClick={this.equal}/>
            </div>
            {isLoading}
        </div>
    )}
}

export default Calculator;