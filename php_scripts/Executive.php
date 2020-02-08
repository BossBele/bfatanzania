<?php

class Executive
{
    public function addExecutive($first_name, $middle_name, $last_name, $title, $phone,
                                 $email, $bio, $photo, $resume, $platform, $username)
    {

        $connection = new Connection();
        $sql = "insert into executives (first_name, middle_name, last_name, title, phone, email, bio, photo, resume)
                values ('" . $first_name . "', '" . $middle_name . "','" . $last_name . "','" . $title . "',
                '" . $phone . "','" . $email . "','" . $bio . "','" . $photo . "','" . $resume . "')";
        $last_id = $connection->lastInsertId($sql);

        if ($last_id == false) {
            $result = false;

        } else {
            /*insert in social media table*/
            foreach ($platform as $key => $item) {
                $sql_social = "insert into social_media (executive_id, platform, user_name)
                values ('" . $last_id . "','" . $item . "','" . $username[$key] . "')";
                $result = mysqli_query($connection->connect(), $sql_social);
            }
            /*end social media table*/
        }

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

    public function updateExecutive($course_id, $code_edit, $name_edit, $duration_edit)
    {
        $connection = new Connection();

        $sql = "update course set code = '" . $code_edit . "', name = '" . $name_edit . "', duration ='" . $duration_edit . "' where id ='" . $course_id . "'";
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

    public function deleteExecutive($course_id)
    {
        $connection = new Connection();
        $sql = "delete from course where id='" . $course_id . "'";
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

    public function retrieveExecutive()
    {
        $connection = new Connection();
        $sql = "select * from course";
        $result = mysqli_query($connection->connect(), $sql);

        $data = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($data, array(
                    'id' => $row['id'],
                    'code' => $row['code'],
                    'name' => $row['name'],
                    'duration' => $row['duration'],
                    'dates' => $row['date']
                ));
            }
        }

        echo json_encode($data);
    }

}


