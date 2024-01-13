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
    // Users CRUD operations
    case 'GET':
        // Retrieve users
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            $sql = "SELECT * FROM users WHERE user_id='$user_id'";
        } else {
            $sql = "SELECT * FROM users where status=0";
        }

        $result = $conn->query($sql);
        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
        } else {
            $response = array('status' => 'error', 'message' => 'No records found for the provided user_id');
        }

        echo json_encode($response);
        break;

    case 'POST':
        // Handle POST request to insert user data
        // Example: Insert a new record into the "users" table
        $username = $data['username'];
        $password = $data['password'];
        $email = $data['email'];

        $sql = "INSERT INTO users (username, password, email) 
                VALUES ('$username', '$password', '$email')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'User record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting user record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        // Handle PUT request to update user data
        // Example: Update a record in the "users" table
        $user_id = $data['user_id'];
        $username = $data['username'];
        $password = $data['password'];
        $email = $data['email'];

        $sql = "UPDATE users SET 
                    username='$username', password='$password', email='$email'
                WHERE user_id='$user_id'";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'User record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating user record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'DELETE':
        // Handle DELETE request to delete user data
        // Example: Delete a record from the "users" table
        $UserID = $data['UserID'];

        // Replace 'user_id' with the actual column name in your database
        $sql = "UPDATE users SET status=1 WHERE UserID='$UserID'";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'User record deleted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error deleting user record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    default:
        // Invalid request method
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        echo json_encode($response);
        break;
}
?>
