<?php require 'vendor/autoload.php';

use Aws\Kinesis\KinesisClient;

function getShardIteratorString($iterator)
{
	return $iterator->get('ShardIterator');
}

function getStartingShardId($client, $stream)
{
	return $client->describeStream(['StreamName' => $stream])->get('StreamDescription')['Shards'][0]['ShardId'];
}

function getShardIterator($client, $stream)
{
	$shardId = getStartingShardId($client, $stream);

	return $client->getShardIterator([
		'StreamName' => $stream,
		'ShardId' => $shardId,
		'ShardIteratorType' => 'TRIM_HORIZON'
	])->get('ShardIterator');
}

function getRecords($client, $shardIterator, $limit = 10)
{
	$records = $client->getRecords([
		'ShardIterator' => $shardIterator,
		'Limit' => $limit
	]);

	return [$records->get('Records'), $records->get('NextShardIterator')];
}

function listRecords($records)
{
	foreach($records as $record)
	{
		$record = unserialize($record['Data']);

		echo "\n-----------------------------------\n";
		print_r($record['data']);
		echo "\n-----------------------------------\n";
	}
}

$client = KinesisClient::factory(array(
    'profile' => 'default',
    'region'  => 'ap-southeast-1'
));

$shardIterator = getShardIterator($client, 'practice');

do
{
	list($records, $shardIterator) = getRecords($client, $shardIterator, 1000);

	listRecords($records);
}while(1);

var_dump($records);