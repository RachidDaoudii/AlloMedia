const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

/**
 * @swagger
 * /api/auth/roles:
 *   get:
 *     tags:
 *       - roles
 *     summary: Point d'accès pour rendre les roles d' utilisateur.
 *     description: Utilisez cette route pour rendre les roles d' utilisateur.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: roles success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *       400:
 *         description: Conflict - roles not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: roles not found
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
router.get("/roles", roleController.getAllRole);

module.exports = router;
