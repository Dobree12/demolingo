<?php
// ============================================
// Sincronizare progres — un singur utilizator, fără bază de date
// ============================================
// GET  (header X-Key: cheia de citire SAU de scriere) → ultima stare salvată
// POST {key, state, force?}                           → salvează starea
//
// Cheile și datele stau ÎN AFARA folderului public (supraviețuiesc deploy-urilor):
//   /home/<user>/demolingo-config.php  → return ['write_key' => '...', 'read_key' => '...'];
//   /home/<user>/demolingo-data/       → progress.json + history/AAAA-LL-ZZ.json
// Protecție la regres: o stare cu mai puține răspunsuri decât cea salvată e
// refuzată (409), ca un browser golit să nu șteargă progresul de pe server.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

$home = dirname(__DIR__, 2);
$configFile = $home . '/demolingo-config.php';
$dataDir = $home . '/demolingo-data';
const MAX_BYTES = 2000000;

function cut(string $s, int $n): string {
  return function_exists('mb_substr') ? mb_substr($s, 0, $n) : substr($s, 0, $n);
}

function reply(int $code, array $body): void {
  http_response_code($code);
  echo json_encode($body, JSON_UNESCAPED_UNICODE);
  exit;
}

if (!is_file($configFile)) reply(500, ['error' => 'not_configured']);
$config = require $configFile;
$writeKey = (string)($config['write_key'] ?? '');
$readKey = (string)($config['read_key'] ?? '');
if (strlen($writeKey) < 16 || strlen($readKey) < 16) reply(500, ['error' => 'weak_keys']);

function keyIs(string $given, string $expected): bool {
  return $given !== '' && hash_equals($expected, $given);
}

$progressFile = $dataDir . '/progress.json';

function readStored(string $file): ?array {
  if (!is_file($file)) return null;
  $data = json_decode((string)file_get_contents($file), true);
  return is_array($data) ? $data : null;
}

function writeAtomic(string $file, string $content): bool {
  $tmp = $file . '.tmp' . bin2hex(random_bytes(4));
  if (file_put_contents($tmp, $content, LOCK_EX) === false) return false;
  return rename($tmp, $file);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
  $key = (string)($_SERVER['HTTP_X_KEY'] ?? '');
  if (!keyIs($key, $readKey) && !keyIs($key, $writeKey)) reply(403, ['error' => 'bad_key']);
  $stored = readStored($progressFile);
  if (!$stored) reply(404, ['error' => 'empty']);
  reply(200, $stored);
}

if ($method !== 'POST') reply(405, ['error' => 'method']);

$raw = file_get_contents('php://input', false, null, 0, MAX_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BYTES) reply(413, ['error' => 'too_large']);
$body = json_decode($raw, true);
if (!is_array($body)) reply(400, ['error' => 'bad_json']);
if (!keyIs((string)($body['key'] ?? ''), $writeKey)) reply(403, ['error' => 'bad_key']);

$state = $body['state'] ?? null;
if (!is_array($state) || !isset($state['totalAttempts']) || !is_numeric($state['totalAttempts'])) {
  reply(400, ['error' => 'bad_state']);
}

if (!is_dir($dataDir . '/history') && !mkdir($dataDir . '/history', 0700, true)) {
  reply(500, ['error' => 'no_data_dir']);
}

$stored = readStored($progressFile);
$force = !empty($body['force']);
if ($stored && !$force) {
  $had = (float)($stored['state']['totalAttempts'] ?? 0);
  if ((float)$state['totalAttempts'] < $had) {
    reply(409, ['error' => 'regression', 'server' => [
      'totalAttempts' => $had,
      'xp' => $stored['state']['xp'] ?? 0,
      'receivedAt' => $stored['receivedAt'] ?? null,
    ]]);
  }
}

$record = [
  'receivedAt' => gmdate('c'),
  'profile' => [
    'name' => cut((string)($body['profile']['name'] ?? ''), 24),
    'avatar' => cut((string)($body['profile']['avatar'] ?? ''), 8),
  ],
  'state' => $state,
];
$json = json_encode($record, JSON_UNESCAPED_UNICODE);
if ($json === false || !writeAtomic($progressFile, $json)) reply(500, ['error' => 'write_failed']);

// Instantaneu zilnic (ultima salvare din zi) — istoric + backup
writeAtomic($dataDir . '/history/' . gmdate('Y-m-d') . '.json', $json);

reply(200, ['ok' => true, 'receivedAt' => $record['receivedAt']]);
