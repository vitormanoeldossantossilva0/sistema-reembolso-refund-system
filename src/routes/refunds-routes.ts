import { Router } from "express"

import { RefundsController } from "@/controllers/refunds-controller"

const refundsRoutes = Router()
const refundsController = new RefundsController()

import { verifyUserAuthorization } from "@/middlewares/verify-user-Authorization"

refundsRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.create
)

refundsRoutes.get(
  "/",
  verifyUserAuthorization(["manager"]),
  refundsController.index
)

refundsRoutes.get(
  "/:id",
  verifyUserAuthorization(["employee", "manager"]),
  refundsController.show
)

export { refundsRoutes }
