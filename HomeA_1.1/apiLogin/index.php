<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

// Include the database connection file
require_once 'connection.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Retrieve the input data
$data = json_decode(file_get_contents("php://input"), true);

// Perform operations based on the request method
switch ($method) {
    case 'POST':
        // Handle POST request to perform login
        $email = $data['email'];
        $password = $data['password'];

        $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE Email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($result) {
            $row = mysqli_fetch_assoc($result);

            if ($row && password_verify($password, $row['Password'])) {
                // Successful login
                $response = array(
                    "UserID" => $row["UserID"],
                    "FirstName" => $row["FirstName"], // Assuming this column exists in your database
                    "LastName" => $row["LastName"],   // Assuming this column exists in your database
                    "Email" => $row["Email"]
                    // Add other necessary fields
                );

                http_response_code(200);
                echo json_encode($response);
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
        break;

    default:
        // Invalid request method
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        echo json_encode($response);
        break;
}
?>