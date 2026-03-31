<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once $path."/healthcare-project/database/database.php";
require_once $path."/healthcare-project/database/adminDetails.php";

$action=$_REQUEST["action"];
if(!empty($action))
    {
        if($action=="verifyUser")
            {
                //retrieve what was sent
                $un=$_POST["user_name"];
                $pw=$_POST["password"];
                // $rv=["un"=>$un, "pw"=>$pw];
                // echo json_encode($rv);
                //check if exists in database
                $dbo=new Database();
                $fdo=new admin_details();
                $rv=$fdo->verifyUser($dbo,$un,$pw);
                // echo json_encode($rv);
                if($rv['status']=="ALL OK")
                    {
                        session_start();
                        $_SESSION['current_user']=$rv['id'];
                    }
                    //send response
                    echo json_encode($rv);

            }
    }
?>