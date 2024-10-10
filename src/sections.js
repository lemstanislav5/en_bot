module.exports = {
    sections: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '⏱️ время для учебы', callback_data: '/сhoose time to study'}],
                [{text: '✍️ количество слов', callback_data: '/select number of words'}],
            ]
        })
    },
    hours: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '0', callback_data: '/hours'},
                    {text: '1', callback_data: '/hours'}, 
                    {text: '2', callback_data: '/hours'}, 
                    {text: '3', callback_data: '/hours'},
                    {text: '4', callback_data: '/hours'},
                    {text: '5', callback_data: '/hours'},
                ],
                [
                    {text: '6', callback_data: '/hours'},
                    {text: '7', callback_data: '/hours'},
                    {text: '8', callback_data: '/hours'},
                    {text: '9', callback_data: '/hours'},
                    {text: '10', callback_data: '/hours'},
                    {text: '11', callback_data: '/hours'},
                ],
                [
                    {text: '12', callback_data: '/hours'},
                    {text: '13', callback_data: '/hours'},
                    {text: '14', callback_data: '/hours'},
                    {text: '15', callback_data: '/hours'},
                    {text: '16', callback_data: '/hours'},
                    {text: '17', callback_data: '/hours'},
                ],
                [
                    {text: '18', callback_data: '/hours'},
                    {text: '19', callback_data: '/hours'},
                    {text: '20', callback_data: '/hours'},
                    {text: '21', callback_data: '/hours'},
                    {text: '22', callback_data: '/hours'},
                    {text: '23', callback_data: '/hours'},
                ]
            ]
        })
    },
    minutes: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '0', callback_data: '/minutes'}, 
                    {text: '5', callback_data: '/minutes'}, 
                    {text: '10', callback_data: '/minutes'},
                    {text: '15', callback_data: '/minutes'},
                    {text: '20', callback_data: '/minutes'},
                    {text: '25', callback_data: '/minutes'},
                ],
                [
                    {text: '30', callback_data: '/minutes'},
                    {text: '35', callback_data: '/minutes'},
                    {text: '40', callback_data: '/minutes'},
                    {text: '45', callback_data: '/minutes'},
                    {text: '50', callback_data: '/minutes'},
                    {text: '55', callback_data: '/minutes'},
                ],
            ]
        })
    },
}