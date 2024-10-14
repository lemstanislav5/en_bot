module.exports = {
    sections: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: '⏱️ Время для учебы', callback_data: '/сhoose time to study'}],
                [{text: '📋 Количество слов', callback_data: '/select number of words'}],
                [{text: '👨‍🏫 Начать обучение', callback_data: '/start training'}],
                [{text: '📈 Статистика изучения', callback_data: '/study statistics'}],
                [{text: '📕 Словарь трудных слов', callback_data: '/dictionary of difficult words'}],
            ]
        })
    },
    hours: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '0', callback_data: '/hours_0'},
                    {text: '1', callback_data: '/hours_1'}, 
                    {text: '2', callback_data: '/hours_2'}, 
                    {text: '3', callback_data: '/hours_3'},
                    {text: '4', callback_data: '/hours_4'},
                    {text: '5', callback_data: '/hours_5'},
                ],
                [
                    {text: '6', callback_data: '/hour_6'},
                    {text: '7', callback_data: '/hours_7'},
                    {text: '8', callback_data: '/hours_8'},
                    {text: '9', callback_data: '/hours_9'},
                    {text: '10', callback_data: '/hours_10'},
                    {text: '11', callback_data: '/hours_11'},
                ],
                [
                    {text: '12', callback_data: '/hours_12'},
                    {text: '13', callback_data: '/hours_13'},
                    {text: '14', callback_data: '/hours_14'},
                    {text: '15', callback_data: '/hours_15'},
                    {text: '16', callback_data: '/hours_16'},
                    {text: '17', callback_data: '/hours_17'},
                ],
                [
                    {text: '18', callback_data: '/hours_18'},
                    {text: '19', callback_data: '/hours_19'},
                    {text: '20', callback_data: '/hours_20'},
                    {text: '21', callback_data: '/hours_21'},
                    {text: '22', callback_data: '/hours_22'},
                    {text: '23', callback_data: '/hours_23'},
                ]
            ]
        })
    },
    minutes: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '0', callback_data: '/minutes_0'}, 
                    {text: '5', callback_data: '/minutes_5'}, 
                    {text: '10', callback_data: '/minutes_10'},
                    {text: '15', callback_data: '/minutes_15'},
                    {text: '20', callback_data: '/minutes_20'},
                    {text: '25', callback_data: '/minutes_25'},
                ],
                [
                    {text: '30', callback_data: '/minutes_30'},
                    {text: '35', callback_data: '/minutes_35'},
                    {text: '40', callback_data: '/minutes_40'},
                    {text: '45', callback_data: '/minutes_45'},
                    {text: '50', callback_data: '/minutes_50'},
                    {text: '55', callback_data: '/minutes_55'},
                ],
            ]
        })
    },
    amountWords: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '1', callback_data: '/amountWords_1'}, 
                    {text: '2', callback_data: '/amountWords_2'}, 
                    {text: '3', callback_data: '/amountWords_3'},
                    {text: '4', callback_data: '/amountWords_4'},
                    {text: '5', callback_data: '/amountWords_5'},
                    {text: '6', callback_data: '/amountWords_6'},
                ],
                [
                    {text: '7', callback_data: '/amountWords_7'},
                    {text: '8', callback_data: '/amountWords_8'},
                    {text: '9', callback_data: '/amountWords_9'},
                    {text: '10', callback_data: '/amountWords_10'},
                    {text: '11', callback_data: '/amountWords_11'},
                    {text: '12', callback_data: '/amountWords_12'},
                ],
            ]
        })
    }, 
    сontinue: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '🔁', callback_data: '/repeat'}, 
                    {text: 'ℹ️', callback_data: '/in a sentence'}, 
                    {text: '🔊', callback_data: '/sound'},
                ],
                [
                    {text: '👩‍🏫 Продолжить', callback_data: '/start training'}
                ]
            ]
        })
    }, 
    teamsRepeat: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '🔁', callback_data: '/repeat'}, 
                    {text: 'ℹ️', callback_data: '/in a sentence'}, 
                    {text: '🔊', callback_data: '/sound'},
                ],
            ]
        })
    },
}