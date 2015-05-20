<?php require 'vendor/autoload.php';

use Aws\Kinesis\KinesisClient;

function publishRecord($client, $record, $partitionKey = 'default')
{
	return $client->putRecord([
		'StreamName' => 'practice',
		'Data' => serialize($record),
		'PartitionKey' => $partitionKey,
	]);
}

function makeIncrementalRecord($record, $counter)
{
	$record['data'] = array_merge($record['data'], ['added_at' => date('Y-m-d H:i:s.u'), 'counter' => $counter]);

	return $record;
}

$client = KinesisClient::factory(array(
    'profile' => 'default',
    'region'  => 'ap-southeast-1'
));

$record = [
	'job' => 'SomeClass@someMethod',
	'data' => ['first' => 'Mohit', 'last' => 'Mamoria', 'age' => 23],
	'attempts' => 1,
	'is_failed' => false,
];

for($i = 0; $i <= 100; $i++)
{
	$record = makeIncrementalRecord($record, $i);
	publishRecord($client, $record);
}