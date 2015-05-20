<?php require 'vendor/autoload.php';

use Carbon\Carbon;


function get_next_end($currentEnd)
{
	$monthGap = 1;
	
	$nextEnd = $currentEnd->copy()->addMonth();

	if($nextEnd->month - $currentEnd->month > $monthGap)
	{
		$nextEnd = $nextEnd->subMonths($nextEnd->month - $currentEnd->month - $monthGap)->endOfMonth();
	}

	return $nextEnd;
}


$ends = [
	Carbon::createFromFormat('Y-m-d', '2014-01-01'),
	Carbon::createFromFormat('Y-m-d', '2014-01-15'),
	Carbon::createFromFormat('Y-m-d', '2014-01-29'),
	Carbon::createFromFormat('Y-m-d', '2014-01-30'),
	Carbon::createFromFormat('Y-m-d', '2014-01-31'),
	Carbon::createFromFormat('Y-m-d', '2014-05-01'),
];

foreach($ends as $end)
{
	echo $end->toDateString() . ' - ' . get_next_end($end)->toDateString() . PHP_EOL;
}