<?php

    $path=$_SERVER['DOCUMENT_ROOT'];
    require_once $path."/healthcare-project/database/database.php";
    class admin_details {
        public function verifyUser($dbo,$un,$pw)
        {
            $rv=["id"=>-1, "status"=>"ERROR"];
            $c="select id, password from admin_details where user_name=:un";
            $s=$dbo->conn->prepare($c);
            try {
                $s->execute([":un"=>$un]);
                if($s->rowCount()>0) {
                    $result=$s->fetchall(PDO::FETCH_ASSOC)[0];
                    if($result['password']==$pw) {
                        //all OK
                        $rv=["id"=>$result['id'], "status"=>"ALL OK"];
                    }
                    else {
                        //pw does not match
                        $rv=["id"=>$result['id'], "status"=>"WRONG PASSWORD"];
                    }
                }
                else {
                    //user name does not exists
                    $rv=["id"=>-1,"status"=>"USER DOES NOT EXISTS"];
                }
            }
            catch(PDOException $e) {

            }
            return $rv;
        }
    }

?>