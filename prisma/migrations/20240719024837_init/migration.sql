-- CreateTable
CREATE TABLE `TeamStats` (
    `teamId` VARCHAR(191) NOT NULL,
    `leagueId` VARCHAR(191) NOT NULL,
    `matchesPlayed` INTEGER NOT NULL,
    `wins` INTEGER NOT NULL,
    `draws` INTEGER NOT NULL,
    `losses` INTEGER NOT NULL,
    `goalsFor` INTEGER NOT NULL,
    `goalsAgainst` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,

    INDEX `TeamStats_leagueId_idx`(`leagueId`),
    UNIQUE INDEX `TeamStats_teamId_leagueId_key`(`teamId`, `leagueId`),
    PRIMARY KEY (`teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
