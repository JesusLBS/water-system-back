class ResponseHelper {

    static instanceCount = 0;
    static instance;

    constructor(defaultErrorMessage = 'An unexpected error has occurred') {
        if (ResponseHelper.instance) {
            return ResponseHelper.instance;
        }
        ResponseHelper.instanceCount++;
        console.log(`ResponseHelper instances: ${ResponseHelper.instanceCount}`);
        this.defaultErrorMessage = defaultErrorMessage;
        ResponseHelper.instance = this;
    }

    success(res, data = {}, status = 200) {
        const response = {
            ok: true,
            status,
            message: "Success request",
            data: { ...data },
        };
        return res.status(status).json(response);
    }

    error(res, error, status = 500) {
        console.log('=====================');
        console.log('======   Error ======');
        console.log('===================== \n');
        console.error(error);
        return res.status(status).json({
            ok: false,
            status,
            message: this.defaultErrorMessage,
            errors: error
        });
    }

    destroy(res) {
        return res.status(204).send();
    }

}
module.exports = ResponseHelper;
