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
    case 'GET':
        if (isset($_GET['table']) && isset($_GET['id'])) {
            $table = $_GET['table'];
            $id = $_GET['id'];
            $sql = "SELECT * FROM $table WHERE {$table}ID='$id'";
        } elseif (isset($_GET['table'])) {
            $table = $_GET['table'];
            $sql = "SELECT * FROM $table";
        } else {
            $response = array('status' => 'error', 'message' => 'Invalid request. Specify table parameter.');
            echo json_encode($response);
            exit;
        }

        $result = $conn->query($sql);
        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
        } else {
            $response = array('status' => 'error', 'message' => 'No records found for the provided id');
        }

        echo json_encode($response);
        break;

    case 'POST':
        // Handle POST request to insert data
        $table = $data['table'];

        switch ($table) {
            case 'bids':
                $propertyID = $data['PropertyID'];
                $userID = $data['UserID'];
                $bidAmount = $data['BidAmount'];
                $bidTime = $data['BidTime'];

                $sql = "INSERT INTO bids (PropertyID, UserID, BidAmount, BidTime) VALUES ('$propertyID', '$userID', '$bidAmount', '$bidTime')";
                break;

            case 'properties':
                // Adjust column names based on your actual schema
                $propertyName = $data['PropertyName'];
                $description = $data['Description'];
                $province = $data['Province'];
                $district = $data['District'];
                $currentBid = $data['CurrentBid'];
                $startTime = $data['StartTime'];
                $endTime = $data['EndTime'];

                $sql = "INSERT INTO properties (PropertyName, Description, Province, District, CurrentBid, StartTime, EndTime) VALUES ('$propertyName', '$description', '$province', '$district', '$currentBid', '$startTime', '$endTime')";
                break;

            case 'users':
                $username = $data['Username'];
                $password = $data['Password'];
                $email = $data['Email'];

                $sql = "INSERT INTO users (Username, Password, Email) VALUES ('$username', '$password', '$email')";
                break;

            default:
                $response = array('status' => 'error', 'message' => 'Invalid table specified for insertion.');
                echo json_encode($response);
                exit;
        }

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        // Handle PUT request to update data
        $table = $data['table'];

        switch ($table) {
            case 'bids':
                $bidID = $data['BidID'];
                $propertyID = $data['PropertyID'];
                $userID = $data['UserID'];
                $bidAmount = $data['BidAmount'];
                $bidTime = $data['BidTime'];

                $sql = "UPDATE bids SET PropertyID='$propertyID', UserID='$userID', BidAmount='$bidAmount', BidTime='$bidTime' WHERE BidID='$bidID'";
                break;

            case 'properties':
                // Adjust column names based on your actual schema
                $propertyID = $data['PropertyID'];
                $propertyName = $data['PropertyName'];
                $description = $data['Description'];
                $province = $data['Province'];
                $district = $data['District'];
                $currentBid = $data['CurrentBid'];
                $startTime = $data['StartTime'];
                $endTime = $data['EndTime'];

                $sql = "UPDATE properties SET PropertyName='$propertyName', Description='$description', Province='$province', District='$district', CurrentBid='$currentBid', StartTime='$startTime', EndTime='$endTime' WHERE PropertyID='$propertyID'";
                break;

            case 'users':
                $userID = $data['UserID'];
                $username = $data['Username'];
                $password = $data['Password'];
                $email = $data['Email'];

                $sql = "UPDATE users SET Username='$username', Password='$password', Email='$email' WHERE UserID='$userID'";
                break;

            default:
                $response = array('status' => 'error', 'message' => 'Invalid table specified for update.');
                echo json_encode($response);
                exit;
        }

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'DELETE':
        // Handle DELETE request to delete data
        $table = $data['table'];

        switch ($table) {
            case 'bids':
                $bidID = $data['BidID'];
                $sql = "DELETE FROM bids WHERE BidID='$bidID'";
                break;

            case 'properties':
                $propertyID = $data['PropertyID'];
                $sql = "DELETE FROM properties WHERE PropertyID='$propertyID'";
                break;

            case 'users':
                $userID = $data['UserID'];
                $sql = "DELETE FROM users WHERE UserID='$userID'";
                break;

            default:
                $response = array('status' => 'error', 'message' => 'Invalid table specified for deletion.');
                echo json_encode($response);
                exit;
        }

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record deleted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error deleting record: ' . $conn->error);
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
