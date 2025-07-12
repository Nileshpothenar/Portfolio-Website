<?php
// send-email.php
header('Content-Type: application/json');

// HoneyPot trap (invisible to humans)
if (!empty($_POST['website'])) die('Bot detected');

// Sanitize inputs
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate
$errors = [];
if (empty($name)) $errors[] = 'Name is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email';
if (empty($message)) $errors[] = 'Message is required';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

// Configure email
$to = 'pothenarnilesh@gmail.com'; // CHANGE THIS
$subject = 'New message from your portfolio';
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$email_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>