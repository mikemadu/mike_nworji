<?php
$path=$_SERVER['DOCUMENT_ROOT'];
require_once $path."/healthcare-project/database/database.php";
$dbo=new Database();



$c="create table admin_details 
(
    id int auto_increment primary key,
    user_name varchar(20) unique,
    name varchar(50),
    password varchar(50)
)";
$st=$dbo->conn->prepare($c);
try {
$st->execute();
echo("<br>admin_details created");
}
catch(PDOException $o) 
{
echo("<br>admin_details not created");
}




$c="insert into admin_details
(id,user_name,password,name)
values
(1,'mike','123','Michael Nworji'),
(2,'ama','123','Ama College'),
(3,'pal','123','Pallabi')";

$s = $dbo->conn->prepare($c);
try {
  $s->execute();
} catch (PDOException $o) {
  echo ("<br>duplicate entry");
}

?>