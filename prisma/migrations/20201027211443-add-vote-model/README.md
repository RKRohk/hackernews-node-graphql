# Migration `20201027211443-add-vote-model`

This migration has been generated by rkrohk at 10/28/2020, 2:44:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "Vote.linkId_userId_unique" ON "Vote"("linkId", "userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201027202300-init1..20201027211443-add-vote-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite" 
-  url = "***"
+  url = "***"
 }
 generator client{
     provider = "prisma-client-js"
@@ -21,5 +21,15 @@
   name String
   email String @unique
   password String
   links link[]
+}
+
+model Vote{
+  id Int @id @default(autoincrement())
+  linkId Int
+  link link @relation(fields: [linkId], references: [id])
+  userId Int
+  user User @relation(fields: [userId],references:[id])
+
+  @@unique([linkId,userId])
 }
```

