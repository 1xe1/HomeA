<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json");
    
    $xok = 401;

    // Retrieve user input
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Prepare and execute SQL query
    $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE Email = ? AND Password = ?");
    mysqli_stmt_bind_param($stmt, "ss", $email, $password);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    // Check if query was successful
    if ($result) {
        $row = mysqli_fetch_assoc($result);

        if ($row) {
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
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Implement authentication logic if needed

    // Retrieve user data without sensitive information
    $result = $conn->query("SELECT UserID, Username, Email FROM users");
    $users = array();

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
} else {
    // Invalid request method
    http_response_code(405);
    echo json_encode(array("message" => "Invalid Request Method"));
}
?>
