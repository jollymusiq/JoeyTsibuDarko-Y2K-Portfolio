<?php
// router.php

$root = $_SERVER['DOCUMENT_ROOT'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
file_put_contents('router_debug.txt', date('H:i:s') . " " . $_SERVER['REQUEST_METHOD'] . " " . $uri . "\n", FILE_APPEND);
$filePath = $root . $uri;

if ($uri === '/ping') { echo 'pong'; exit; }

// 1. API Routes
if ($uri === '/api/feedback' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
        exit;
    }

    // Load existing feedback
    // DOCUMENT_ROOT is 'dist', so data is in '../data'
    $dataFile = dirname($root) . '/data/feedback.json';
    $currentData = [];
    if (file_exists($dataFile)) {
        $json = file_get_contents($dataFile);
        $currentData = json_decode($json, true) ?? [];
    }

    // Append new entry
    $data['timestamp'] = date('Y-m-d H:i:s');
    $data['ip'] = $_SERVER['REMOTE_ADDR'];
    $currentData[] = $data;

    // Save
    file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success', 'message' => 'Feedback received']);
    exit;
}

// 2. Serve Static Assets with Headers (Optimization)
if (file_exists($filePath) && !is_dir($filePath)) {
    $ext = pathinfo($filePath, PATHINFO_EXTENSION);
    $mimeTypes = [
        'css' => 'text/css',
        'js'  => 'application/javascript',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg'=> 'image/jpeg',
        'svg' => 'image/svg+xml',
        'html'=> 'text/html',
        'json'=> 'application/json'
    ];

    if (isset($mimeTypes[$ext])) {
        header("Content-Type: " . $mimeTypes[$ext]);
        // Cache for 1 hour for assets
        if ($ext !== 'html') {
             header("Cache-Control: public, max-age=3600");
        }
    }
    
    readfile($filePath);
    exit;
}

// 3. Clean URL Support
// If /about is requested, check if /about.html exists
if (!file_exists($filePath) && file_exists($filePath . '.html')) {
    include $filePath . '.html';
    exit;
}

// 4. Default Handling (False = return 404 standard or logic)
return false; 
?>
