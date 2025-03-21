<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\SetList;
use Rector\TypeDeclaration\Rector\StmtsAwareInterface\IncreaseDeclareStrictTypesRector;
use Worksome\CodingStyle\WorksomeRectorConfig;

return static function (RectorConfig $rectorConfig): void {
    WorksomeRectorConfig::setup($rectorConfig);

    $rectorConfig->paths([
        __DIR__ . '/src',
        __DIR__ . '/tests',
    ]);

    // Define extra rule sets to be applied
    $rectorConfig->sets([
        SetList::DEAD_CODE,
    ]);

    // Register extra a single rules
    $rectorConfig->rule(IncreaseDeclareStrictTypesRector::class);
};
