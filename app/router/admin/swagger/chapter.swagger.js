/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 64133fef9b1a42f25933fe0d
 *                  title:
 *                      type: string
 *                      example: chapter 1 ....
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 *          EditChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: chapter 1 ....
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 *
 */

/**
 * @swagger
 *  definitions:
 *      chapterOfCourseDefination:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: array
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 64133fef9b1a42f25933fe0d
 *                              title:
 *                                  type: string
 *                                  example: title of course
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example: [{ _id: 64133fef9b1a42f25933fe0d  , title: 'saldad', text: "asda"},]
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create new chapter for course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              200:
 *                  description: create new course
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseId}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: get chapters of courses
 *          parameters:
 *              -   in: path
 *                  name: courseId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: create new course
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  $ref: '#/definitions/chapterOfCourseDefination'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: remove a Chapter of courses
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
*/

/**
 * @swagger
 *  /admin/chapter/edit/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: update detail of Chapter
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */