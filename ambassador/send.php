<?php
require __DIR__.'/../vendor/autoload.php';

use Sendpulse\RestApi\ApiClient;
use Sendpulse\RestApi\Storage\FileStorage;

// API credentials from https://login.sendpulse.com/settings/#api
define('API_USER_ID', '07622b2939bd98a17aae1f777de53904');
define('API_SECRET', '642ebc4f446a3377ca47150a12419a15');
$SPApiClient = new ApiClient(API_USER_ID, API_SECRET, new FileStorage());


$post = (!empty($_POST) ? true : false);
if($post) {
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $company = $_POST['company'];
  $mes = "Имя: ".$name."\n\nТелефон:".$phone."\n\nНазвание компании (если частный агент — придет пустое поле):".$company;
  $error = '';
  if(!$error) {
    $eml = array(
      'html'    => '<p>'.$mes.'</p>',
      'text'    => $mes,
      'subject' => 'nedvex.ru/ambassador: заявка с сайта',
      'from'    => array(
        'name'  => 'Landind',
        'email' => 'no-reply@nedvex.ru'
      ),
      'to'      => array(
        array(
          'name'  => 'Content manager',
          'email' => ' ambassador@nedvex.ru'
        )
      )
    );
    $send = $SPApiClient->smtpSendMail($eml);

    if($send) {echo 'OK';}
  }
  else {echo '<div class="err">'.$error.'</div>';}
}
?>