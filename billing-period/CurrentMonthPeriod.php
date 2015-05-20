<?php require 'vendor/autoload.php';

use Carbon\Carbon;

class CurrentMonthPeriod {

	protected $period;

	public function __construct($user = null)
	{
		$today = Carbon::today();
		$this->period = [
			'starts_at' => $today->startOfMonth()->toDateString(),
			'ends_at' => $today->endOfMonth()->toDateString()
		];
	}

	public function start()
	{
		return $this->period['starts_at'];
	}

	public function end()
	{
		return $this->period['ends_at'];
	}

	public function setStart($date)
	{
		$this->period['starts_at'] = $date;
	}

	public function setEnd($date)
	{
		$this->period['ends_at'] = $date;
	}

	public function next()
	{
		$new = new static;
		$nextStart = Carbon::createFromFormat('Y-m-d', $this->period['ends_at'])->addDays(1);
		$nextEnd = $nextStart->copy()->endOfMonth();

		$new->setStart($nextStart->toDateString());
		$new->setEnd($nextEnd->toDateString());

		return $new;
	}
}

$current = new CurrentMonthPeriod;

var_dump($current);

for($i = 1; $i <= 10; $i++) var_dump($current = $current->next());