
/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */ 



/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: title
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: test
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: text
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: httpStatus.OK
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type : string
 *                          format : binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *          edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type : string
 *                          format : binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *
 */
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get all products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title , text and short text for product
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get one product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: object id of product
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *
 *          responses:
 *              httpStatus.CREATED:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 *                  
 */
/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: delete one product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: object id of product
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/edit-Product'
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product for updating
 *          responses:
 *              200:
 *                  description: created new Product
 */