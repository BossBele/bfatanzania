<?php

session_start();

class Partner
{

    public function addPartner($organisation, $phone, $email, $location, $programme)
    {
        $connection = new Connection();

        $sql = "insert into partner (organisation, phone, email, location, programme)
                values ('" . $organisation . "', '" . $phone . "','" . $email . "','" . $location . "','" . $programme . "')";
        $result = mysqli_query($connection->connect(), $sql);

        $response = array();
        if ($result) {
            array_push($response, array(
                'message' => "success"
            ));
        } else {
            array_push($response, array(
                'message' => "failed"
            ));
        }

        echo json_encode($response);
    }

    public function retrievePartner()
    {
        if (!isset($_SESSION['userId'])) {
            // not logged in
            $login = array();

            array_push($login, array(
                'AUTH' => "failed"
            ));
            echo json_encode($login);
        } else {
            $connection = new Connection();
            $sql = "select * from partner";
            $result = mysqli_query($connection->connect(), $sql);

            $data = array();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($data, array(
                        'organisation' => $row['organisation'],
                        'phone' => $row['phone'],
                        'email' => $row['email'],
                        'location' => $row['location'],
                        'programme' => $row['programme']
                    ));
                }
            }

            echo json_encode($data);
        }

    }
}