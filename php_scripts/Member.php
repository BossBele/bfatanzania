<?php

session_start();

class Member
{

    public function addMember($name, $phone, $email, $why)
    {

        $connection = new Connection();

        $sql = "insert into member (name, phone, email, why)
                values ('" . $name . "', '" . $phone . "','" . $email . "','" . $why . "')";
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

    public function retrieveMember()
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
            $sql = "select * from member";
            $result = mysqli_query($connection->connect(), $sql);

            $data = array();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($data, array(
                        'name' => $row['name'],
                        'phone' => $row['phone'],
                        'email' => $row['email'],
                        'why' => $row['why']
                    ));
                }
            }

            echo json_encode($data);
        }
    }
}