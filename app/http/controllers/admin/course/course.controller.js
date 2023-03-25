const { CoursesModel } = require("../../../../models/cource.model");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const { addCourseSchema } = require("../../../validators/admin/course.schema");
const path = require("path");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");

class CourseController extends Controller {
    async getListOfCourse(req, res, next) {
        const search = req?.query?.search || "";
        let courses;
        if (search) {
            courses = await CoursesModel.find({
                $text: {
                    $search: search,
                },
            })
                .populate([
                    { path: "category", select: { title: 1 } },
                    {
                        path: "teacher",
                        select: {
                            first_name: 1,
                            last_name: 1,
                            mobile: 1,
                            email: 1,
                        },
                    },
                ])
                .sort({ _id: -1 });
        } else {
            courses = await CoursesModel.find({})
                .populate([
                    { path: "category", select: { children: 0, parent: 0 } },
                    {
                        path: "teacher",
                        select: {
                            first_name: 1,
                            last_name: 1,
                            mobile: 1,
                            email: 1,
                        },
                    },
                ])
                .sort({ _id: -1 });
        }
        res.status(StatusCodes.OK).json({
            statusCode: StatusCodes.OK,
            data: { courses },
        });
        try {
        } catch (err) {
            next(err);
        }
    }
    async addCourse(req, res, next) {
        try {
            const courseDataBody = await addCourseSchema.validateAsync(
                req.body
            );
            const {
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                type,
            } = courseDataBody;
            const image = path
                .join(courseDataBody.fileUploadPath, courseDataBody.fileName)
                .split("\\")
                .join("/");
            const teacher = req.user._id;
            if (+price > 0 && type == "free")
                throw createHttpError.BadRequest(
                    "you can not set price for free course"
                );
            const course = await CoursesModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                image,
                teacher,
                type,
            });
            if (!course?._id)
                throw createHttpError.InternalServerError("course not created");
            return res.status(StatusCodes.CREATED).json({
                message: "course created",
                statusCode: StatusCodes.CREATED,
                data: {
                    course,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async getOneCourse(req, res, next) {
        try {
            const { id } = req.params;
            const course = await this.findCourse(id);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { course },
            });
        } catch (err) {
            next(err);
        }
    }

    async findCourse(id) {
        if (!mongoose.isValidObjectId(id))
            throw createHttpError.BadRequest("id is not valid");
        const course = await CoursesModel.findById(id);
        if (!course) throw createHttpError.NotFound("course not found");
        return course;
    }
    // getListOfProduct(req, res, next) {
    //     try {
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    // getListOfProduct(req, res, next) {
    //     try {
    //     } catch (err) {
    //         next(err);
    //     }
    // }
    // getListOfProduct(req, res, next) {
    //     try {
    //     } catch (err) {
    //         next(err);
    //     }
    // }
}

module.exports = {
    CourseController: new CourseController(),
};
