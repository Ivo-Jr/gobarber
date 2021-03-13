import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
    // retornando uma chave: 'cancellationmail'
    get key() {
        return 'CancellationMail';
    }

    // Método handle, processa o nosso Job. Tarefa que vai executar quando o processo for executado;
    // Mailtrap será utilizado apenas em ambiente de desenvolvimento;
    // Envio de email para o provider pós cancelamento de agendamento;
    // Subject -> Assunto do email;
    async handle({ data }) {
        const { appointment } = data;

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseISO(appointment.date),
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    { locale: pt }
                ),
            },
        });
    }
}

export default new CancellationMail();
