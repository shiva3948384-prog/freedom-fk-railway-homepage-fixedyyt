<?php
// Deployment-only router. Existing website files and UI remain unchanged.
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$root = __DIR__;

// Railway serves the existing homepage at the domain root.
if ($uri === '/' || $uri === '/index.php') {
    readfile($root . '/freedom-fk/index.html');
    return true;
}

// Product pages were exported as static snapshots. Resolve their original query IDs.
if ($uri === '/freedom-fk/products/index.php') {
    $products = [
    'b360f7bd633df' => 'index.php',
    'd3ae32bfa5521' => 'index-1.php',
    'a7ebec5ac987b' => 'index-2.php',
    'a77f4d8cdcc21' => 'index-3.php',
    '3c7095e46b323' => 'index-4.php',
    '57de2486b28f2' => 'index-5.php',
    '051622ce4fc31' => 'index-6.php',
    'cc814d239bcae' => 'index-7.php',
    'ea0583c5b9ae3' => 'index-8.php',
    'iphone17' => 'index-9.php',
    'iphone16' => 'index-10.php',
    '48dc90ee60e84' => 'index-11.php',
    '25d20c2b1dc5c' => 'index-12.php',
    '3d56e5edf6f38' => 'index-13.php',
    '0616698f3836c' => 'index-14.php',
    'fe98d1b39b938' => 'index-15.php',
    '1b127c7e3ff53' => 'index-16.php',
    '2bc6ece01411b' => 'index-17.php',
    'f0c4f2268d872' => 'index-18.php',
    '2ce01e777f0ff' => 'index-19.php',
    '03bec70674cef' => 'index-20.php',
    '92787842293f6' => 'index-21.php',
    '49a62e6801665' => 'index-22.php',
    '3d137704666aa' => 'index-23.php',
    '17437576b5e8f' => 'index-24.php',
    '0467e5a892406' => 'index-25.php',
    'dac72273679cb' => 'index-26.php',
    'b2f01fa8aaf09' => 'index-27.php',
    '4ab42480d26ab' => 'index-28.php',
    'ed572399d7ed0' => 'index-29.php',
    '373f04b573c81' => 'index-30.php',
    '156b72f954ad8' => 'index-31.php',
    '571dd48a19540' => 'index-32.php',
    '923d3541c3f98' => 'index-33.php',
    'b327846273eae' => 'index-34.php',
    '000f3dabc1f59' => 'index-35.php',
    '6771088295a8e' => 'index-36.php',
    'a69a084d6f401' => 'index-37.php',
    ];
    $id = $_GET['id'] ?? '';
    if (isset($products[$id])) {
        readfile($root . '/freedom-fk/products/' . $products[$id]);
        return true;
    }
    http_response_code(404);
    echo 'Product not found';
    return true;
}

$file = realpath($root . $uri);
$base = realpath($root);
if ($file !== false && $base !== false && str_starts_with($file, $base . DIRECTORY_SEPARATOR) && is_file($file)) {
    return false; // Let PHP's built-in server serve the existing file unchanged.
}
http_response_code(404);
echo 'Not found';
return true;
