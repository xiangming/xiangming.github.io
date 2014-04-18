<?php
// 解决中文乱码问题
header("Content-Type: text/html; charset=utf-8");

$name = $_POST['name'];
$email = $_POST['email'];
$title = $_POST['title'];
$message = $_POST['message'];
$recipient = "282818269@qq.com";
$subject = "=?UTF-8?B?".base64_encode('【Contact Form】'.$title)."?=";
$formcontent="$message";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
$result = "恭喜，您的邮件已成功发送！";
echo "{$_GET['callback']}({$result});";//触发客户端JSONP的回调函数
//echo "恭喜，你的邮件已成功发送！" . " -" . "<a href='http://jasonxiang.com/contact.html' style='text-decoration:none;color:#ff0099;'> 返回</a>";
?>
