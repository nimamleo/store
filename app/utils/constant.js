module.exports = {
    MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: Object.freeze({
        USER: "USER",
        ADMIN: "ADMIN",
        WAITOR: "WAITOR",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER",
    }),
    PERMISSIONS: Object.freeze({
        USER: ["profile"],
        ADMIN: ["all"],
        CONTENT_MANAGER: ["course", "blog", "category", "product"],
        TEACHER: ["course", "blog"],
        SUPPLIER: ["product"],
        SUPERADMIN: ["all"],
    }),
    ACCESS_TOKEN_SECRET_KEY:
        "182D00C5D3580C82BC066E2D5C99DF8E713563F2E066CC08E5B1E58A54A32678",
    REFRESH_TOKEN_SECRET_KEY:
        "CE444CD410CD3DD83FB900E822A8DC595CA43CF72D5DC4F824C7DE2E7DE3B80E1",
};
