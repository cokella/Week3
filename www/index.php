<?php
//处理请求跨域
header('Access-Control-Allow-Origin:*');

//接收参数q
$q1 = $_GET["q"];
//将字符串转化为数组
$arr = explode(',',$q1);
//处理接收参数加号变为空格
if(in_array(" ",$arr)){
    $q2 = '+';
    $q = array_splice($arr,1,1,$q2);
}

//连接数据库
$servername = "127.0.0.1";
$username = "root";
$password = "XLH7Vm&lrkU6";
$dbname = "myTest";

//创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
 
//检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//向数据库中插入数据
$sql = "INSERT INTO Calculator (num1,oper,num2,result) 
VALUES($arr[0],'$arr[1]',$arr[2],$arr[3])";

echo $arr[0]."  ".$arr[1]."  ".$arr[2]." "."="." ".$arr[3];

//若插入失败返回错误
if ($conn->query($sql) === FALSE){
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>