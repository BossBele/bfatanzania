<?php
include 'Executive.php';
include 'CommonFunction.php';
include 'Connection.php';

$executive = new Executive();

if ($_POST) {

    switch ($_POST) {
        /*add executive*/
        case isset($_POST['add_executive']):
            $uploadDir = '../uploads/';
            $uploadRe = '../resumes/';
            $uploadedResume = null;

            if (!file_exists($uploadDir)) {
                mkdir($uploadDir);
            }

            if (!file_exists($uploadRe)) {
                mkdir($uploadRe);
            }

//            print("<pre>".print_r($_POST,true)."</pre>");

            $first_name = $_POST['first_name'];
            $middle_name = $_POST['middle_name'];
            $last_name = $_POST['last_name'];
            $title = $_POST['title'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $bio = $_POST['bio'];
            $phone = $_POST['phone'];
            $platform = explode(",", $_POST['platforms']);
            $username = explode(",", $_POST['user_names']);

            $uploadStatus = 1;
            $uploadStatusResume = 1;
            // Upload file
            $uploadedFile = '';
            if (!empty($_FILES['file-input']['name'])) {

                // File path config
                $fileName = basename($_FILES["file-input"]["name"]);
                $targetFilePath = $uploadDir . $fileName;
                $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

                // Allow certain file formats
                $allowTypes = array('pdf', 'doc', 'docx', 'jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG');
                if (in_array($fileType, $allowTypes)) {
                    // Upload file to the server
                    if (move_uploaded_file($_FILES["file-input"]["tmp_name"], $targetFilePath)) {
                        $uploadedFile = $fileName;
                    } else {
                        $uploadStatus = 0;
//                        $response['message'] = 'Sorry, there was an error uploading your file.';
                    }
                } else {
                    $uploadStatus = 0;
//                    $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.';
                }
            }

            if (!empty($_FILES['resume-input']['name'])) {
                // File path config
                $resumeName = basename($_FILES["resume-input"]["name"]);
                $targetFilePathResume = $uploadRe . $resumeName;
                $fileTypeResume = pathinfo($targetFilePathResume, PATHINFO_EXTENSION);

                // Allow certain file formats
                $allowTypesResume = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg');
                if (in_array($fileTypeResume, $allowTypesResume)) {
                    // Upload file to the server
                    if (move_uploaded_file($_FILES["resume-input"]["tmp_name"], $targetFilePathResume)) {
                        $uploadedResume = $resumeName;
                    } else {
                        $uploadStatusResume = 0;
//                        $response['message'] = 'Sorry, there was an error uploading your file.';
                    }
                } else {
                    $uploadStatusResume = 0;
//                    $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.';
                }
            }


            if ($uploadStatus == 1 || $uploadStatusResume == 1) {
                $executive->addExecutive($first_name, $middle_name, $last_name, $title, $phone,
                    $email, $bio, $uploadedFile, $uploadedResume, $platform, $username);

            }

            break;
        /*edit executive*/
        case isset($_POST['edit_executive']):
            $uploadDir = '../uploads/';
            $uploadRe = '../resumes/';

            if (!file_exists($uploadDir)) {
                mkdir($uploadDir);
            }
            if (!file_exists($uploadRe)) {
                mkdir($uploadRe);
            }

//            print("<pre>".print_r($_POST,true)."</pre>");
            $id = $_POST['executive_id'];
            $first_name = $_POST['first_name_edit'];
            $middle_name = $_POST['middle_name_edit'];
            $last_name = $_POST['last_name_edit'];
            $title = $_POST['title_edit'];
            $phone = $_POST['phone_edit'];
            $email = $_POST['email_edit'];
            $bio = $_POST['bio_edit'];
            $phone = $_POST['phone_edit'];
            $photos = $_POST['photos'];
            $resumes = $_POST['resumes'];
            $platform = explode(",", $_POST['platforms']);
            $username = explode(",", $_POST['user_names']);

            $uploadStatus = 1;
            $uploadStatusResume = 1;
            // Upload file
            $uploadedFile = '';
            if (!empty($_FILES['file-input']['name'])) {

                // File path config
                $fileName = basename($_FILES["file-input"]["name"]);
                $targetFilePath = $uploadDir . $fileName;
                $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

                if (file_exists($uploadDir . $photos)) {
                    unlink($uploadDir . $photos);
                }

                // Allow certain file formats
                $allowTypes = array('pdf', 'doc', 'docx', 'jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG');
                if (in_array($fileType, $allowTypes)) {
                    // Upload file to the server
                    if (move_uploaded_file($_FILES["file-input"]["tmp_name"], $targetFilePath)) {
                        $uploadedFile = $fileName;
                    } else {
                        $uploadStatus = 0;
                    }
                } else {
                    $uploadStatus = 0;
                }
            } else {
                $uploadedFile = $photos;
            }

            if (!empty($_FILES['resume-input']['name'])) {
                // File path config
                $resumeName = basename($_FILES["resume-input"]["name"]);
                $targetFilePathResume = $uploadRe . $resumeName;
                $fileTypeResume = pathinfo($targetFilePathResume, PATHINFO_EXTENSION);

                if (file_exists($uploadRe . $resumes)) {
                    unlink($uploadRe . $resumes);
                }

                // Allow certain file formats
                $allowTypesResume = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg');
                if (in_array($fileTypeResume, $allowTypesResume)) {
                    // Upload file to the server

                    if (move_uploaded_file($_FILES["resume-input"]["tmp_name"], $targetFilePathResume)) {
                        $uploadedResume = $resumeName;
                    } else {
                        $uploadStatusResume = 0;
                    }
                } else {
                    $uploadStatusResume = 0;
                }
            } else {
                $uploadedResume = $resumes;
            }


            if ($uploadStatus == 1 || $uploadStatusResume == 1) {
                $executive->updateExecutive($id, $first_name, $middle_name, $last_name, $title, $phone,
                    $email, $bio, $uploadedFile, $uploadedResume, $platform, $username);

            }
            break;
        /*send email*/
        case isset($_POST['send_email']):
            $sender_name = $_POST['sender_name'];
            $sender_email = $_POST['sender_email'];
            $sender_text = $_POST['sender_text'];
            $email_president = $_POST['email_president'];
//            print("<pre>" . print_r($_POST, true) . "</pre>");

            $executive->sendExecutiveEmail($sender_name, $sender_email, $sender_text, $email_president);
            break;
        /*delete executive*/
        case isset($_POST['delete_course']):
            $executive->deleteExecutive($_POST['course_id']);
            break;
        default:
            break;
    }

}

if ($_GET) {
    switch ($_GET) {
        /*retrieve all executive*/
        case isset($_GET['retrieve']):
            $executive->retrieveExecutive();
            break;
        case isset($_GET['retrieve_team']):
            $executive->retrieveExecutiveTeam();
            break;
        default:
            break;
    }
}