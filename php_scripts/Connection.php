<?php

class Connection
{
    public function connect()
    {
        $servername = "localhost";
        $username = "root";
        $conn_password = "";
        $dbname = "bfatanzania";

        /*create connection*/
        $conn = new mysqli($servername, $username, $conn_password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }

    function lastInsertId($sql)
    {
        $conn = $this->connect();
        $result = mysqli_query($conn,$sql);
        if($result)
        {
            $last_id = mysqli_insert_id($conn);
            return $last_id;
        }else{
            return false;
        }

    }

    function closeConnection($connection){
        $connection->close();
    }

}

