/*
  Warnings:

  - You are about to drop the `refunds_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `status` on the `refunds` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `refunds` table. All the data in the column will be lost.
  - Added the required column `amount` to the `refunds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `refunds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `refunds` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "refunds_items";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_refunds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "refunds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_refunds" ("created_at", "id", "updated_at", "user_id") SELECT "created_at", "id", "updated_at", "user_id" FROM "refunds";
DROP TABLE "refunds";
ALTER TABLE "new_refunds" RENAME TO "refunds";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
