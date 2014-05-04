<?php
// 解决中文乱码问题
header("Content-Type: text/html; charset=utf-8");

//针对机器人的trap
if ($_POST['type'] != '') {
	die('Invalid request.');
}

//name
if (strlen(trim($_POST['name'])) < 2) {
	die("Invalid name.");
}else{
	$name = $_POST['name'];
}

//email
if(!ereg("^[a-zA-Z0-9_.]+@([a-zA-Z0-9_]+.)+[a-zA-Z]{2,3}$", $_POST['email'])) { 
	die("Invalid email.");
}else{
	$email = $_POST['email'];
}

//title
if(strlen(trim($_POST['title'])) < 2) { 
	die("Invalid title.");
}else{
	$title = $_POST['title'];
}

//message
if(strlen(trim($_POST['message'])) < 2) { 
	die("Invalid message.");
}else{
	$message = $_POST['message'];
}

//main function
$recipient = "282818269@qq.com";
$subject = "=?UTF-8?B?".base64_encode('【Contact Form】'.$title)."?=";
$mailcontent="$message";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $mailcontent, $mailheader) or die("Error!");
//echo "{$_GET['callback']}();";//触发客户端JSONP的回调函数
echo "恭喜，您的邮件已成功发送！" . " -" . "<a href='http://jasonxiang.com/contact.html' style='text-decoration:none;color:#ff0099;'> 返回</a>";
?>
