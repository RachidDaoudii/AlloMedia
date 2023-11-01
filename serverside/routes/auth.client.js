const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const jwtToken = require("../helpers/jwtToken");
const clientController = require("../controllers/clientController");

/**
 * @swagger
 * /api/user/client/me:
 *   post:
 *     tags:
 *       - router privée
 *     summary: router privée pour profile utilisateur client.
 *     description: Point d'accès pour profile un utilisateur.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: object containing déconnecter details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       201:
 *         description: logout successfully
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: logout successfully
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: you are not authorized
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post(
  "/client/me",
  [auth.isAuth, jwtToken.verifyToken, auth.checkRole],
  clientController.profileClient
);

module.exports = router;
