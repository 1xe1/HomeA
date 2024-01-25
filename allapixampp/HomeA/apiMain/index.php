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
    // Bids CRUD operations
    case 'GET':
        // Retrieve bids

        $sql = "SELECT b.*, pt.`PropertyName`, pt.`Description`, pt.`Province`, pt.`District`, pt.`CurrentBid`, pt.`StartTime`, pt.`EndTime`, pt.`ImageLink`, pt.`status`, u.`Username`, u.`Email`, u.`status` as `UserStatus`, u.`permission`
        FROM `bids` b
        JOIN `properties` pt ON b.`PropertyID` = pt.`PropertyID`
        JOIN `users` u ON b.`UserID` = u.`UserID`;";

        $result = $conn->query($sql);
        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
        } else {
            $response = array('status' => 'error', 'message' => 'No records found for the provided bid_id');
        }

        echo json_encode($response);
        break;
}
?>
