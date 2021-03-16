/* Este arquivo serve para não executarmos a aplicação no mesmo node/execução/servidor/core que rodaremos as filas,
dando então uma independenca. Assim a fila não influenciará na performace da aplicação 
Basicamente nessa aplicação o queue está responsavel por mandar os emails de cancelamento dos usuers para os
providers. */
import 'dotenv/config';

import Queue from './lib/Queue';

Queue.processQueue();
