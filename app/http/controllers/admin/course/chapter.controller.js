const { CoursesModel } = require("../../../../models/cource.model");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const { addCourseSchema } = require("../../../validators/admin/course.schema");
const path = require("path");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { CourseController } = require("./course.controller");
const {
    deleteInvalidPropertyInObject, deleteinvalidPropertyInObject,
} = require("../../../../utils/functions");

const ChapterBlackList = {
    ID: "_id",
};
Object.freeze(ChapterBlackList);

const nullishList = {
    EMPTY: "",
    WHITESPACE: " ",
    UNDEFINED: undefined,
    NULL: null,
    NAN: NaN,
    ZERO: 0,
};
Object.freeze(nullishList);

class ChapterController extends Controller {
    async addChapter(req, res, next) {
        try {
            const { id, title, text } = req.body;
            await CourseController.findCourse(id);
            const saveChapterresult = await CoursesModel.updateOne(
                { _id: id },
                {
                    $push: {
                        chapters: { title, text, episodes: [] },
                    },
                }
            );
            if (saveChapterresult.modifiedCount == 0)
                throw createHttpError.InternalServerError(
                    "chapter not created"
                );
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "chapter created",
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async chapterOfCourse(req, res, next) {
        try {
            const { courseId } = req.params;
            const course = await this.getChaptersOfCourse(courseId);
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: { course },
            });
        } catch (err) {
            next(err);
        }
    }

    async removeChapterById(req, res, next) {
        try {
            const { chapterId } = req.params;
            console.log(chapterId);
            await this.getOneChapter(chapterId);
            const removeChapterResult = await CoursesModel.updateOne(
                { "chapters._id": chapterId },
                { $pull: { chapters: { _id: chapterId } } }
            );
            if (removeChapterResult.modifiedCount == 0)
                throw createHttpError.InternalServerError(
                    "can not remove chapter"
                );
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "chapter removed",
            });
        } catch (err) {
            next(err);
        }
    }

    async updateChapterById(req, res, next) {
        try {
            const { chapterId } = req.params;
            await this.getOneChapter(chapterId);
            const data = req.body;
            deleteinvalidPropertyInObject(
                data,
                Object.values(ChapterBlackList),
                Object.values(nullishList),
            );
            const updateChapterResult = await CoursesModel.updateOne(
                { "chapters._id": chapterId },
                { $set: { "chapters.$": data } }
            );
            if (updateChapterResult.modifiedCount == 0)
                throw createHttpError.InternalServerError("update failed");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "chapter updated",
            });
        } catch (err) {
            next(err);
        }
    }

    async getChaptersOfCourse(id) {
        const chapters = await CoursesModel.findOne(
            { _id: id },
            { chapters: 1, title: 1 }
        );
        if (!chapters) throw createHttpError.NotFound("chapters not found");
        return chapters;
    }

    async getOneChapter(id) {
        const chapter = await CoursesModel.findOne(
            { "chapters._id": id },
            { "chapters.$": 1 }
        );
        if (!chapter) throw createHttpError.NotFound("chapter not found");
        return chapter;
    }
}

module.exports = {
    ChapterController: new ChapterController(),
};
