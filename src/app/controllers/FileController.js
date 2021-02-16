class FileController {
    async store(request, response) {
        return response.json(request.file);
    }
}

export default new FileController();
