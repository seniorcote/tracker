<?php

namespace App\Service\Task;

/**
 * Class TaskScheduleService.
 */
class TaskScheduleService implements TaskScheduleServiceInterface
{
    /**
     * {@inheritdoc}
     */
    public function filter(array $tasks, \DateTime $start): array
    {
        $result = [];

        foreach ($tasks as $task) {
            // Отсекает неподходящие по дате задачи, вдруг из репозитория получим неправильный набор задач?
            if ($task->getStartDate() > $start || (!is_null($task->getEndDate()) && $task->getEndDate() < $start)) {
                continue;
            }

            if (is_null($task->getSchedule()) && $start == $task->getStartDate()) {
                $result[] = $task;

                continue;
            }

            if (is_null($task->getSchedule())) {
                continue;
            }

            $daysDiff = (int) date_diff($start, $task->getStartDate())->format('%a');
            $scheduleArraySize = count($task->getSchedule());

            if (0 === $daysDiff) {
                $i = 0;
            } elseif ($daysDiff < $scheduleArraySize) {
                $i = $daysDiff;
            } else {
                $i = $daysDiff % $scheduleArraySize;
            }

            if (1 === $task->getSchedule()[$i]) {
                $result[] = $task;
            }
        }

        return $result;
    }
}