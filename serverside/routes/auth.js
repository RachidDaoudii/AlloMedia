const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwtToken = require("../helpers/jwtToken");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - login
 *     summary: Point d'accès pour authentifier un utilisateur.
 *     description: Utilisez cette route pour vous connecter et obtenir un jeton d'authentification.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object contenant login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: login success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: login success
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
 *               example: All field are required
 *       409:
 *         description: Conflict - Email déja exist
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: email déja exist
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

router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/Register:
 *   post:
 *     tags:
 *       - Registration
 *     summary: Register un utilisateur.
 *     description: Point d'accès pour register un utilisateur.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User object containing registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             password_confirmation:
 *               type: string
 *             phone:
 *               type: number
 *             role:
 *               type: string
 *     responses:
 *       201:
 *         description: Register success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: please verify your email
 *             token:
 *               type: string
 *               example: <token>
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: failed
 *             message:
 *               type: string
 *               example: All field are required
 *       409:
 *         description: Conflict - Email already exists
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: failed
 *             message:
 *               type: string
 *               example: Sorry email already exists
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: failed
 *             message:
 *               type: string
 *               example: Internal Server Error
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/forgetpassword:
 *   post:
 *     tags:
 *       - forget password
 *     summary: envoyer un email pour oublier le mot de passe.
 *     description: Point d'accès pour forget password un utilisateur.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: object containing forget password details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       201:
 *         description: Register success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: please verify your email
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
 *               example: Email is required
 *       409:
 *         description: Conflict - User not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Sorry user not found
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
router.post("/forgetpassword", authController.sendEmailforgetpassword);

/**
 * @swagger
 * /api/auth/forgetpassworduser:
 *   post:
 *     tags:
 *       - forget password
 *     summary: pour modifier le mot de passe.
 *     description: Point d'accès pour modifier le mot de passe un utilisateur.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: object containing forget password details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             repeat_password:
 *               type: string
 *     responses:
 *       201:
 *         description: update password success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: password updated
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
 *               example: All is required
 *       409:
 *         description: Conflict - old repeat_password is wrong
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: old repeat_password is wrong
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
  "/forgetpassworduser",
  jwtToken.verifyToken,
  authController.forgetpassword
);

router.post(
  "/resetpassword",
  auth.isAuth,
  jwtToken.verifyToken,
  authController.resetpassword
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - déconnecter un utilisateur
 *     summary: pour déconnecter.
 *     description: Point d'accès pour déconnecter un utilisateur.
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
  "/logout",
  [auth.isAuth, jwtToken.verifyToken],
  authController.logout
);

/**
 * @swagger
 * /api/auth//activationEmail/:email/:token:
 *   get:
 *     tags:
 *       - activation compte
 *     summary: envoyer un email pour activation compte.
 *     description: Point d'accès pour activation compte un utilisateur.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: object containing forget password details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       201:
 *         description: Verification success
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: success
 *             message:
 *               type: string
 *               example: Verification successful
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
 *               example: token expiré
 *       409:
 *         description: Conflict - User not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: error
 *             message:
 *               type: string
 *               example: Sorry user not found
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
router.get(
  "/activationEmail/:email/:token",
  jwtToken.verifyToken,
  authController.activationEmail
);

module.exports = router;
