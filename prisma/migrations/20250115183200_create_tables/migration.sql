/*
  Warnings:

  - You are about to drop the column `name` on the `refunds_items` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_refunds_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "refund_id" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    CONSTRAINT "refunds_items_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "refunds" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_refunds_items" ("amount", "category", "id", "refund_id") SELECT "amount", "category", "id", "refund_id" FROM "refunds_items";
DROP TABLE "refunds_items";
ALTER TABLE "new_refunds_items" RENAME TO "refunds_items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
