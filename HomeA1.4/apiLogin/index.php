<?php
include 'connection.php'; // Include your database connection file

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Max-Age: 86400"); // cache for 1 day

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $xok = 401;

    // Retrieve user input
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and execute SQL query
    $stmt = mysqli_prepare($conn, "SELECT UserID, Username, Email, Password FROM users WHERE Email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    // Check if query was successful
    if ($result) {
        $row = mysqli_fetch_assoc($result);

        if ($row && password_verify($password, $row['Password'])) {
            // Successful login
            $xok = 200;

            // Return only necessary information, not the entire row
            $output = array(
                "UserID" => $row["UserID"],
                "Username" => $row["Username"],
                "Email" => $row["Email"]
                // Add other necessary fields
            );

            http_response_code($xok);
            echo json_encode($output);
        } else {
            // Invalid credentials
            http_response_code(401);
            echo json_encode(array("message" => "Invalid login credentials"));
        }
    } else {
        // Database query error
        http_response_code(500);
        echo json_encode(array("message" => "Internal Server Error"));
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("message" => "Invalid Request Method"));
}
?>
