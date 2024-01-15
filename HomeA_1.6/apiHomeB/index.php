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
        if (isset($_GET['bid_id'])) {
            $bid_id = $_GET['bid_id'];
            $sql = "SELECT * FROM bids WHERE bid_id='$bid_id'";
        } else {
            $sql = "SELECT * FROM bids";
        }

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

    case 'POST':
        // Handle POST request to insert bid data
        // Example: Insert a new record into the "bids" table
        $property_id = $data['property_id'];
        $user_id = $data['user_id'];
        $bid_amount = $data['bid_amount'];
        $bid_time = $data['bid_time'];

        $sql = "INSERT INTO bids (property_id, user_id, bid_amount, bid_time) 
                VALUES ('$property_id', '$user_id', '$bid_amount', '$bid_time')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Bid record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting bid record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        // Handle PUT request to update bid data
        // Example: Update a record in the "bids" table
        $bid_id = $data['bid_id'];
        $property_id = $data['property_id'];
        $user_id = $data['user_id'];
        $bid_amount = $data['bid_amount'];
        $bid_time = $data['bid_time'];

        $sql = "UPDATE bids SET 
                    property_id='$property_id', user_id='$user_id', bid_amount='$bid_amount', bid_time='$bid_time'
                WHERE bid_id='$bid_id'";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Bid record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating bid record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'DELETE':
        // Handle DELETE request to delete bid data
        // Example: Delete a record from the "bids" table
        $bid_id = $data['bid_id'];

        $sql = "DELETE FROM bids WHERE bid_id='$bid_id'";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Bid record deleted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error deleting bid record: ' . $conn->error);
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
