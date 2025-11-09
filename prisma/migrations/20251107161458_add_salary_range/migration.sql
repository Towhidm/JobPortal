/*
  Warnings:

  - You are about to drop the column `requirements` on the `Job` table. All the data in the column will be lost.
  - You are about to alter the column `salary` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "companyTagline" TEXT,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "jobType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" INTEGER,
    "applyBefore" DATETIME,
    "otherSkills" TEXT,
    "about" TEXT,
    "status" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Job_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("about", "applyBefore", "category", "companyTagline", "createdAt", "createdById", "description", "id", "jobType", "level", "location", "otherSkills", "salary", "status", "title", "updatedAt", "vacancies") SELECT "about", "applyBefore", "category", "companyTagline", "createdAt", "createdById", "description", "id", "jobType", "level", "location", "otherSkills", "salary", "status", "title", "updatedAt", "vacancies" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
