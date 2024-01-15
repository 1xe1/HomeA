
<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header("Access-Control-Allow-Origin: *");
    $xok = 401;

    $email = mysqli_real_escape_string($conn, $_POST['Email']);
    $password = mysqli_real_escape_string($conn, $_POST['Password']);

    $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE Email = ? AND Password = ?");
    mysqli_stmt_bind_param($stmt, "ss", $email, $password);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        $row = mysqli_fetch_assoc($result);

        if ($row) {
            $xok = 200;
            // Return only necessary information, not the entire row
            $output = array(
                "UserID" => $row["UserID"],
                "Username" => $row["Username"],
                "Password" => $row["Password"],
                "Email" => $row["Email"],
                "status" => $row["status"],
                "permission" => $row["permission"],
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
        http_response_code(500);
        echo json_encode(array("message" => "Internal Server Error"));
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Implement authentication logic if needed

    $result = $conn->query("SELECT UserID, Username, Password, Email,status, permission FROM users");
    $members = array();

    while ($row = $result->fetch_assoc()) {
        $members[] = $row;
    }

    echo json_encode($members);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Invalid Request Method"));
}