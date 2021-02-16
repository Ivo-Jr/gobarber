// Arquivo que conterá toda a configuração da parte de upload e arquivos.
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    // "Storage: como o multer guardará a imagem"
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
        filename: (request, file, callback) => {
            crypto.randomBytes(16, (err, response) => {
                if (err) return callback(err);

                return callback(
                    null,
                    response.toString('hex') + extname(file.originalname)
                );
            });
        },
    }),
};
