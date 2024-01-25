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
        if (isset($_GET['property_id'])) {
            $property_id = $_GET['property_id'];
            $sql = "SELECT * FROM properties WHERE property_id='$property_id'";
        } else {
            $sql = "SELECT * FROM properties where status=0";
        }

        $result = $conn->query($sql);
        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
        } else {
            $response = array('status' => 'error', 'message' => 'No records found for the provided property_id');
        }

        echo json_encode($response);
        break;

    case 'POST':
        // Handle POST request to insert data
        // Example: Insert a new record into the "properties" table
        $propertyName = $data['PropertyName'];
        $description = $data['Description'];
        $province = $data['Province'];
        $district = $data['District'];
        $currentBid = $data['CurrentBid'];
        $startTime = $data['StartTime'];
        $endTime = $data['EndTime'];

        // Get the maximum property_id
        $max_property_id_query = "SELECT MAX(property_id) AS max_property_id FROM properties";
        $max_property_id_result = $conn->query($max_property_id_query);
        $max_property_id_row = $max_property_id_result->fetch_assoc();
        $max_property_id = $max_property_id_row['max_property_id'];

        // Increment the maximum property_id
        $new_property_id = $max_property_id + 1;

        $sql = "INSERT INTO properties (property_id, PropertyName, Description, Province, District, CurrentBid, StartTime, EndTime) 
                VALUES ('$new_property_id', '$propertyName', '$description', '$province', '$district', '$currentBid', '$startTime', '$endTime')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        // Handle PUT request to update data
        // Example: Update a record in the "properties" table
        $property_id = $data['property_id'];
        $propertyName = $data['PropertyName'];
        $description = $data['Description'];
        $province = $data['Province'];
        $district = $data['District'];
        $currentBid = $data['CurrentBid'];
        $startTime = $data['StartTime'];
        $endTime = $data['EndTime'];

        $sql = "UPDATE properties SET 
                    PropertyName='$propertyName', Description='$description', Province='$province', 
                    District='$district', CurrentBid='$currentBid', StartTime='$startTime', EndTime='$endTime' 
                WHERE property_id='$property_id'";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'DELETE':
        // Handle DELETE request to delete property data
        // Example: Delete a record from the "properties" table
        $property_id = $data['property_id'];
    
        // Replace 'property_id' with the actual column name in your database
        $sql = "UPDATE properties SET status=1 WHERE PropertyID='$property_id'";
    
        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Property record deleted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error deleting property record: ' . $conn->error);
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
