<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$yacht = $_POST['user_yacht'];
$dateTo = $_POST['user_dateTo'];
$dateFrom = $_POST['user_dateFrom'];



$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';  												
$mail->SMTPAuth = true;
$mail->Username = 'obobutsky@gmail.com';
$mail->Password = 'bicmyp-nyxdo3-roPsyz';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465; 

$mail->setFrom('obobutsky@gmail.com');
$mail->addAddress('obogutsky@knu.ua');

$mail->isHTML(true);



$mail->Subject = 'Заявка с сайта Scarlet Sail';
$mail->Body = '' .$name . ' залишив заявку, його телефон ' .$phone. '<br>Його пошта: ' .$email. '<br>Заявка на яхту: ' .$yacht. '<br>Дата початку подорожі: ' .$dateFrom. '<br>Дата закінчення подорожі: ' .$dateTo. '';


$mail->AltBody = '';

$jsonString = file_get_contents('edit.json');
$data = json_decode($jsonString, true);

foreach ($data as $key => $entry) {
    
    if ($entry['name'] == $yacht) {
        array_push($data[$key]['booked'], $dateFrom);
        array_push($data[$key]['booked'], $dateTo); 
        
    }
}

$newJsonString = json_encode($data, JSON_UNESCAPED_UNICODE);

$f = file_put_contents('edit.json', $newJsonString);

if(!$mail->send()) {
    echo $mail->Subject;
} else {
    header('location: thank-you.html');
}
?>

