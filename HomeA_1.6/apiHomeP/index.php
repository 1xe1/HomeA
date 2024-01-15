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
        if (isset($_GET['PropertyID'])) {
            $PropertyID = $_GET['PropertyID'];
            $sql = "SELECT * FROM properties WHERE PropertyID='$PropertyID'";
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
            $response = array('status' => 'error', 'message' => 'No records found for the provided PropertyID');
        }

        echo json_encode($response);
        break;

    case 'POST':
        // Handle POST request to insert data
        // Example: Insert a new record into the "properties" table
        $PropertyName = $data['PropertyName'];
        $Description = $data['Description'];
        $Province = $data['Province'];
        $District = $data['District'];
        $CurrentBid = $data['CurrentBid'];
        $StartTime = $data['StartTime'];
        $EndTime = $data['EndTime'];
        $ImageLink = $data['ImageLink'];

    
        // Get the maximum PropertyID
        $max_PropertyID_query = "SELECT MAX(PropertyID) AS max_PropertyID FROM properties";
        $max_PropertyID_result = $conn->query($max_PropertyID_query);
        $max_PropertyID_row = $max_PropertyID_result->fetch_assoc();
        $max_PropertyID = $max_PropertyID_row['max_PropertyID'];
    
        // Increment the maximum PropertyID
        $new_PropertyID = $max_PropertyID + 1;
    
        $sql = "INSERT INTO properties (PropertyID, UserID, PropertyName, Description, Province, District, CurrentBid, StartTime, EndTime, ImageLink,status) 
        VALUES ('$new_PropertyID', '101', '$PropertyName', '$Description', '$Province', '$District', '$CurrentBid', '$StartTime', '$EndTime', '$ImageLink','0')";

    
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
        $PropertyID = $data['PropertyID'];
        $PropertyName = $data['PropertyName'];
        $Description = $data['Description'];
        $Province = $data['Province'];
        $District = $data['District'];
        $CurrentBid = $data['CurrentBid'];
        $StartTime = $data['StartTime'];
        $EndTime = $data['EndTime'];
        $ImageLink = $data['ImageLink'];

        $sql = "UPDATE properties SET 
                    PropertyName='$PropertyName', Description='$Description', Province='$Province', 
                    District='$District', CurrentBid='$CurrentBid', StartTime='$StartTime', EndTime='$EndTime' ,ImageLink='$ImageLink'
                WHERE PropertyID='$PropertyID'";

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
        $PropertyID = $data['PropertyID'];
    
        // Replace 'PropertyID' with the actual column name in your database
        $sql = "UPDATE properties SET status=1 WHERE PropertyID='$PropertyID'";
    
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
