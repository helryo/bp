<?php
$to = "contact@tekihatsu-tantei.com";
$subject = "【摘発探偵.com】お問い合わせがありました";

mb_language("Japanese");
mb_internal_encoding("UTF-8");

$name    = isset($_POST["name"])    ? trim($_POST["name"])    : "";
$email   = isset($_POST["email"])   ? trim($_POST["email"])   : "";
$tel     = isset($_POST["tel"])     ? trim($_POST["tel"])     : "";
$type    = isset($_POST["type"])    ? trim($_POST["type"])    : "";
$message = isset($_POST["message"]) ? trim($_POST["message"]) : "";

$errors = array();
if ($name === "")  { $errors[] = "お名前を入力してください。"; }
if ($email === "") { $errors[] = "メールアドレスを入力してください。"; }
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "メールアドレスの形式が正しくありません。";
}
if ($message === "") { $errors[] = "ご相談の詳細を入力してください。"; }

if (!empty($errors)) {
    ?>
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>お問い合わせエラー｜摘発探偵.com</title>
        <link rel="stylesheet" href="css/styles.css" />
    </head>
    <body>
      <main>
        <section>
          <div class="container">
            <div class="section-header" style="max-width:640px;margin:40px auto 20px;text-align:left;">
              <h1 class="section-title">送信エラーが発生しました</h1>
              <p class="section-sub">お手数ですが、以下の内容をご確認のうえ、ブラウザの戻るボタンでお戻りください。</p>
            </div>
            <div class="info-card" style="max-width:640px;margin:0 auto 24px;">
              <ul class="hero-card-list" style="font-size:13px;">
                <?php foreach ($errors as $e): ?>
                  <li><?php echo htmlspecialchars($e, ENT_QUOTES, "UTF-8"); ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </body>
    </html>
    <?php
    exit;
}

$body  = "";
$body .= "摘発探偵.comサイトよりお問い合わせがありました。\n\n";
$body .= "お名前： " . $name . "\n";
$body .= "メールアドレス： " . $email . "\n";
$body .= "電話番号： " . $tel . "\n";
$body .= "ご相談内容種別： " . $type . "\n";
$body .= "ご相談の詳細：\n" . $message . "\n\n";
$body .= "---- 送信情報 ----\n";
$body .= "送信日時： " . date("Y-m-d H:i:s") . "\n";
$body .= "送信元IP： " . $_SERVER["REMOTE_ADDR"] . "\n";
$body .= "ユーザーエージェント： " . $_SERVER["HTTP_USER_AGENT"] . "\n";

$from_name  = "摘発探偵.com";
$from_email = "contact@tekihatsu-tantei.com";
$encoded_from = "From: " . mb_encode_mimeheader($from_name) . " <{$from_email}>";

$sent = mb_send_mail($to, $subject, $body, $encoded_from);

if ($sent && $email !== "") {
    $auto_subject = "【摘発探偵.com】お問い合わせありがとうございます";
    $auto_body  = "";
    $auto_body .= $name . " 様\n\n";
    $auto_body .= "この度は摘発探偵.comへお問い合わせいただきありがとうございます。\n";
    $auto_body .= "以下の内容でお問い合わせを受け付けいたしました。\n\n";
    $auto_body .= "------------------------------\n";
    $auto_body .= "お名前： " . $name . "\n";
    $auto_body .= "メールアドレス： " . $email . "\n";
    $auto_body .= "電話番号： " . $tel . "\n";
    $auto_body .= "ご相談内容種別： " . $type . "\n";
    $auto_body .= "ご相談の詳細：\n" . $message . "\n";
    $auto_body .= "------------------------------\n\n";
    $auto_body .= "内容を確認のうえ、担当者よりあらためてご連絡いたします。\n";
    $auto_body .= "※本メールに心当たりがない場合は、このメールを破棄してください。\n\n";
    $auto_body .= "摘発探偵.com（株式会社松川企画）\n";
    $auto_body .= "〒120-0035 東京都足立区千住中居町25-6 HUビル204\n";
    $auto_body .= "TEL：03-0000-0000\n";

    $auto_from = $encoded_from;
    mb_send_mail($email, $auto_subject, $auto_body, $auto_from);
}

// 送信完了後はサンキューページへリダイレクト
header("Location: thanks.html");
exit;
