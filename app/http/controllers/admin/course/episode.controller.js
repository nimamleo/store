const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
const { addEpisodeSchema } = require("../../../validators/admin/course.schema");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const path = require("path");
const {
    getTime,
    deleteinvalidPropertyInObject,
    copyObject,
} = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course.model");
const { ObjectIdValidator } = require("../../../validators/public.validator");

const nullishList = {
    EMPTY: "",
    WHITESPACE: " ",
    UNDEFINED: undefined,
    NULL: null,
    NAN: NaN,
    ZERO: 0,
};
Object.freeze(nullishList);
class EpisodeController extends Controller {
    async addNewEpisode(req, res, next) {
        try {
            const {
                title,
                text,
                type,
                chapterId,
                courseId,
                fileName,
                fileUploadPath,
            } = await addEpisodeSchema.validateAsync(req.body);
            const videoAddress = path
                .join(fileUploadPath, fileName)
                .split("\\")
                .join("/");
            const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconds);
            const episode = {
                title,
                text,
                time,
                type,
                videoAddress,
            };
            const createEpisodeResult = await CourseModel.updateOne(
                { _id: courseId, "chapters._id": chapterId },
                {
                    $push: {
                        "chapters.$.episodes": episode,
                    },
                }
            );
            if (createEpisodeResult.modifiedCount == 0)
                throw createHttpError.InternalServerError("episode not added");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                message: "episode added",
            });
        } catch (err) {
            next(err);
        }
    }
    async removeEpisode(req, res, next) {
        try {
            const { id: episodeId } = await ObjectIdValidator.validateAsync({
                id: req.params.episodeId,
            });
            await this.findEpisode(episodeId);
            const removeEpisodeResult = await CourseModel.updateOne(
                { "chapters.episodes._id": episodeId },
                {
                    $pull: {
                        "chapters.$.episodes": { _id: episodeId },
                    },
                }
            );
            if (removeEpisodeResult.modifiedCount == 0)
                throw createHttpError.InternalServerError(
                    "episode not removed"
                );
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "episode removed",
            });
        } catch (err) {
            next(err);
        }
    }
    async updateEpisode(req, res, next) {
        try {
            const { episodeId } = req.params;
            const episode = await this.findEpisode(episodeId);
            const { fileName, fileUploadPath } = req.body;
            let episodeBlackList = ["_id"];
            if (fileName && fileUploadPath) {
                const fileAddress = path
                    .join(fileUploadPath, fileName)
                    .split("\\")
                    .join("/");
                req.body.videoAddress = fileAddress;
                const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${fileAddress}`;
                const seconds = await getVideoDurationInSeconds(videoUrl);
                req.body.time = getTime(seconds);
                episodeBlackList.push("fileName");
                episodeBlackList.push("fileUploadPath");
            } else {
                episodeBlackList.push("time");
                episodeBlackList.push("videoAddress");
            }
            const data = req.body;
            deleteinvalidPropertyInObject(
                data,
                episodeBlackList,
                Object.values(nullishList)
            );
            const newEpisode = { ...episode, ...data };
            const editEpisodeResult = await CourseModel.updateOne(
                { "chapters.episodes._id": episodeId },
                {
                    $set: { "chapters.$.episodes": newEpisode },
                }
            );
            if (editEpisodeResult.modifiedCount == 0)
                throw createHttpError.InternalServerError("episode not update");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                message: "episode updated",
            });
        } catch (err) {
            next(err);
        }
    }
    async findEpisode(episodeId) {
        const course = await CourseModel.findOne({
            "chapters.episodes._id": episodeId,
        });
        if (!course) throw createHttpError.NotFound("course not found");
        const episode = course.chapters?.[0].episodes?.[0];
        if (!episode) throw createHttpError.NotFound("episode not found");
        return copyObject(episode);
    }
}

module.exports = {
    EpisodeController: new EpisodeController(),
};
