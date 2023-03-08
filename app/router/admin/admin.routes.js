const { CategoryRoutes } = require('./category.router');

const router = require('express').Router();


/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: action of admin (add-remove-del-edit)
 */
router.use('/category' , CategoryRoutes)

module.exports = {
    AdminRoutes: router
}