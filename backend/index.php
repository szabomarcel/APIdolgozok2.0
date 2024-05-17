<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require_once './databaseconnection.php';

$params = explode('/', $_SERVER['QUERY_STRING']);

switch ($params[0]) {
    case "dolgozok":
        switch($_SERVER["REQUEST_METHOD"]){
            case 'GET':
                $request = $conn->query("SELECT * FROM `dolgozok`");
                $levesek = $request->fetch_all(MYSQLI_ASSOC);
                http_response_code(200); // Változtattam itt is 201-ről 200-ra, mert a GET esetén inkább 200 a megfelelő válaszkód
                echo json_encode($levesek);
                break;
            default:
                break;
        }
        break;

    case "dolgozo":
        switch ($_SERVER["REQUEST_METHOD"]) {
            case 'POST':
                $sql = "INSERT INTO `dolgozok`(`nev`, `neme`, `reszleg`, `belepesev`, `ber`) VALUES (NULL, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("sssii", $_POST['nev'], $_POST['neme'], $_POST['reszleg'], $_POST['belepesev'], $_POST['ber']);
                if ($stmt->execute()) {
                    http_response_code(201);
                } else {
                    http_response_code(500); // Változtattam itt is 401-ről 500-ra, mert belső hiba esetén inkább 500 a megfelelő válaszkód
                }
                break;

            default:
            http_response_code(405); 
                break;
        }
        break;
    default :
        http_response_code("401");
        break;
}