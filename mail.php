<?php
// 解决中文乱码问题
header("Content-Type: text/html; charset=utf-8");

$name = $_POST['name'];
$email = $_POST['email'];
$type = $_POST['type'];
$message = $_POST['message'];
$recipient = "282818269@qq.com";
$subject = "=?UTF-8?B?".base64_encode('【'.$type.'】Contact Form')."?=";
$formcontent="$message";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "恭喜，你的邮件已成功发送！" . " -" . "<a href='contact.html' style='text-decoration:none;color:#ff0099;'> 返回</a>";
?>
