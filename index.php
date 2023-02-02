<?php $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]"; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PWA Starter Kit</title>
  <link rel="shortcut icon" href="./assets/icons/icon-128x128.png">
  <link rel="stylesheet" href="./css/style.css">
  <!-- PWA -->
  <link rel="manifest" crossorigin="use-credentials" href="<?php echo $actual_link?>/manifest.json" />
  <link rel="apple-touch-icon" href="/assets/icons/icon-96x96.png">
  <meta name="apple-mobile-web-app-status-bar" content="white">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="theme-color" content="white">
</head>

<body>
  <h1>PWA Starter Kit</h1>


  <script src="js/app.js"></script>
</body>

</html>