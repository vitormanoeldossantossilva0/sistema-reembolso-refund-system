-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_refunds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "refunds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_refunds" ("created_at", "id", "status", "title", "updated_at", "user_id") SELECT "created_at", "id", "status", "title", "updated_at", "user_id" FROM "refunds";
DROP TABLE "refunds";
ALTER TABLE "new_refunds" RENAME TO "refunds";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
